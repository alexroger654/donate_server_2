import { IUser } from "./user.interface";
import User from "./user.model";

export const createUserToDB = async (payload: IUser): Promise<IUser> => {
  // creating a new user
  const user = new User(payload);
  await user.save();
  return user;
};

export const getUsersFromDB = async (): Promise<IUser[]> => {
  const users = await User.find();
  return users;
};
export const getUserByIdFromDB = async (
  payload: string
): Promise<IUser | null> => {
  try {
    const user = await User.findById(payload);
    return user;
  } catch (error) {
    console.error("Error finding user by ID:", error);
    return null;
  }
};

export const getUserByEmailFromDB = async (
  email: string
): Promise<IUser | null> => {
  const user = await User.findOne({ email: email });
  return user;
};

export const getAllUsersFromDBByCompanyEmail = async (
  companyEmail: string
): Promise<IUser[]> => {
  console.log("companyEmail", companyEmail);

  const users = await User.find({ companyEmail: companyEmail });
  return users;
};

// export const getAdminUsersFromDB = async () => {
//   const admins = await User.getAdminUsers();
//   console.log(admins);
//   return admins;
// };

//Class -> Attach -> Method -> Directly call using Class
// user = new User
// user.   instance methods
// User.getAdminUsers()
