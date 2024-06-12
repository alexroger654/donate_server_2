import { IProductKit } from "./productKit.interface";
import Product from "./productKit.model";

export const createProductToDB = async (
  payload: IProductKit
): Promise<IProductKit> => {
  // creating a new user
  const result = new Product(payload);
  await result.save();
  return result;
};

export const getProductFromDB = async (): Promise<IProductKit[]> => {
  const result = await Product.find();
  return result;
};

export const updateProductInDB = async (id: string, payload: IProductKit) => {
  const updatedTask = await Product.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return updatedTask;
};
