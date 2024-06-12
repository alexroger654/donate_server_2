import { ICategory } from "./category.interface";
import Category from "./category.model";

export const createCategoryToDB = async (
  payload: ICategory
): Promise<ICategory> => {
  // creating a new user
  const result = new Category(payload);
  await result.save();
  return result;
};

export const getCategoryFromDB = async (): Promise<ICategory[]> => {
  const result = await Category.find();
  return result;
};

export const updateCategoryInDB = async (id: string, payload: ICategory) => {
  const updatedTask = await Category.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return updatedTask;
};

export const deleteFromDb = async (id: string) => {
  try {
    const deletedAppointment = await Category.findByIdAndDelete(id);
    return deletedAppointment;
  } catch (error) {
    console.error("Error deleting Appointment:", error);
    return null;
  }
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
