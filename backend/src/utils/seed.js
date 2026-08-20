require("dotenv").config();
const mongoose = require("mongoose");
const Admin = require("../models/Admin");
const About = require("../models/About");
const Settings = require("../models/Settings");

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);

  const email = (
    process.env.ADMIN_DEFAULT_EMAIL || "admin@gmail.com"
  ).toLowerCase();
  const existing = await Admin.findOne({ email });

  if (!existing) {
    await Admin.create({
      name: process.env.ADMIN_DEFAULT_NAME || "Admin",
      email,
      password: process.env.ADMIN_DEFAULT_PASSWORD || "Admin@123",
    });
    console.log(`[seed] Default admin created -> ${email}`);
  } else {
    console.log(`[seed] Admin already exists -> ${email}`);
  }

  const about = await About.findOne();
  if (!about) {
    await About.create({});
    console.log("[seed] Empty About document created.");
  }

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
