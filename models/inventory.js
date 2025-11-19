import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
  item: { type: String, required: true },
  quantity: { type: String, required: true },
});

export default mongoose.model("Inventory", inventorySchema);
