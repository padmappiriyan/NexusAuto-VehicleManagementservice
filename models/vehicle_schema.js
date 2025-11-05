import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
       customerId:{
        type:String,
        required:true
       },
       vehicleType: {
        type: String,
        enum: ["Car", "Bike", "Van", "Truck", "SUV","CAR"],
        required: true,
       },
       brand:{
        type:String,
        required:true
       },
       model:{
        type:String,
        required:true
       },
       year:{
        type:Number,
        required:true 
       },
       licensePlate:{
        type:String,
        required:true   
       },
       color:{
        type:String,
        default:"Not Specified"
        },
        notes:{
        type:String,
        default:"No Additional Notes"
       }

},
{timestamps: true})

const Vehicle = mongoose.model('vehicles', vehicleSchema);

export default Vehicle;