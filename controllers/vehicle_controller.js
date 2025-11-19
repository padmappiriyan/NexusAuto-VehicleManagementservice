import Vehicle from "../models/vehicle_schema.js";

// Create a new vehicle
export const createVehicle = async (req, res) => {
  try {
    const { vehicleType, brand, model, year, licensePlate, color, notes } = req.body;
    console.log("Request Body:", req.body);

    const customerId = req.customerId;
    if (!customerId) {
      return res.status(400).json({ message: "User not authenticated" });
    }

    // Save vehicle in DB
    const newVehicle = new Vehicle({
      customerId,
      vehicleType,
      brand,
      model,
      year,
      licensePlate,
      color,
      notes,
    });

    const savedVehicle = await newVehicle.save();

    // Pick only the needed fields to send in response
    const filteredVehicle = {
      _id: savedVehicle._id,
      vehicleType: savedVehicle.vehicleType,
      brand: savedVehicle.brand,
      model: savedVehicle.model,
      year: savedVehicle.year,
      licensePlate: savedVehicle.licensePlate,
      color: savedVehicle.color,
      notes: savedVehicle.notes,
    };

    //  Send only filtered data
    res.status(201).json({
      message: "Vehicle created successfully",
      vehicle: filteredVehicle,
    });
    
  } catch (error) {
    console.error("Error creating vehicle:", error);
    res.status(500).json({
      message: "Failed to create vehicle",
      error: error.message,
    });
  }
};

// Get all vehicles for a customer
export const getVehiclesByCustomer = async (req, res) => {
  try {
    const customerId = req.customerId;

    if (!customerId) {
      return res.status(400).json({ message: "User not authenticated" });
    }

    // Only select the required fields
    const vehicles = await Vehicle.find({ customerId })
      .select("vehicleType brand model year licensePlate color notes _id");

    return res.status(200).json(vehicles);
  } 
  catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};



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

