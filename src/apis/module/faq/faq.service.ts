
import { IFaq } from "./faq.interface";
import Faq from "./faq.model";





export const createFaqToDB = async (payload: IFaq): Promise<IFaq> => {
  // creating a new user
  const result = new Faq(payload); 
  await result.save();
  return  result;
};

export const getFaqFromDB = async (): Promise<IFaq[]> => {
  const result = await Faq.find();
  return result;
};







