import express from "express";
import Report from "../models/reportModel.js";

const router = express.Router();

// @route   GET /api/reports
router.get("/", async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   POST /api/reports
router.post("/", async (req, res) => {
  const { title, description } = req.body;
  try {
    const report = await Report.create({ title, description });
    res.status(201).json(report);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
