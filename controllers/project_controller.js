import Project from "../models/project_schema.js";
import Vehicle from "../models/vehicle_schema.js";

import mongoose from "mongoose";

//Accept the request to create a new project
export const acceptRequestAndCreateProject=async(req,res)=>{
    try{
         const appointmentId=req.params.requestId;
         console.log("Request ID:",appointmentId);
         const technicianID=req.technisionId;
         console.log("Technician ID:",technicianID);
         
        //validte technician authentication
         if(!technicianID){  
            return res.status(400).json({message:"Technician not authenticated"});
         }

        //Get the customerId, vehicleId, technicianId from the another microservice
          const requestData= {
            customerId: "68fbad16af0882876851bfa9",
            vechileId: "68fbad16af0882876851bfa8",
            serviceType: "Oil Change",
            notes: "Please change the oil filter as well."
     };
     
        //Create a new project using the request data
         const newProject=new Project({
        vehicleId: requestData.vechileId,
        customerId: requestData.customerId,
        appointmentId: appointmentId,
        serviceType: requestData.serviceType,
        assignedTechnician: technicianID,
        notes: requestData.notes,
        assignedTechnician: technicianID,
        startDate: Date.now(),
        });

        const savedProject=await newProject.save();
        res.status(201).json({
            message: "Project created successfully",
            project: savedProject
        });
        
       }
    catch(error){
        res.status(500).json({
            message: "Server Error",
            error: error.message});
    }
}

//Get all projects assigned to a technician
export const getProjectsByTechnician=async(req,res)=>{
    try{
            const technicianID=req.technisionId;
            if(!technicianID){
                return res.status(400).json({message:"Technician not authenticated"});
            }
            const projects=await Project.find(technicianID).populate('vehicleId').populate('assignedTechnician');

            res.status(200).json({
                projects,
                message:"Projects fetched successfully"
            });
            
    }
    catch(error){
        res.status(500).json({
            message: "Server Error",
            error: error.message});
    }
}

//Get all projects in the system (for admin purposes)
export const getAllProjects=async(req,res)=>{
    try{
        const projects=await Project.find({}).populate('vehicleId').populate('assignedTechnician');

        res.status(200).json({
            projects,
            message:"All Projects fetched successfully"
        });
    }
    catch(error){
        res.status(500).json({
            message: "Server Error",
            error: error.message});
    }
}

//Update project status
export const updateProjectStatus=async(req,res)=>{
    try{
        const projectId=req.params.projectId;
        const {status,endDate}=req.body;
        const validStatuses=["In Progress","Completed","On Hold"];

        if(!validStatuses.includes(status)){
            return res.status(400).json({message:"Invalid status value"});
        }
        const updatedProject=await Project.findByIdAndUpdate(projectId,
            {
                $set:{  
                    status:status,
                    endDate:endDate || null
                }
            },
            {new:true, runValidators:true}
            );
        if(!updatedProject){
            return res.status(404).json({message:"Project not found"});
        }
        res.status(200).json({
            message: "Project status updated successfully",
            project: updatedProject
        });
    }
    catch(error){
        res.status(500).json({
            message: "Server Error",
            error: error.message});
    }
}

//Get all projects for a specific customer
export const getProjectsByCustomer=async(req,res)=>{
    try{    
            const customerId=req.customerId;
            
            if(!customerId){
                return res.status(400).json({message:"User not authenticated"});
            }
            const projects=await Project.find({customerId}).populate('vehicleId')

            res.status(200).json({
                projects,
                message:"Projects fetched successfully"
            });
        }
    catch(error){
        res.status(500).json({
            message: "Server Error",
            error: error.message});
    }
}

//Get project details by ID
export const getProjectById=async(req,res)=>{
    try{
        const projectId=req.params.projectId;
        if(!mongoose.Types.ObjectId.isValid(projectId)){
            return res.status(400).json({message:"Invalid project ID"});
        }
        const project=await Project.findById(projectId).populate('vehicleId').populate('assignedTechnician');
        if(!project){
            return res.status(404).json({message:"Project not found"});
        }
        res.status(200).json({
            project,
            message:"Project fetched successfully"
        });
    }
    catch(error){
        res.status(500).json({
            message: "Server Error",
            error: error.message});
    }
}

//Get all projects with a specific status
export const getProjectsByStatus=async(req,res)=>{
    try{
        const status=req.params.status;
        const validStatuses=["In Progress","Completed","On Hold"]; 
        if(!validStatuses.includes(status)){
            return res.status(400).json({message:"Invalid status value"});
        }
        const projects=await Project.find({status}).populate('vehicleId').populate('assignedTechnician');

        res.status(200).json({ 
            projects,
            message:"Projects fetched successfully"
        }); 
    }
    catch(error){
        res.status(500).json({
            message: "Server Error",
            error: error.message});
    }
}

//Get all projects of a specific type (Service or Modification)
export const getProjectsByType=async(req,res)=>{
    try{
        const projectType=req.params.projectType;
        const validTypes=["Service","Modification"];
        if(!validTypes.includes(projectType)){
            return res.status(400).json({message:"Invalid project type"});
        }
        const projects=await Project.find({projectType}).populate('vehicleId').populate('assignedTechnician');

        res.status(200).json({
            projects,   
            message:"Projects fetched successfully"
        }); 
    }
    catch(error){
        res.status(500).json({
            message: "Server Error",
            error: error.message});
    }   
}

//Delete a project by ID
export const deleteProjectById=async(req,res)=>{
    try{
        const projectId=req.params.projectId;
        if(!mongoose.Types.ObjectId.isValid(projectId)){
            return res.status(400).json({message:"Invalid project ID"});
        }
        const deletedProject=await Project.findByIdAndDelete(projectId);        
        if(!deletedProject){
            return res.status(404).json({message:"Project not found"});
        }
        res.status(200).json({
            message: "Project deleted successfully",
            project: deletedProject
        });
    }       
    catch(error){   
        res.status(500).json({
            message: "Server Error",
            error: error.message});
    }
}


