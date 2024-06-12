import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import {
  createCampaignToDB,
  getCampaignFromDB,
  updateCampaignInDB,
} from "./campaign.service";

// ==================== create user ======================
export const createCampaign = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const {
      campaign_name,
      targeted_amount,
      category_name,
      start_date,
      end_date,
      documents,
    } = data;

    if (!category_name) {
      return res.status(400).json({ error: "category_name is required" });
    }

    if (
      !campaign_name ||
      !targeted_amount ||
      // !documents ||
      !end_date ||
      !start_date
    ) {
      return res.status(400).json({
        error:
          "start date , end date, documents, targeted amount and name  are required",
      });
    }

    const result = await createCampaignToDB(data);

    res.status(200).json({
      status: "success",
      data: result,
      message: " created successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: ` creation failed ${err}`,
    });
  }
};

// ==================== get users ======================
export const getCampaign = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // query parameters ============
  const { name, sort, id, user, category, status } = req.query;

  console.log(status, "pppp");

  const result = await getCampaignFromDB(
    name,
    sort,
    id,
    user,
    status,
    category
  );

  res.status(200).json({
    status: "success",
    data: result,
  });
};
// ==================== get users ======================

// ==================== update Campaigns ======================
export const updateCampaignName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (!id) {
      return res.status(400).json({ error: "Campaign ID is required" });
    }

    // update Campaign =============================
    const Campaign = updateCampaignInDB(id, data);

    if (!Campaign) {
      return res.status(404).json({ error: "Campaign not found" });
    }

    // Sending a success response
    res.status(200).json({
      data: Campaign,
      message: "Campaign updated successfully",
    });
  } catch (error: any) {
    // Handling errors
    console.error("Error updating Campaign name:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
