import express from "express";
import { createRoom, deleteRoom, getAllRooms, getRoom, updateRoom } from "../controllers/room.js";
import {verifyAdmin} from "../utils/verifyToken.js";

const router = express.Router();


//_____ CREATE
router.post("/:hotelid", verifyAdmin, createRoom);  // createRoom is a function


//_____ UPDATE
router.put("/:id", verifyAdmin, updateRoom); // updateRoom is a function


//_____ DELETE
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom); // deleteRoom is a function


//_____ GET
router.get("/:id", getRoom); // getRoom is a function


//_____ GET ALL
router.get("/", getAllRooms); // getAllRooms is a function



export default router