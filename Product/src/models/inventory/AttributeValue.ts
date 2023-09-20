import mongoose, { Schema } from "mongoose";

const AttribueValueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  attributeId: {
    type: Schema.Types.ObjectId,
    ref: "Attribute",
  },
});

const AttributeValue = mongoose.model("AttributeValue", AttribueValueSchema);

export { AttributeValue };
