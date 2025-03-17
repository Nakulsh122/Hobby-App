const User = require("../DB/UserModal");
const bcrypt = require("bcryptjs");
const mongoose = require('mongoose')

const GetAllUsers = async (req, res) => {
  try {
    const Users = await User.find({});
    res.status(200).json({ error: false, data: Users });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};

const GetUserById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ error: true, message: "User Id invalid" });
    const ResUser = await User.findById(id);
    res.status(200).json({ error: false, data: ResUser });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};

const UpdateUser = async (req, res) => {
  try {
    const { id } = req.params;
    let updateData = { ...req.body };

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedUser) {
      return res
        .status(404)
        .json({ error: true, message: "The requested User does not exist" });
    }

    return res
      .status(200)
      .json({ error: false, message: "User successfully updated" });
  } catch (error) {
    return res.status(500).json({ error: true, message: error.message });
  }
};

const DeleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const Del = await User.findByIdAndDelete(id);
    if (!Del) {
      return res.status(404).json({ error: true, message: "User Not Found" });
    }
    res
      .status(200)
      .json({ error: false, message: "The User is succesfully Deleted" });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};

module.exports = {
  GetAllUsers,
  GetUserById,
  DeleteUser,
  UpdateUser,
};
