import express from 'express';
import { createVehicle, getVehiclesByCustomer,getAllVehicles,modifyVehicle,deleteVehicle } from '../controllers/vehicle_controller.js';
import { authenticateUser } from '../config/authmiddleware.js';
const router=express.Router();

router.post("/add_vehicles",authenticateUser,createVehicle);
router.get("/get_vehicles",authenticateUser,getVehiclesByCustomer);
router.get("/get_all_vehicles",authenticateUser,getAllVehicles);

router.put("/update_vehicle/:id",authenticateUser,modifyVehicle);
router.delete("/delete_vehicle/:id",authenticateUser,deleteVehicle);


export default router;