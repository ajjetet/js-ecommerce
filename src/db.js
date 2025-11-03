import Database from 'better-sqlite3';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const databasePath = path.join(__dirname, '..', 'database.db');
const db = new Database(databasePath);

db.exec(`
  CREATE TABLE IF NOT EXISTS products_details (
    product_id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_name TEXT NOT NULL,
    product_category TEXT NOT NULL,
    product_price NUMERIC NOT NULL,
    product_image TEXT NOT NULL,
    product_rating REAL,
    rating_participants INTEGER
  )
`);

export default db;