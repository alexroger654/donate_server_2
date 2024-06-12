

import { IProduct } from "./product.interface";
import Product from "./product.model";





export const createProductToDB = async (payload: IProduct): Promise<IProduct> => {
  // creating a new user
  const result = new Product(payload); 
  await result.save();
  return  result;
};

export const getProductFromDB = async (): Promise<IProduct[]> => {
  const result = await Product.find();
  return result;
};


export const updateProductInDB = async (id: string, payload: IProduct) => {
  const updatedTask = await Product.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return updatedTask;
};






