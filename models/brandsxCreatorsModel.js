const mongoose = require("mongoose");

const brandsxCreatorsSchema = new mongoose.Schema(
  {
    brandImage: {
      type: String,
      required: [true, "Brand image is required"],
    },
    creatorImage: {
      type: String,
      required: [true, "Creator image is required"],
    },
    creatorName: {
      type: String,
      required: [true, "Creator Name is required"],
    },
    reach: {
      type: String,
    },
    link: {
      type: String,
    },
  },
  { timestamps: true }
);

const brandsxCreatorsModel = mongoose.model(
  "brandsxCreators",
  brandsxCreatorsSchema
);
module.exports = brandsxCreatorsModel;
