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

// const viewModelById = async (req, res) => {
//   try {
//     const models = await modelSchema.findById({ _id: req.params.id });
//     res.send(Buffer).json({
//       msg: "data",
//       data:models
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

const viewModelById = async (req, res) => {
  try {
    const model = await modelSchema.findById(req.params.id);

    if (!model || !model.modelFile || !model.modelFile.data) {
      return res.status(404).json({ msg: "Model or file not found" });
    }

    // Convert base64 string to binary buffer
    const buffer = Buffer.from(model.modelFile.data, "base64");

    // Set content type for GLB
    res.set("Content-Type", "model/gltf-binary");

    // Send raw binary
    res.send(buffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server Error" });
  }
};

module.exports = { addModels, upload, viewAllModels,viewModelById };
