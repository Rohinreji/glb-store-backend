const mongoose = require("mongoose");
const modelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  creator: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  img1: {
    type: Object,
    required: true,
  },
  img2: {
    type: Object,
    required: true,
  },
  modelFile: {
    data: Buffer,
    contentType: String,
  },
});
module.exports = new mongoose.model("3dModel", modelSchema);
