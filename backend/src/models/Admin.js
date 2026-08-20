const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const toJSONPlugin = require("../utils/toJSONPlugin");

const adminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email address"],
    },
    password: { type: String, required: true, minlength: 8, select: false },
    role: { type: String, enum: ["admin"], default: "admin" },
    refreshTokenHash: { type: String, select: false, default: null },
  },
  { timestamps: true },
);

adminSchema.pre("save", async function hashPassword(next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

adminSchema.methods.comparePassword = function comparePassword(candidate) {
  return bcrypt.compare(candidate, this.password);
};

adminSchema.plugin(toJSONPlugin);

module.exports = mongoose.model("Admin", adminSchema);
