import mongoose, { Schema } from "mongoose";

const AttribueValueSchema = new mongoose.Schema({
  value: {
    type: String,
    required: [true, "first name is required"],
  },
  arttribueId: {
    type: Schema.Types.ObjectId,
    ref: "Attribute",
  },
});

const AttributeValue = mongoose.model("AttributeValue", AttribueValueSchema);

export { AttributeValue };
