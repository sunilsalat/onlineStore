import mongoose, { Schema } from "mongoose";

const AttribueOptionsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  attributeId: {
    type: Schema.Types.ObjectId,
    ref: "Attribute",
    required: [true, "attribute is required"],
  },
});

const AttributeOption = mongoose.model(
  "AttributeOptions",
  AttribueOptionsSchema
);

export { AttributeOption };
