import express from 'express';
import { createVehicle, getVehiclesByCustomer,getAllVehicles,modifyVehicle,deleteVehicle } from '../controllers/vehicle_controller.js';
import { mockAuth } from '../config/authmiddleware.js';
const router=express.Router();

router.post("/add_vehicles",mockAuth,createVehicle);
router.get("/get_vehicles",mockAuth,getVehiclesByCustomer);
router.get("/get_all_vehicles",mockAuth,getAllVehicles);

router.put("/update_vehicle/:id",mockAuth,modifyVehicle);
router.delete("/delete_vehicle/:id",mockAuth,deleteVehicle);


export default router;