import express from "express";
import Task from "../models/taskModel.js";

const router = express.Router();

// ✅ GET all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();

    // 🕒 Add displayTime for completed tasks
    const formattedTasks = tasks.map((task) => {
      if (task.status === "Completed" && task.startTime && task.endTime) {
        const diffMs = task.endTime - task.startTime;
        const diffMinutes = Math.floor(diffMs / (1000 * 60));
        const hours = Math.floor(diffMinutes / 60);
        const minutes = diffMinutes % 60;

        let displayTime = "";
        if (hours > 0 && minutes > 0)
          displayTime = `${hours} hr${hours > 1 ? "s" : ""} ${minutes} min${minutes > 1 ? "s" : ""}`;
        else if (hours > 0)
          displayTime = `${hours} hr${hours > 1 ? "s" : ""}`;
        else displayTime = `${minutes} min${minutes > 1 ? "s" : ""}`;

        return { ...task.toObject(), displayTime };
      }

      return task.toObject();
    });

    res.json(formattedTasks);
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET task statistics (MUST COME BEFORE /:id)
router.get("/stats", async (req, res) => {
  try {
    const totalTasks = await Task.countDocuments();
    const completedTasks = await Task.countDocuments({ status: "Completed" });
    const pendingTasks = await Task.countDocuments({ status: "Pending" });
    const inProgressTasks = await Task.countDocuments({ status: "In Progress" });

    res.json({
      total: totalTasks,
      completed: completedTasks,
      pending: pendingTasks,
      inProgress: inProgressTasks,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Fetch recent tasks sorted by latest updates
router.get("/recent", async (req, res) => {
  try {
    const tasks = await Task.find().sort({ updatedAt: -1 }).limit(4); // latest 5
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ GET task by ID
router.get("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    // Add displayTime if completed
    if (task.status === "Completed" && task.startTime && task.endTime) {
      const diffMs = task.endTime - task.startTime;
      const diffMinutes = Math.floor(diffMs / (1000 * 60));
      const hours = Math.floor(diffMinutes / 60);
      const minutes = diffMinutes % 60;

      let displayTime = "";
      if (hours > 0 && minutes > 0)
        displayTime = `${hours} hr${hours > 1 ? "s" : ""} ${minutes} min${minutes > 1 ? "s" : ""}`;
      else if (hours > 0)
        displayTime = `${hours} hr${hours > 1 ? "s" : ""}`;
      else displayTime = `${minutes} min${minutes > 1 ? "s" : ""}`;

      return res.json({ ...task.toObject(), displayTime });
    }

    res.json(task);
  } catch (err) {
    console.error("Error fetching task:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ UPDATE task (Start, Complete, etc.)
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;

    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (status) {
      task.status = status;

      if (status === "In Progress" && !task.startTime) {
        task.startTime = new Date(); // ⏱ Start time
      }

      if (status === "Completed") {
        task.endTime = new Date(); // ✅ End time

        if (task.startTime) {
          const diffMs = task.endTime - task.startTime;
          const diffMinutes = Math.floor(diffMs / (1000 * 60));
          const hours = Math.floor(diffMinutes / 60);
          const minutes = diffMinutes % 60;

          task.timeLogged = diffMinutes; // store total minutes

          let displayTime = "";
          if (hours > 0 && minutes > 0)
            displayTime = `${hours} hr${hours > 1 ? "s" : ""} ${minutes} min${minutes > 1 ? "s" : ""}`;
          else if (hours > 0)
            displayTime = `${hours} hr${hours > 1 ? "s" : ""}`;
          else displayTime = `${minutes} min${minutes > 1 ? "s" : ""}`;

          await task.save();
          return res.json({ ...task.toObject(), displayTime });
        }
      }
    }

    await task.save();
    res.json(task);
  } catch (err) {
    console.error("Error updating task:", err);
    res.status(500).json({ message: "Server error updating task" });
  }
});


export default router;
