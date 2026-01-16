import { db } from "./config/db.js";

async function test() {
  try {
    await db.query("SELECT 1");
    console.log("MySQL Connected Successfully");
    process.exit(0);
  } catch (err) {
    console.error("DB Connection Failed:", err.message);
    process.exit(1);
  }
}

test();
