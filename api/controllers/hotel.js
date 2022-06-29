import Hotel from "../models/Hotel.js";

//____________ creat Hotel ____________
export const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body)

    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel)
    } catch (err) {
        console.log(err);
        next(err);
    }
}


//____________ update Hotel ____________
export const updateHotel = async (req, res, next) => {
    try {
        const updatedHotels = await Hotel.findByIdAndUpdate(req.params.id, {$set: req.body} , {new: true});
        res.status(200).json(updatedHotels)
    } catch (err) {
        console.log(err);
        next(err);
    }
}

//____________ delete Hotel ____________
export const deleteHotel = async (req, res, next) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel has been deleted")
    } catch (err) {
        console.log(err);
        next(err);
    }
}


//____________ get Hotel ____________
export const getHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json(hotel)
    } catch (err) {
        console.log(err);
        next(err);
    }
}


//____________ get All Hotels ____________
export const getAllHotels = async (req, res, next) => {
    try {
        const Hotels = await Hotel.find();
        res.status(200).json(Hotels)
    } catch (err) {
        console.log(err);
        next(err);
    }
}


export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",")
    try {
        const list = await Promise.all(cities.map(city =>{
            return Hotel.countDocuments({city:city})
        }))
        res.status(200).json(list)
    } catch (err) {
        console.log(err);
        next(err);
    }
}


export const countByType = async (req, res, next) => {
    try {
        const hotelCount = await Hotel.countDocuments({type:"hotel"})
        const apartmentCount =await Hotel.countDocuments({type:"apartment"})
        const resortCount =await Hotel.countDocuments({type:"resort"})
        const villaCount =await Hotel.countDocuments({type:"villa"})
        const cabinCount =await Hotel.countDocuments({type:"cabin"})

        res.status(200).json([
            { type: "hotel", count: hotelCount },
            { type: "apartments", count: apartmentCount },
            { type: "resorts", count: resortCount },
            { type: "villas", count: villaCount },
            { type: "cabins", count: cabinCount },
        ]);
    } catch (err) {
        console.log(err);
        next(err);
    }
}