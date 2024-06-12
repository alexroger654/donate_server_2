import { IDonation } from "./donation.interface";
import Donation from "./donation.model";

export const createDonationToDB = async (
  payload: IDonation
): Promise<IDonation> => {
  // creating a new user
  const result = new Donation(payload);
  await result.save();
  return result;
};

export const getDonationFromDB = async (): Promise<IDonation[]> => {
  const result = await Donation.find();
  return result;
};
