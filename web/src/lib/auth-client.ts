import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_AUTH_SERVER_URL!, // the base url of your auth server
});
