import Hotel from "../models/Hotel.js";

export const createHotel = async(req, res, next) => {
    const newHotel = new Hotel(req.body);
    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
    } catch (err) {
        next(err)
    }
}

export const updateHotel = async(req, res, next) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedHotel);
    } catch (err) {
        next(err);
    }
}

export const deleteHotel = async(req, res, next) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Deleted Successfully");
    } catch (err) {
        next(err);
    }
}

export const getHotel = async(req, res, next) => {
    try {
        const getHotel = await Hotel.findById(req.params.id);
        res.status(200).json(getHotel);
    } catch (err) {
        next(err);
    }
}

export const getHotels = async(req, res, next) => {
    const { min, max, limit, city, ...others } = req.query;
    try {
        const allHotel = await Hotel.find({...others, city : {"$regex" : city, "$options" : "i"}, cheapestPrice : {$gte : min || 1, $lte : max || 99999}}).limit(limit);
        res.status(200).json(allHotel);
    } catch (err) {
        next(err);
    }
}

export const countByCity = async(req, res, next) => {
    const cities = req.query.cities.split(",");
    try {
        const list = await Promise.all(cities.map(city => {
            return Hotel.countDocuments({city:{"$regex" : city, "$options" : "i"}});
        }))
        res.status(200).json(list);
    } catch (err) {
        next(err);
    }
}

export const countByType = async(req, res, next) => {
    try{
        const hotelCount = await Hotel.countDocuments({ type: {"$regex" : "hotel", "$options" : "i"} });
        const apartmentCount = await Hotel.countDocuments({ type: {"$regex" : "apartment", "$options" : "i"} });
        const resortCount = await Hotel.countDocuments({ type: {"$regex" : "resort", "$options" : "i"} });
        const villaCount = await Hotel.countDocuments({ type: {"$regex" : "villa", "$options" : "i"} });
        const cabinCount = await Hotel.countDocuments({ type: {"$regex" : "cabin", "$options" : "i"} });
        res.status(200).json([
            { type: "hotel", count: hotelCount },
            { type: "apartments", count: apartmentCount },
            { type: "resorts", count: resortCount },
            { type: "villas", count: villaCount },
            { type: "cabins", count: cabinCount }
        ]);
    } catch (err) {
        next(err);
    }
}