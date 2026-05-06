//this will setup the database
import db from '../config/db';
import fs from 'fs';
import 'dotenv/config';

async function runFile(filename: string) {
  const sql = fs.readFileSync(filename, 'utf8');
  const statements = sql.split(';').filter((s) => s.trim());
  for (const statement of statements) {
    await db.execute(statement);
  }
}
export async function setup() {
  try {
    console.log('🔄 Running schema...');
    await runFile('./src/model/schema.sql');
    console.log('✅ Schema done');

    console.log('🔄 Running seed...');
    await runFile('./src/model/seed.sql');
    console.log('✅ Seed done');
  } catch (err: any) {
    console.error('❌ Failed:', err.message);
    process.exit(1);
  }
}
