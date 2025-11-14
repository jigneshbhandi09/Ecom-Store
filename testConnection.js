import dotenv from "dotenv";
import pkg from "pg";
const { Client } = pkg;

dotenv.config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function testConnection() {
  try {
    await client.connect();
    console.log("✅ Connected successfully to Supabase PostgreSQL!");

    // ✅ Run a small test query
    const res = await client.query("SELECT NOW();");
    console.log("🕒 Server time:", res.rows[0].now);
  } catch (err) {
    console.error("❌ Connection failed:", err.message);
  } finally {
    await client.end();
    console.log("🔒 Connection closed.");
  }
}

testConnection();
