import express  from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import authRoute from './routes/auth.js';
import hotelsRoute from './routes/hotels.js';
import roomsRoute from './routes/rooms.js';
import usersRoute from './routes/users.js';
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
dotenv.config()
const PORT = process.env.PORT || 8800;

mongoose.connect( process.env.MONGO_URL)
.then(console.log('Connected to MONGO_DB'))
.catch((err)=>{console.log(err)});

//  middlewares
app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use("/auth", authRoute);
app.use("/hotels", hotelsRoute);
app.use("/rooms", roomsRoute);
app.use("/users", usersRoute);

app.use((err, req, res, next) => {
    const errStatus = err.status || 500;
    const errMessage = err.message || "Something Went Wrong";
    return res.status(errStatus).json({
        success : false,
        status : errStatus,
        message : errMessage,
        stack : err.stack
    });
})


app.listen(PORT, () => {
    console.log(`Server started at port: ${PORT}`);
})