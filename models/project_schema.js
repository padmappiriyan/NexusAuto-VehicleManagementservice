import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    vehicleId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'vehicles',
        required:true
    },
    appointmentId:{
        type:String,
        required:true
    },
    customerId:{
        type:String,
        required:true
    },
    serviceType:{
        type:String,
         required:true
    },
    status:{
        type:String,
        enum:["In Progress","Completed","On Hold"],
        default:"In Progress"
    },
    projectType:{
    type: String,
    enum: ["Service", "Modification"],
    default: "Service"
    },
    startDate:{
        type:Date,
        default:Date.now  
    },
    endDate:{
        type:Date,
        default:null
    },
    assignedTechnician:{
        type:String,
        required:true
    },
    notes:{
        type:String,
        default:"No Additional Notes"
    }
},{timestamps: true}
);

const Project = mongoose.model('projects', projectSchema);

export default Project;