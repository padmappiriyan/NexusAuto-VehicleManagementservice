import express from "express";
import TaskSubmission from "../models/inventoryUsage.js";

const router = express.Router();

// POST — submit inventory usage for a task
router.post("/", async (req, res) => {
  try {
    const { employee, taskName, usedInventory } = req.body;

    if (!employee || !taskName || !usedInventory?.length) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const submission = new TaskSubmission({
      employee,
      taskName,
      usedInventory,
    });

    await submission.save();
    res.status(201).json({ message: "Task submission saved successfully." });
  } catch (err) {
    console.error("Error saving submission:", err);
    res.status(500).json({ message: "Server error while saving task submission." });
  }
});

// ✅ GET — Retrieve all task submissions with inventory details
router.get("/", async (req, res) => {
  try {
    const submissions = await TaskSubmission.find()
      .populate("usedInventory.inventoryId", "item quantity") // get item name & stock
      .sort({ createdAt: -1 }); // latest first

    if (!submissions.length) {
      return res.status(404).json({ message: "No task submissions found." });
    }

    res.status(200).json(submissions);
  } catch (err) {
    console.error("Error fetching submissions:", err);
    res.status(500).json({ message: "Server error while fetching submissions." });
  }
});

export default router;
