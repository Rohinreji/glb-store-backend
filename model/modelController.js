const modelSchema = require("./modelSchema");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).any("files");
const addModels = async (req, res) => {
  try {
    const { name, creator, category } = req.body;
    const models = new modelSchema({
      name,
      creator,
      category,
      img1: req.files[0],
      img2: req.files[1],
      modelFile: req.files[2],
    });
    const result = await models.save();
    return res.status(200).json({
      msg: "Model uploaded successfully",
      data: result,
    });
  } catch (error) {
    res.status(405).json({
      err: error,
      msg: "error occures",
    });
  }
};

const viewAllModels = async (req, res) => {
  try {
    const models = await modelSchema.find({});
    res.status(200).json({
      data: models,
      msg: "Data retrieved",
    });
  } catch (error) {
    res.status(405).json({
      err: error,
      msg: "Error oocurs",
    });
  }
};

module.exports = { addModels, upload, viewAllModels };
