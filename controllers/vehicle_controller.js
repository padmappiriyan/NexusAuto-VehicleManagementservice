import Vehicle from "../models/vehicle_schema.js";

// Create a new vehicle
export const createVehicle = async (req, res) => {
    try{
         const { vehicleType, brand, model, year, licensePlate, color, notes } = req.body;
         const customerId = req.customerId;
         if(!customerId){
            return res.status(400).json({message:"User not authenticated"});
         }
         const newVehicle = new Vehicle({
            customerId,
            vehicleType,
            brand,  
            model,
            year,
            licensePlate,   
            color,
            notes
            });
        const savedVehicle = await newVehicle.save();
        const { customerId:_, ...vehicleData } = savedVehicle.toObject();
        res.status(201).json({
            message: "Vehicle created successfully",
            vehicle: vehicleData
        });

    }
    catch(error){
        res.status(500).json({
            message: "Server Error",
            error: error.message});
    }
}

// Get all vehicles for a customer
export const getVehiclesByCustomer = async (req, res) => {
    try{
        const customerId = req.customerId;
        if(!customerId){
            return res.status(400).json({message:"User not authenticated"});
         }
        const vehicles = await Vehicle.find({ customerId });
        res.status(200).json({
            vehicles
        });
    }   
    catch(error){
        res.status(500).json({
            message: "Server Error",
            error: error.message});
    }
}


export const getAllVehicles = async (req, res) => {
    try{
        const vehicles = await Vehicle.find({});    
        res.status(200).json({
            vehicles
        });
    }
    catch(error){
        res.status(500).json({
            message: "Server Error",
            error: error.message});
    }
}

export const modifyVehicle = async (req, res) => {
   try{
    const vehicleId = req.params.id;
    const updateData = req.body;
    const updatedVehicle = await Vehicle.findByIdAndUpdate(vehicleId,{ $set:updateData }, { new: true , runValidators:true});
    if(!updatedVehicle){
        return  res.status(404).json({message:"Vehicle not found"});
    }
    res.status(200).json({
        message: "Vehicle updated successfully",
        vehicle: updatedVehicle
    });
   
   }
   catch(error){
    res.status(500).json({
        message: "Server Error",
        error: error.message});
   }
}

export const deleteVehicle = async (req, res) => {
    try{
        const vehicleId = req.params.id;    
        const deletedVehicle = await Vehicle.findByIdAndDelete(vehicleId);
        if(!deletedVehicle){
            return  res.status(404).json({message:"Vehicle not found"});
        }
        res.status(200).json({
            message: "Vehicle deleted successfully",
            vehicle: deletedVehicle
        });
    }
    catch(error){
        res.status(500).json({
            message: "Server Error",
            error: error.message});
    }
}

