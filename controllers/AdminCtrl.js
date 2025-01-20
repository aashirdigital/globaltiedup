const websiteModel = require("../models/websiteModel");
const brandModel = require("../models/brandModel");
const creatorModel = require("../models/creatorModel");
const brandsxCreatorsModel = require("../models/brandsxCreatorsModel");

// BRANDS
const addBrandController = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(201)
        .send({ success: false, message: "Please select an image" });
    }
    const newBrand = new brandModel({ image: req.file.path });
    await newBrand.save();
    return res
      .status(200)
      .send({ success: true, message: "Brand Added Successfully" });
  } catch (error) {
    console.error(`Add Brand Ctrl: ${error.message}`);
    res.status(500).send({ success: false, message: error.message });
  }
};
const getAllBrandContoller = async (req, res) => {
  try {
    const brands = await brandModel.find({});
    if (brands.length === 0) {
      return res
        .status(200)
        .send({ success: false, message: "No brands found" });
    }
    return res
      .status(200)
      .send({ success: true, message: "Brand Fetched Success", data: brands });
  } catch (error) {
    console.error(`Get All Brands Ctrl: ${error.message}`);
    res.status(500).send({ success: false, message: error.message });
  }
};
const deleteBrandController = async (req, res) => {
  try {
    const deleteBrand = await brandModel.findOneAndDelete({ _id: req.body.id });
    if (!deleteBrand) {
      return res
        .status(201)
        .send({ success: false, message: "Failed to delete brand" });
    }
    return res
      .status(200)
      .send({ success: true, message: "Brand deleted successfully" });
  } catch (error) {
    console.error(`Get All Brands Ctrl: ${error.message}`);
    res.status(500).send({ success: false, message: error.message });
  }
};

// CREATORS
const addCreatorController = async (req, res) => {
  try {
    const { id, name, type } = req.body;
    if (id) {
      const existingCretor = await creatorModel.findOne({ _id: id });
      if (!existingCretor) {
        return res
          .status(201)
          .send({ success: false, message: "No creator found with this id" });
      }
      let imagePath;
      if (req.file) {
        imagePath = req.file.path;
      }
      const updateCreator = await creatorModel.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            name: name,
            type: type,
            image: imagePath ? imagePath : existingCretor.image,
          },
        },
        { new: true }
      );
      if (updateCreator) {
        return res
          .status(200)
          .send({ success: true, message: "Creator updated successfully" });
      }
    }
    if (!req.file) {
      return res
        .status(201)
        .send({ success: false, message: "Please select an image" });
    }
    if (!name || !type) {
      return res
        .status(201)
        .send({ success: false, message: "Name/Type empty" });
    }
    const creator = await creatorModel.findOne({ name: name });
    if (creator) {
      return res
        .status(201)
        .send({ success: false, message: "Creator already exists" });
    }
    const newCreator = new creatorModel({
      image: req.file.path,
      name: name,
      type: type,
    });
    await newCreator.save();

    return res
      .status(200)
      .send({ success: true, message: "Creator Added Successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ success: false, message: error.message });
  }
};
const getAllCreatorContoller = async (req, res) => {
  try {
    const creators = await creatorModel.find({});
    if (creators.length === 0) {
      return res
        .status(200)
        .send({ success: false, message: "No creators found" });
    }
    return res.status(200).send({
      success: true,
      message: "Creator Fetched Success",
      data: creators,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ success: false, message: error.message });
  }
};
const deleteCreatorController = async (req, res) => {
  try {
    const deleteCreator = await creatorModel.findOneAndDelete({
      _id: req.body.id,
    });
    if (!deleteCreator) {
      return res
        .status(201)
        .send({ success: false, message: "Failed to delete creator" });
    }
    return res
      .status(200)
      .send({ success: true, message: "Creator deleted successfully" });
  } catch (error) {
    console.error(`Get All Brands Ctrl: ${error.message}`);
    res.status(500).send({ success: false, message: error.message });
  }
};

// BRANDS X CREATORS
const addBrandsXCreatorController = async (req, res) => {
  try {
    const { id, creatorName, reach, link } = req.body;
    if (id) {
      const existing = await brandsxCreatorsModel.findOne({ _id: id });
      if (!existing) {
        return res.status(201).send({
          success: false,
          message: "No brand x creator found with this id",
        });
      }
      if (req.files && req.files.brandImage && req.files.brandImage[0]) {
        existing.brandImage = req.files.brandImage[0].path;
      }
      if (req.files && req.files.creatorImage && req.files.creatorImage[0]) {
        existing.creatorImage = req.files.creatorImage[0].path;
      }
      existing.creatorName = creatorName;
      existing.reach = reach;
      existing.link = link;
      await existing.save();

      return res.status(200).send({
        success: true,
        message: "Brands X Creators updated successfully",
      });
    }
    // NEW SAVE
    if (!req.files) {
      return res
        .status(201)
        .send({ success: false, message: "Please select an image" });
    }
    if (!creatorName || !reach || !link) {
      return res
        .status(201)
        .send({ success: false, message: "Reach/Link is empty" });
    }
    const newBrandXCreator = new brandsxCreatorsModel({
      creatorName: creatorName,
      reach: reach,
      link: link,
    });
    if (req.files && req.files.brandImage && req.files.brandImage[0]) {
      newBrandXCreator.brandImage = req.files.brandImage[0].path;
    }
    if (req.files && req.files.creatorImage && req.files.creatorImage[0]) {
      newBrandXCreator.creatorImage = req.files.creatorImage[0].path;
    }
    await newBrandXCreator.save();

    return res
      .status(200)
      .send({ success: true, message: "Creator Added Successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ success: false, message: error.message });
  }
};
const getAllBrandsXCreatorsContoller = async (req, res) => {
  try {
    const brandsxcreators = await brandsxCreatorsModel.find({});
    if (brandsxcreators.length === 0) {
      return res
        .status(200)
        .send({ success: false, message: "No creators found" });
    }
    return res.status(200).send({
      success: true,
      message: "Brands X Creators Fetched Success",
      data: brandsxcreators,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ success: false, message: error.message });
  }
};
const deleteBrandsXCreatorsController = async (req, res) => {
  try {
    const deleteBrandsXCreators = await brandsxCreatorsModel.findOneAndDelete({
      _id: req.body.id,
    });
    if (!deleteBrandsXCreators) {
      return res.status(201).send({
        success: false,
        message: "Failed to delete brands x creators",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Brands x Creators deleted successfully",
    });
  } catch (error) {
    console.error(`Get All Brands Ctrl: ${error.message}`);
    res.status(500).send({ success: false, message: error.message });
  }
};

// WEBSITE LIVE
const updateWebsiteController = async (req, res) => {
  try {
    const admin = await websiteModel.findOne({
      email: "admin@gmail.com",
    });
    if (!admin) {
      return res.status(201).send({
        success: false,
        message: "No Access",
      });
    }
    const updatedWebsiteStatus = !admin.website;
    const updateWebsite = await websiteModel.findOneAndUpdate(
      { email: "admin@gmail.com" },
      { $set: { website: updatedWebsiteStatus } },
      { new: true }
    );
    // Check if website update failed
    if (!updateWebsite) {
      return res.status(500).send({
        success: false,
        message: "Failed to update website",
      });
    }
    // Website updated successfully
    return res.status(200).send({
      success: true,
      message: "Website updated",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: `Get All Queries Ctrl ${error.message}`,
    });
  }
};
const getWebsiteContoller = async (req, res) => {
  try {
    const website = await websiteModel.findOne({ email: "admin@gmail.com" });
    if (!website) {
      return res.status(201).send({ success: false, message: "Website Error" });
    }
    return res
      .status(200)
      .send({ success: true, message: "Website Fetched", data: website });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};
const dashboardController = async (req, res) => {
  try {
    const brands = await brandModel.countDocuments({});
    const creators = await creatorModel.countDocuments({});
    const brandsxcreators = await brandsxCreatorsModel.countDocuments({});

    return res.status(200).send({
      success: true,
      message: "Data Fetched",
      data: { brands, creators, brandsxcreators },
    });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

module.exports = {
  // BRANDS
  addBrandController,
  getAllBrandContoller,
  deleteBrandController,
  // CREATORS
  addCreatorController,
  getAllCreatorContoller,
  deleteCreatorController,
  //BRAND X CREATORS
  addBrandsXCreatorController,
  getAllBrandsXCreatorsContoller,
  deleteBrandsXCreatorsController,
  // WEBSITE
  getWebsiteContoller,
  updateWebsiteController,
  // DASHBOARD
  dashboardController,
};
