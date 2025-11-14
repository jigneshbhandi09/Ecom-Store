import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: "postgresql://postgres.zhbkxqgqhjgdqexlkgkd:Jignesh0918@aws-1-ap-south-1.pooler.supabase.com:5432/postgres",
  ssl: {
    rejectUnauthorized: false, // ✅ Accept self-signed certificate
  },
});

async function testConnection() {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log("✅ Connected successfully:", result.rows);
  } catch (err) {
    console.error("❌ Database connection error:", err);
  } finally {
    await pool.end();
  }
}

testConnection();
