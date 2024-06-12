import { ITransaction } from "./transaction.interface";
import Transaction from "./transaction.model";

export const createTransactionToDB = async (
  payload: ITransaction
): Promise<ITransaction> => {
  // creating a new user
  const result = new Transaction(payload);
  await result.save();
  return result;
};

export const getTransactionFromDB = async (
  name: any,
  product_id: any,
  user_id: any
): Promise<ITransaction[]> => {
  let query: any = {};

  if (name) {
    query.user_name = name;
  }
  if (product_id) {
    query.product_id = product_id;
  }
  if (user_id) {
    query.user_id = user_id;
  }
  let sort: any = { created_at: 1 };

  console.log(query, "-----------------------");

  const result = await Transaction.find(query).sort(sort);

  // const result = await Transaction.find();
  return result;
};
