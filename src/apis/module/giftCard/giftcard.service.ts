import { IGiftCard } from "./giftcard.interface";
import GiftCard from "./giftcard.model";

export const createGiftCardToDB = async (
  payload: IGiftCard
): Promise<IGiftCard> => {
  // creating a new user
  const result = new GiftCard(payload);
  await result.save();
  return result;
};

export const getGiftCardFromDB = async (): Promise<IGiftCard[]> => {
  const result = await GiftCard.find();
  return result;
};

export const updateGiftCardInDB = async (id: string, payload: IGiftCard) => {
  const updatedTask = await GiftCard.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return updatedTask;
};
