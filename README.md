# Midso — Decentralized E-Commerce on Midnight Network

## Introduction

**Midso** is a fully decentralized e-commerce platform built **100% on the Midnight network**, designed to protect the privacy of both buyers and sellers.  
It enables the purchase and sale of products using **Midnight** and **Cardano native assets** (Bridge).

Midso addresses one of the main challenges in decentralized e-commerce: safeguarding user data. By using **DUST smart contracts** on Midnight, it offers a secure and private trading environment while also contributing to the **mass adoption of the Cardano ecosystem**.

On Midso, buyers can pay with either a **Cardano** or **Midnight** wallet. Transactions between buyers and sellers are handled entirely by **DUST contracts**, enabling payments in:

- **ADA**
- **Stablecoins**
- **Native assets**

Midso also supports innovative and deterministic trading logic, and is fully compatible with the **Midnight network**.

In addition, the platform integrates a **DAO model**, enabling community members to conduct market research, collaborate on product development, and launch their own stores.

🔗 [Visit Midso’s Website](https://opencardano.com)

---

## Why Midso?

Open-source alternative to:

- Amazon  
- Shopify  
- Traditional dropshipping companies  

---

## Key Features

- 🔒 **Privacy-enabled DUST contracts** (Midnight network)  
- 💱 Payments with Cardano and Midnight assets  
- 🗳 DAO governance model  
- 🏷 Discount liquidity pool to reduce product prices  
- 📦 Always includes free shipping  
- 💵 USD guarantee as purchase protection  
- 🧩 Each trade managed by an **isolated DUST contract** (horizontal scalability)  
- 📚 Community repository: products, suppliers, marketing templates  
- 🤖 AI integration: MCP servers, vectorized search  

| Feature      | Available | Description                                          |
|--------------|-----------|------------------------------------------------------|
| **P2P**      | ✓         | Midnight mainnet support                             |
| **E2E**      | ✓         | Transactions signed and sent directly in browser     |
| **Multi-wallet** | ✓     | Lace and other wallet integrations                   |
| **DUST**     | ✓         | Smart contract validators for secure, scalable trades |

---

## Technology Stack

| Component | Type      | Description | Keywords | Version | License | Repository |
|-----------|-----------|-------------|----------|---------|---------|------------|
| MySQL     | Database  | Cloud-native, sharding support | sharding | 8.0 | GPL | [Download](https://www.mysql.com/downloads) |
| Node.js   | Runtime   | JavaScript runtime | code, javascript | alpine | MIT | [GitHub](https://github.com/nodejs/node) |
| GraphQL   | API       | Aggregates data from multiple sources for a single query | query, polling, websocket | 4.11.2 | MIT | [GitHub](https://github.com/apollographql/apollo-server) |

---

## Roadmap

- ✅ User UI  
- ✅ Seller UI  
- ✅ Backend  
- ✅ Multi-wallet support (Lace)  
- ⏳ Full Midnight DUST implementation  

---

## Installation Guide

### 1. Kubernetes Minikube (Linux x86 .deb)

[Minikube Documentation](https://minikube.sigs.k8s.io/docs/)

```bash
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube_latest_amd64.deb
sudo dpkg -i minikube_latest_amd64.deb
```

```bash
minikube start --driver=docker --cpus="6" --memory=14gb --disk-size=200g
```

```bash
minikube addons enable ingress
minikube addons enable dashboard
minikube addons enable metrics-server
```

### 2. Clone the Repository

```bash
git clone https://github.com/Midso-dao/midso.git
```

### 3. Install kubectl

[Kubectl Installation Guide](https://kubernetes.io/docs/tasks/tools/install-kubectl-linux)

### 4. Install Skaffold

[Skaffold Documentation](https://skaffold.dev/docs/install/)

```bash
./skaffold.sh
```

---

## License

Licensed under the [Apache License 2.0](./LICENSE).  
© 2025 — **Midso** by Juan José Caballero Rey — *Cardano Pioneer, 1st Cohort*

---

## Contact

- **GitHub:** [rey-sudo](https://github.com/rey-sudo)  
- **Email:** [midso.dao@gmail.com](mailto:midso.dao@gmail.com)  
- **Discord:** [Join server](https://discord.com/invite/MJ5Ckac6TV)  
- **X (Twitter):** [@midsodao](https://x.com/midsodao)  
- **LinkedIn:** [Rey Sudo](https://www.linkedin.com/in/rey-sudo)  

---

## Get Involved

- [Become a Seller](https://seller.midso.io)  
- [Become a Mediator](https://discord.com/invite/MJ5Ckac6TV)  
- [Join the Admin Team](https://discord.com/invite/MJ5Ckac6TV)  
- [Contribute as Developer](https://discord.com/invite/MJ5Ckac6TV)  
- [Moderate the Community](https://discord.com/invite/MJ5Ckac6TV)  

---

🚀 **Call for Contributors: Catalyst Fund 14** 🚀  
Help shape the future of decentralized e-commerce on Midnight.