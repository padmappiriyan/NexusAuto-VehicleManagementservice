import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import vehicleRoutes from './routes/vechile_route.js';
import projectRoutes from './routes/project_routes.js';
import bookingRoutes from "./routes/bookingRoutes.js";


dotenv.config();


const app=express();
connectDB();
const PORT=process.env.PORT || 3003;

//Allow all origins (anyone) to send requests to this API
app.use(cors());


app.use(express.json());

app.use("/api/vehicle",vehicleRoutes);
app.use("/api/bookings", bookingRoutes);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});

app.get("/",(req,res)=>{
    res.send("NexusAuto Vehicle Management Service is running");
});

app.use("/api/project",projectRoutes);


