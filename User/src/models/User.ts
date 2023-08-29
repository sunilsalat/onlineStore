import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "first name is required"],
  },
  lastName: {
    type: String,
    required: [true, "last name is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
  },
  dob: {
    type: Date,
  },
  phone: {
    type: Number,
    required: [true, "phone is required"],
  },
  isAllowed: {
    type: Boolean,
    default: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  lastLogin: {
    type: Date,
  },
  lastLoginAttempt: {
    type: Number,
  },
});

const User = mongoose.model("User", UserSchema);

export { User };
