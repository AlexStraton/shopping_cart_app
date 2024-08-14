import pkg from "pg";
import { config as dotenvConfig } from "dotenv";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const { Pool } = pkg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ENV = process.env.NODE_ENV || "development";
dotenvConfig({
    path: `${__dirname}/../.env.${ENV}`,
});
if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
    throw new Error("PGDATABASE or DATABASE_URL not set");
}
const dbConfig = {
    max: 10,
};
if (ENV === "production") {
    dbConfig.connectionString = process.env.DATABASE_URL;
    dbConfig.max = 2;
}
const db = new Pool(dbConfig);
export default db;
