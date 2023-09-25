import mongoose, { Schema } from "mongoose";

const AttribueOptionsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  attributeId: {
    type: Schema.Types.ObjectId,
    ref: "Attribute",
  },
});

const AttributeOptions = mongoose.model(
  "AttributeOptions",
  AttribueOptionsSchema
);

export { AttributeOptions };
