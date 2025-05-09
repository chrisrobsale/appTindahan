import db from "./db";
async function testConnection() {
  try {
    console.log("🔗 Testing database connection...");
    const connection = await db.getConnection();
    await connection.ping(); // sends a ping to verify connection is alive
    console.log("✅ Database connection successful!");
    connection.release();
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }
}

export default testConnection;
