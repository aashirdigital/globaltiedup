const multer = require("multer");
const express = require("express");
const adminAuthMiddleware = require("../middlewares/adminAuthMiddleware");

const {
  addBrandController,
  getAllBrandContoller,
  deleteBrandController,
  addCreatorController,
  getAllCreatorContoller,
  deleteCreatorController,
  addBrandsXCreatorController,
  getAllBrandsXCreatorsContoller,
  deleteBrandsXCreatorsController,
  dashboardController,
  getWebsiteContoller,
  updateWebsiteController,
} = require("../controllers/AdminCtrl");
const router = express.Router();

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "brands");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname.replace(/\s+/g, "-"));
  },
});
const upload = multer({ storage: storage });

// Multer configuration
const creatorStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "creators");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname.replace(/\s+/g, "-"));
  },
});
const creator = multer({ storage: creatorStorage });

// Multer configuration
const brandxcreatorStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "brandsxcreators");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname.replace(/\s+/g, "-"));
  },
});
const brandsxcreators = multer({ storage: brandxcreatorStorage }).fields([
  { name: "brandImage", maxCount: 1 },
  { name: "creatorImage", maxCount: 1 },
]);

// BRANDS
// BRANDS
// BRANDS
router.post(
  "/addbrand",
  upload.single("image"),
  adminAuthMiddleware,
  addBrandController
);
router.get("/getbrands", getAllBrandContoller);
router.post("/deletebrand", deleteBrandController);
// CREATORS
// CREATORS
// CREATORS
router.post(
  "/addcreator",
  creator.single("image"),
  adminAuthMiddleware,
  addCreatorController
);
router.get("/getcreators", getAllCreatorContoller);
router.post("/deletecreator", deleteCreatorController);
// BRAND X CREATORS
// BRAND X CREATORS
// BRAND X CREATORS
router.post(
  "/addbrandsxcreators",
  brandsxcreators,
  adminAuthMiddleware,
  addBrandsXCreatorController
);
router.get("/getbrandsxcreators", getAllBrandsXCreatorsContoller);
router.post("/deletebrandsxcreators", deleteBrandsXCreatorsController);
// website
router.get("/dashboard", adminAuthMiddleware, dashboardController);
router.get("/get-website", getWebsiteContoller);
router.post("/update-website", adminAuthMiddleware, updateWebsiteController);

module.exports = router;
