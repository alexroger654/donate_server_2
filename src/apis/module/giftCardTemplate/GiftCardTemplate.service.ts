import { IGiftCardTemplate } from "./GiftCardTemplate.interface";
import GiftCardTemplate from "./GiftCardTemplate.model";

export const createGiftCardTemplateToDB = async (
  payload: IGiftCardTemplate
): Promise<IGiftCardTemplate> => {
  // creating a new user
  const result = new GiftCardTemplate(payload);
  await result.save();
  return result;
};

export const getGiftCardTemplateFromDB = async (): Promise<
  IGiftCardTemplate[]
> => {
  const result = await GiftCardTemplate.find();
  return result;
};

export const updateGiftCardTemplateInDB = async (
  id: string,
  payload: IGiftCardTemplate
) => {
  const updatedTask = await GiftCardTemplate.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return updatedTask;
};
