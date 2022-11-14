import { fileURLToPath } from 'url';
import path from 'path';
import { dirname } from 'path';
import sqlite3 from "sqlite3";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);
const db_name = path.join(__dirname, "database.db");
export const db = new sqlite3.Database(db_name, err => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Successful connection to the database");
});

export const checkForError = (err) =>{
    if (err) {
        return console.error(err.message);
    }
}