import {
  applyParamsToScript,
  applyDoubleCborEncoding,
  fromText,
  Data,
  SpendingValidator,
  validatorToAddress,
  Lucid,
  Network,
} from "@lucid-evolution/lucid";
import { deserializeParams, provider, validators } from "./index.js";
import { sumLovelaceFromUtxos } from "./utils.js";

/**Generates a CBOR transaction to be signed and sent in the browser by the seller*/
async function collectedTransactionBuilder(
  externalWalletAddress: string,
  serializedParams: string
) {
  let NETWORK: Network = "Preprod";

  if (!process.env.NETWORK_ENV) {
    throw new Error("NETWORK_ENV unset");
  }

  if (process.env.NETWORK_ENV === "Mainnet") {
    NETWORK = "Mainnet";
  }

  //////////////////////////////////////////////////

  const lucid = await Lucid(provider, NETWORK);

  //////////////////////////////////////////////////

  const timestamp = Date.now();

  const validFrom = timestamp - 1 * 60 * 1000;

  const validToMs = Number(
    BigInt(timestamp) + BigInt(process.env.TX_VALID_TIME as string)
  );

  //////////////////////////////////////////////////
  /**
   *
   *  @type {string} threadTokenPolicyId 0
   *  @type {string} operatorPubKeyHash 1
   *  @type {string} sellerPubKeyHash 2
   *  @type {string} buyerPubKeyHash 3
   *  @type {number} contractPrice 4
   *  @type {number} contractFee 5
   *  @type {number} pendingUntil 6
   *  @type {number} shippingUntil 7
   *  @type {number} expireUntil 8
   */
  const stateMachineParams = deserializeParams(serializedParams);

  //////////////////////////////////////////////////

  const externalWalletUtxos = await lucid.utxosAt(externalWalletAddress);

  lucid.selectWallet.fromAddress(externalWalletAddress, externalWalletUtxos);

  //////////////////////////////////////////////////

  const totalLovelace = sumLovelaceFromUtxos(externalWalletUtxos);

  const txCollateral = 2_000_000n;

  const minLovelace = txCollateral;

  if (totalLovelace < minLovelace) {
    throw new Error("MIN_LOVELACE");
  }

  ///////////////////////////////////////////////////

  const StateMachineDatum = Data.Object({
    state: Data.Integer(),
    delivery: Data.Nullable(Data.Integer()),
  });

  type DatumType = Data.Static<typeof StateMachineDatum>;

  const DatumType = StateMachineDatum as unknown as DatumType;

  //////////////////////////////////////////////////

  const threadTokenUnit = stateMachineParams[0] + fromText("threadtoken");

  const stateMachineUtxo = await lucid.utxoByUnit(threadTokenUnit);

  console.log(stateMachineUtxo);

  if (stateMachineUtxo.datum) {
    const data = Data.from(stateMachineUtxo.datum, StateMachineDatum);
    console.log(data);

    const ms_7_days = 604_800_000;
    const appealUntil = Number(data.delivery) + ms_7_days;

    const rule1 = data.state === 2n && timestamp > appealUntil;
    const rule2 = data.state === 3n;

    if (!rule1 && !rule2) {
      throw new Error("WRONG_STATE OR DEADLINE");
    }
  }

  ///////////////////////////////////////

  const stateMachineScript: SpendingValidator = {
    type: "PlutusV3",
    script: applyParamsToScript(
      applyDoubleCborEncoding(validators.stateMachine),
      [
        stateMachineParams[0],
        stateMachineParams[1],
        stateMachineParams[2],
        stateMachineParams[3],
        BigInt(stateMachineParams[4]),
        BigInt(stateMachineParams[5]),
        BigInt(stateMachineParams[6]),
        BigInt(stateMachineParams[7]),
        BigInt(stateMachineParams[8]),
      ]
    ),
  };

  const stateMachineAddress = validatorToAddress(NETWORK, stateMachineScript);

  console.log(stateMachineAddress);

  ////////////////////////////////////////////

  const collectInput = "Collect";

  const StateMachineInput = Data.Enum([
    Data.Literal("Return"),
    Data.Literal("Lock"),
    Data.Literal("Cancel"),
    Data.Object({
      Shipped: Data.Object({
        delivery_param: Data.Integer(),
      }),
    }),
    Data.Literal("Appeal"),
    Data.Literal("Received"),
    Data.Literal("Collect"),
    Data.Literal("Finish"),
  ]);

  type InputType = Data.Static<typeof StateMachineInput>;

  const InputType = StateMachineInput as unknown as InputType;

  const stateMachineRedeemer = Data.to(collectInput, InputType);

  //////////////////////////////////////////////////

  const datumValues = {
    state: BigInt(4),
    delivery: null,
  };

  const stateMachineDatum = Data.to(datumValues, DatumType);

  ///////////////////////////////////////////
  
  const lovelaceToSM = BigInt(stateMachineParams[5]);

  console.log(lovelaceToSM);

  const transaction = await lucid
    .newTx()
    .collectFrom([stateMachineUtxo], stateMachineRedeemer)
    .collectFrom(externalWalletUtxos)
    .pay.ToAddressWithData(
      stateMachineAddress,
      {
        kind: "inline",
        value: stateMachineDatum,
      },
      {
        [threadTokenUnit]: 1n,
        lovelace: lovelaceToSM,
      }
    )
    .attach.SpendingValidator(stateMachineScript)
    .addSigner(externalWalletAddress)
    .validFrom(validFrom)
    .validTo(validToMs)
    .complete({
      changeAddress: externalWalletAddress,
      setCollateral: txCollateral,
      coinSelection: false,
      localUPLCEval: false,
    });

  const cbor = transaction.toCBOR();

  return {
    threadTokenUnit,
    stateMachineAddress,
    cbor,
  };
}

async function main() {
  const externalWalletAddress =
    "addr_test1qp6xhlulkdnm7wa3kf07yj389weg34329jk34tfwx75pw0urvzxsjpchzgnhfmvz35ap356vg3a2c2af34zl4va7cfzqtyf6jn";

  const serializedParams =
    "27e0b4077ef7653c4468a16a27d957738fea64127bb76c4eff7e38bc,e6e9941e21500bbd678105b569e815197e9f8de6e7ba858c6626ec31,746bff9fb367bf3bb1b25fe24a272bb288d62a2cad1aad2e37a8173f,a239e6c2bbd6a9f3249d65afef89c28e1471ed07c529ec06848cc141,10843373,1084337,1753284604629,1753371004629,1758555004629";

  const BUILDER = await collectedTransactionBuilder(
    externalWalletAddress,
    serializedParams
  );

  console.log("CBOR---------------------------------------");

  console.log("Unit: ", BUILDER.threadTokenUnit);

  console.log("stateMachineAddress: ", BUILDER.stateMachineAddress);

  console.log("CBOR---------------------------------------");

  console.log(BUILDER.cbor);
}

//main();

export { collectedTransactionBuilder };
