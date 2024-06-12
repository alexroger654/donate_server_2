import { ICampaign } from "./campaign.interface";
import Campaign from "./campaign.model";

export const createCampaignToDB = async (
  payload: ICampaign
): Promise<ICampaign> => {
  // creating a new user
  const result = new Campaign(payload);
  await result.save();
  return result;
};

export const getCampaignFromDB = async (
  nameQuery: any,
  sortQuery: any,
  idQuery: any,
  user: any,
  status: any,
  category: any
): Promise<ICampaign[]> => {
  let query: any = {};

  // If name is provided, filter by name
  if (nameQuery) {
    query.campaign_name = { $regex: nameQuery, $options: "i" };
  }
  if (category) {
    query.category_name = category;
  }

  if (status) {
    console.log(status);
    query.status = status;
  }
  if (user) {
    query.user_id = user;
  }

  if (idQuery) {
    query._id = idQuery;
  }

  console.log(query, "pppppppppp");

  // // Sorting based on sortQuery
  let sort: any = { created_at: 1 }; // Default
  if (sortQuery && sortQuery.toLowerCase() === "desc") {
    sort = { created_at: -1 }; // descending order
  }

  const result = await Campaign.find(query).sort(sort);
  // const result = await Campaign.find({});

  console.log(result, "ooo");

  return result;
};

export const updateCampaignInDB = async (id: string, payload: ICampaign) => {
  const updatedTask = await Campaign.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return updatedTask;
};
