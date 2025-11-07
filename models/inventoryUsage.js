import mongoose from "mongoose";

const usedInventorySchema = new mongoose.Schema({
  inventoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Inventory", required: true },
  quantityUsed: { type: Number, required: true },
});

const taskSubmissionSchema = new mongoose.Schema({
  employee: { type: String, required: true },
  taskName: { type: String, required: true },
  usedInventory: [usedInventorySchema],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("TaskSubmission", taskSubmissionSchema);
