

import { ILead } from "./lead.interface";
import Lead from "./lead.model";





export const createLeadToDB = async (payload: ILead): Promise<ILead> => {
  // creating a new user
  const result = new Lead(payload); 
  await result.save();
  return  result;
};

export const getLeadFromDB = async (): Promise<ILead[]> => {
  const result = await Lead.find();
  return result;
};


export const updateLeadInDB = async (id: string, payload: ILead) => {
  const updatedTask = await Lead.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return updatedTask;
};






