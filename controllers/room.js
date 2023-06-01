import Room from '../models/Room.js';
import Hotel from '../models/Hotel.js';

export const createRoom = async (req, res, next) => {

    const hotelId = req.params.hotelid;
    const newRoom = new Room(req.body);

    try{
        const savedRoom = await newRoom.save();
        try{
            await Hotel.findByIdAndUpdate(hotelId, {$push : {rooms: savedRoom._id}})
        } catch(err){
            next(err);
        }
        res.status(200).json(savedRoom);
    } catch(err){
        next(err);
    }

}

export const updateRoom = async(req, res, next) => {
    try {
        const updatedroom = await Room.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedroom);
    } catch (err) {
        next(err);
    }
}

export const updateRoomAvailability = async(req, res, next) => {
    try {
        await Room.updateOne({"roomNumbers._id" : req.params.id}, {
            $push:{
                "roomNumbers.$.unavailableDates" : req.body.dates
            }
        })
        res.status(200).json("Room Status has been updated");
    } catch (err) {
        next(err);
    }
}

export const deleteRoom = async(req, res, next) => {

    try {
        try{
            const hotel = await Hotel.find({"rooms" : req.params.id});
            await Room.findByIdAndDelete(req.params.id);
            await Hotel.findByIdAndUpdate(hotel[0]._id, {$pull : {rooms: req.params.id}})
        } catch(err){
            next(err);
        }
        res.status(200).json("Deleted Successfully");
    } catch (err) {
        next(err);
    }
}

export const getRoom = async(req, res, next) => {
    try {
        const getroom = await Room.findById(req.params.id);
        res.status(200).json(getroom);
    } catch (err) {
        next(err);
    }
}

export const getRooms = async(req, res, next) => {
    try {
        const allrooms = await Room.find();
        res.status(200).json(allrooms);
    } catch (err) {
        next(err);
    }
}

