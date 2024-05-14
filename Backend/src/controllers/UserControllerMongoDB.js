import UserModel from "../models/User.js";

const getUser = async (req, res) => {
  try {
    const user = await UserModel.find();
    console.log(user);
    res.send(user);
  } catch (error) {
    console.log(error);
  }
};

const createUser = async (req, res) => {
  try {
    const { id, name, age, phone, address } = req.body;
    const newUser = new UserModel({
      id,
      name,
      age,
      phone,
      address,
    });

    await newUser.save();
    res
      .status(200)
      .json({ success: true, Message: "User Created Successfully", newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, Message: "server error ", newUser });
  }
};

const updateUser = async (req, res) => {

  const userId = req.params.id;

  try {
    const updatedUser = await UserModel.findOneAndUpdate({id : userId}, req.body, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updatedUser);
  } catch (err) {
        console.error("Error updating user:", err);
        res.status(500).json({ error: "An error occurred while updating the user" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userID = req.params.id;
    const deletedUser = await UserModel.findOneAndDelete(userID);
    res.send("User Deleted Successfully ");
  } catch (error) {
    console.log(error);
  }
};

export { createUser, getUser, updateUser, deleteUser };
