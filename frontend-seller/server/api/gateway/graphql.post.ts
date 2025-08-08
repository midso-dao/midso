import { throwRemoteError } from "~/server/utils/fetch";

// server/api/gateway/graphql.ts
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const body = await readBody(event);

  const cookies = parseCookies(event);
  const sessionCookie = cookies.session;

  try {
    const response = await $fetch(config.serviceGatewayBase + "/api/gateway/graphql", {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json",
        'x-forwarded-for': event.context.clientIP,
        Cookie: sessionCookie ? `session=${sessionCookie}` : "",
      },
      credentials: "include",
      async onResponseError({ response }) {
        throw new Error(
          JSON.stringify(response._data || "Unknown server error")
        );
      }
    });

    return response;
  } catch (err) {
    throwRemoteError(err);
  }
});
