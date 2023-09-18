import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "first name is required"],
  },
  description: {
    type: String,
  },
  isActive: {
    type: Boolean,
  },
});

const Category = mongoose.model("Category", CategorySchema);

export { Category };
