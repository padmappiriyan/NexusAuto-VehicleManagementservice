import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    vehicle: { type: String, required: true },
    employee: { type: String, required: true },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },
    timeLogged: { type: Number, default: 0 }, // in hours
    startTime: { type: Date }, // task start time
   endTime: { type: Date }, // task complete time
   createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true } // ✅ Automatically adds createdAt and updatedAt
);

export default mongoose.model("Task", taskSchema);