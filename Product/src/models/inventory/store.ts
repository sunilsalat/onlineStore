import mongoose, { Schema } from "mongoose";

const StoreSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "first name is required"],
        },
    },
    { timestamps: true }
);

StoreSchema.index({ name: 1 }, { unique: true });

const Store = mongoose.model("Store", StoreSchema);

export { Store };
