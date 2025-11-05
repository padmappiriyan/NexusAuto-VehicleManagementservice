import express from 'express';
import {acceptRequestAndCreateProject,getProjectsByTechnician,getAllProjects,updateProjectStatus,getProjectsByCustomer,
getProjectsByType,deleteProjectById,getProjectsByStatus,getProjectById}  from "../controllers/project_controller.js";
import { mockAuthTechnision } from '../config/technicianmiddleware.js';

const router=express.Router();

router.post("/accept_request/:requestId",mockAuthTechnision,acceptRequestAndCreateProject);
router.get("/technician_projects",mockAuthTechnision,getProjectsByTechnician);
router.get("/all_projects",getAllProjects);
router.patch("/update_project_status/:id",mockAuthTechnision,updateProjectStatus);

router.get("/customer_projects/:customerId",mockAuthTechnision,getProjectsByCustomer);
router.get("/projects_by_type/:serviceType",mockAuthTechnision,getProjectsByType);
router.get("/projects_by_status/:status",mockAuthTechnision,getProjectsByStatus);
router.get("/project_details/:projectId",mockAuthTechnision,getProjectById);
router.delete("/delete_project/:id",mockAuthTechnision,deleteProjectById);

export default router;
