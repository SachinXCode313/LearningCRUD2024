import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    id : Number,
    name : String,
    age : Number,
    phone : Number,
    address : String
},{timestamps:true})

const UserModel = mongoose.model('userReg' , userSchema);


export default UserModel;