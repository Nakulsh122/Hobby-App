const { default: mongoose } = require("mongoose");
const Hobbies = require("../DB/HobbiesModal");

const GetAllHobbies = async (req, res) => {
  try {
    const { userId } = req.params;
    // console.log(userId)s
    if (!mongoose.Types.ObjectId.isValid(userId))
      return res.status(400).json({ error: true, message: "User Id invalid" });
    const userHobbies = await Hobbies.find({ userId: userId });
    if (userHobbies.length === 0)
      return res
        .status(404)
        .json({ error: true, message: "No hobbies found for the user" });
    res
      .status(200)
      .json({
        error: false,
        message: "All hobbies successfully fetched",
        userHobbies,
      });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};

const AddHobby = async (req, res) => {
  try {
    if (req.body) {
      await Hobbies.create(req.body);
      res
        .status(200)
        .json({ error: false, message: "Hobby added Successfully" });
    } else
      return res.status(404).json({ error: true, message: "No data detected" });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};

const UpdateHobby = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ error: true, message: "HobbyId invalid" });
    await Hobbies.findByIdAndUpdate(id, req.body);
    res
      .status(200)
      .json({ error: false, message: "Hobby updated Successfully " });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};
const DeleteHobby = async (req, res) => {
    try {
        const {id} = req.params
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({error : true , message : "Id invalid"})
        await Hobbies.findByIdAndDelete(id);
        res.status(200).json({error : false , message : "Deletion Successful"})
    } catch (error) {
        res.status(500).json({error : true , message : error.message})
    }
};

module.exports = {
  GetAllHobbies,
  AddHobby,
  UpdateHobby,
  DeleteHobby,
};
