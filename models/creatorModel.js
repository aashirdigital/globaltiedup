const mongoose = require("mongoose");

const creatorSchema = new mongoose.Schema(
  {
    image: {
      type: String,
    },
    name: {
      type: String,
    },
    type: {
      type: String,
    },
  },
  { timestamps: true }
);

const creatorModel = mongoose.model("creator", creatorSchema);
module.exports = creatorModel;
