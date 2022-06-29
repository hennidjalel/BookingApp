import express from "express";
import { createHotel, updateHotel, deleteHotel, getHotel, getAllHotels, countByCity, countByType} from "../controllers/hotel.js";
import {verifyAdmin} from "../utils/verifyToken.js";


const router = express.Router();

//_____ CREATE
router.post("/", verifyAdmin, createHotel);  // createHotel is a function


//_____ UPDATE
router.put("/:id", verifyAdmin, updateHotel); // updateHotel is a function


//_____ DELETE
router.delete("/:id", verifyAdmin, deleteHotel); // deleteHotel is a function


//_____ GET
router.get("/find/:id", getHotel); // getHotel is a function


//_____ GET ALL
router.get("/", getAllHotels); // getAllHotels is a function
router.get("/countByCity", countByCity); // getAllHotels is a function
router.get("/countByType", countByType); // getAllHotels is a function



export default router