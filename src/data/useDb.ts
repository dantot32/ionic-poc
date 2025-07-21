import { CapacitorSQLite, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Capacitor } from '@capacitor/core';

const sqlite = CapacitorSQLite;
let db: SQLiteDBConnection | void;

export async function initDb() {
  const result = await sqlite.createConnection({
    database: 'mydb',
    version: 1,
    encrypted: false,
    mode: 'no-encryption',
  });

  db = result;

  await db!.open();

  // Crea tabella
  await db!.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT
    );
  `);

  console.log('Database creato a runtime');
}

export async function createUser(name: string, email: string) {
  await db!.run('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
}

export async function readUsers() {
  const res = await db!.query('SELECT * FROM users');
  return res.values;
}

export async function updateUser(id: number, name: string) {
  await db!.run('UPDATE users SET name = ? WHERE id = ?', [name, id]);
}

export async function deleteUser(id: number) {
  await db!.run('DELETE FROM users WHERE id = ?', [id]);
}
