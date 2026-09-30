require("dotenv").config();

const mongoose = require("mongoose");

const Admin = require("../models/Admin");
const About = require("../models/About");
const Settings = require("../models/Settings");

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);

  console.log("[seed] MongoDB connected.");

  // ==========================================
  // ADMIN
  // ==========================================

  const email = (process.env.ADMIN_DEFAULT_EMAIL || "admin@gmail.com")
    .toLowerCase()
    .trim();

  const existingAdmin = await Admin.findOne({
    email,
  });

  if (!existingAdmin) {
    await Admin.create({
      name: process.env.ADMIN_DEFAULT_NAME || "Admin",
      email,
      password: process.env.ADMIN_DEFAULT_PASSWORD || "Admin@123",
      role: "admin",
    });

    console.log(`[seed] Default admin created -> ${email}`);
  } else {
    console.log(`[seed] Admin already exists -> ${email}`);
  }

  // ==========================================
  // ABOUT
  // ==========================================

  const about = await About.findOne();

  if (!about) {
    await About.create({});
    console.log("[seed] Empty About document created.");
  }

  // ==========================================
  // SETTINGS
  // ==========================================

  const settings = await Settings.findOne();

  if (!settings) {
    await Settings.create({});
    console.log("[seed] Default Settings document created.");
  }

  await mongoose.disconnect();

  console.log("[seed] Done.");
}

seed().catch((err) => {
  console.error("[seed] Failed:", err);
  process.exit(1);
});
