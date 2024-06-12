import { HydratedDocument, Model } from "mongoose";

// Common fields for all users
export interface IUser {
  role: "consumer" | "admin" | "employee";
  name: string;
  email: string;
  password: string;
  gender?: "male" | "female" | "other";
  phone_number: string;
}
