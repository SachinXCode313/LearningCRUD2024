import express from "express";
// import {createUser,getUser,updateUser,deleteUser}  from "../controllers/UserControllerMongoDB.js";
import {createUser,getUser,updateUser}  from "../controllers/UserControllerSheet.js";


const routers = express.Router();

routers.post('/create',createUser)

routers.get('/get',getUser)

routers.put('/update/:id',updateUser)

// routers.delete('/delete/:id',deleteUser)

export default routers;