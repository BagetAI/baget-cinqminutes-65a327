import { neon } from "@neondatabase/serverless";

// Serverless SQL helper for Neon HTTP queries
export const getDb = () => {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }
  return neon(connectionString);
};
