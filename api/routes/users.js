import express from "express";
import {updateUser, deleteUser, getUser, getAllUsers} from "../controllers/user.js";
import {verifyUser, verifyAdmin} from "../utils/verifyToken.js";
const router = express.Router();

// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//     res.send("hello user you are authenticated");
// })


// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//     res.send("hello user you are logged and you can delete you account");
// })


// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//     res.send("hello admin you are logged and you can delete all account");
// })

//_____ UPDATE
router.put("/:id", verifyUser, updateUser); // updateUser is a function


//_____ DELETE
router.delete("/:id", verifyUser, deleteUser); // deleteUser is a function


//_____ GET
router.get("/:id", verifyUser, getUser); // getUser is a function


//_____ GET ALL
router.get("/", verifyAdmin, getAllUsers); // getAllUser is a function



export default router