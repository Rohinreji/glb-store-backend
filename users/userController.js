const userSchema = require("./userSchema");

const addUser = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    const user = new userSchema({
      fullname,
      email,
      password,
    });
    const existingUser = await userSchema.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ msg: "Email is already exist!" });
    }
    const result = user.save();
    return res.status(200).json({
      msg: "Registration Successfull",
      data: result,
    });
  } catch (error) {
    return res.status(405).json({
      err: error,
      msg: "error occures",
    });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userSchema.findOne({ email: email });
    if (!user) {
      return res.status(405).json({
        msg: "User not found",
      });
    } else if (user.password !== password) {
      return res.status(401).json({
        msg: "Password mismatch",
      });
    } else {
      res.status(200).json({
        msg: "Login success",
        data: user,
      });
    }
  } catch (error) {
    res.status(405).json({
      err: error,
      msg: "Error occures",
    });
  }
};

const userById = async (req, res) => {
  try {
    const user = await userSchema.findById({ _id: req.params.id });
    return res.status(200).json({
      msg: "account retrieved",
      data: user,
    });
  } catch (error) {
    res.status(405).json({
      err: error,
      msg: "Error occurs",
    });
  }
};
module.exports = { addUser, userLogin,userById };
