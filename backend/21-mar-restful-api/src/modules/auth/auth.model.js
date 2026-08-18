import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 50,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Email is required"],
      lowercase: true,
    },
    password: {
      type: String,
      minlength: 8,
      required: [true, "Password is required"],
      select: false,  // This field will not be returned in queries by default
    },
    role: {
      type: String,
      enum: ["customer", "seller", "admin"],
      default: "customer",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },

    verificationToken: {
      type: String,
      select: false,  // This field will not be returned in queries by default
    },
    refreshToken: {
      type: String,
      select: false,  // This field will not be returned in queries by default
    },
    resetPasswordToken: {
      type: String,
      select: false,  // This field will not be returned in queries by default
    },
    resetPasswordExpires: {
      type: Date,
      select: false,  // This field will not be returned in queries by default
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);
export default User;
