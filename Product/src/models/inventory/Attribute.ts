import mongoose from "mongoose";

const AttribueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
});

const Attribute = mongoose.model("Attribute", AttribueSchema);

export { Attribute };
