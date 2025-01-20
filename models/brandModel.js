const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const brandModel = mongoose.model("brand", brandSchema);
module.exports = brandModel;
