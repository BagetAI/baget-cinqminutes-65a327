import { betterAuth } from "better-auth";
import { Pool } from "pg";

export const auth = betterAuth({
  database: new Pool({
    connectionString: process.env.DATABASE_URL,
    // Bound the pool so the per-company Neon compute can scale to zero when the app is
    // idle. Neon bills compute by active time, and an unbounded pool holds a connection
    // open that keeps the database awake. max caps concurrent connections; the short
    // idle timeout drains them so the compute can suspend; connectionTimeoutMillis fails
    // fast on a cold/unreachable endpoint instead of hanging an auth request forever.
    max: 5,
    idleTimeoutMillis: 10_000,
    connectionTimeoutMillis: 15_000,
  }),
  emailAndPassword: { enabled: true },
  secret: process.env.BETTER_AUTH_SECRET,
  // Optional: better-auth infers the base URL from the request when unset (fine for
  // same-origin). Set BETTER_AUTH_URL for absolute links (email verification / OAuth on a
  // custom domain) - and it MUST match the redirect URIs registered with each provider.
  baseURL: process.env.BETTER_AUTH_URL,
});
