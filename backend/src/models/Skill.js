const mongoose = require("mongoose");
const toJSONPlugin = require("../utils/toJSONPlugin");

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    proficiency: {
      type: Number,
      min: 0,
      max: 100,
      default: 70,
    },

    icon: {
      type: String,
      trim: true,
      default: "",
    },

    displayOrder: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

skillSchema.index({ name: "text" });

skillSchema.plugin(toJSONPlugin);

skillSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_doc, ret) => {
    ret.id = ret._id?.toString();

    delete ret._id;

    ret.iconUrl = ret.icon || "";

    return ret;
  },
});

module.exports = mongoose.model("Skill", skillSchema);
