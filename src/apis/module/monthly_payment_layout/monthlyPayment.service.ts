import { IMonthlyPayment } from "./monthlyPayment.interface";
import MonthlyPayment from "./monthlyPayment.model";







export const createMonthlyPaymentToDB = async (payload: IMonthlyPayment): Promise<IMonthlyPayment> => {
  // creating a new user
  const result = new MonthlyPayment(payload); 
  await result.save();
  return  result;
};

export const getMonthlyPaymentFromDB = async (): Promise<IMonthlyPayment[]> => {
  const result = await MonthlyPayment.find();
  return result;
};







