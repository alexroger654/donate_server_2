import mongoose, { Schema, model, Model } from "mongoose";
import { IUser } from "./user.interface";

// type UserModel = Model<IUser, {}, IUserMethods>;

const userBaseSchema = new Schema<IUser>({
  role: {
    type: String,
    enum: ["consumer", "admin", "employee"],
    default: "consumer",
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
  },
  phone_number: {
    type: String,
  },
});

// Define mongoose model
const User: Model<IUser> = mongoose.model("User", userBaseSchema);

export default User;
