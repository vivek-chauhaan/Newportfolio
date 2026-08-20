require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./src/app");
const connectDB = require("./src/config/db");
const Admin = require("./src/models/Admin");

const PORT = process.env.PORT || 8080;

async function ensureDefaultAdmin() {
  try {
    const count = await Admin.countDocuments();
    if (count === 0) {
      const email = (
        process.env.ADMIN_DEFAULT_EMAIL || "admin@gmail.com"
      ).toLowerCase();
      await Admin.create({
        name: process.env.ADMIN_DEFAULT_NAME || "Admin",
        email,
        password: process.env.ADMIN_DEFAULT_PASSWORD || "Admin@123",
      });
      console.log(
        `[bootstrap] No admin found - created default admin -> ${email}`,
      );
    }
  } catch (err) {
    console.error("[bootstrap] Failed to ensure default admin:", err.message);
  }
}

// Express starts accepting connections immediately; MongoDB connects in the
// background (with its own retry loop in connectDB). This way the process
// always binds its port right away instead of hanging if the database is
// briefly unavailable - DB-backed routes will simply error until connected.
mongoose.connection.once("connected", ensureDefaultAdmin);
connectDB();

app.listen(PORT, () => {
  console.log(`[server] Listening on http://localhost:${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.error("[fatal] Unhandled promise rejection:", err);
});
