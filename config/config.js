import dotenv from "dotenv";

// 1. Correct method is .config(), not .configs()
dotenv.config();

export const MONGO_URI = process.env.MongoDB_URL;
export const PORT = process.env.PORT || 5000;
export const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_key";
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";
export const databaseName = process.env.DATABASE_NAME || "my_database";
export const databasepassword = process.env.DATABASE_PASSWORD || "my_database_password";
export const databaseusername = process.env.DATABASE_USERNAME || "my_database_username";

// 2. Export an object containing all configs (optional, but avoids export default errors)
export default {
  MONGO_URI,
  PORT,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  databaseName,
  databasepassword,
  databaseusername,
};


