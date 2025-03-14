const User = require('../DB/UserModal')


const GetAllUsers =async (req,res)=>{
    try {
        const Users = await User.find({});
        res.status(200).json({ error: false, data: Users });
      } catch (error) {
        res.status(500).json({ error: true, message: error.message });
      }
}

const GetUserById = async (req, res) =>{
    try {
        const { id } = req.params;
        const ResUser = await User.findById(id);
        res.status(200).json({ error: false, data: ResUser });
      } catch (error) {
        res.status(500).json({ error: true, message: error.message });
      }
}

const UpdateUser = async (req,res) =>{
     try {
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(id, req.body);
        // console.log(user)
        if (!user) {
          return res
            .status(404)
            .json({ error: true, message: "The requested User does not exist" });
        }
        const Udpated = await User.findById(id);
        res
          .status(200)
          .json({ error: false, message: "User successfully updated" });
      } catch (error) {
        res.status(500).json({ error: true, message: error.message });
      }
}

const DeleteUser = async(req,res) =>{
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
}

module.exports = {
    GetAllUsers,
    GetUserById,
    DeleteUser,
    UpdateUser
}