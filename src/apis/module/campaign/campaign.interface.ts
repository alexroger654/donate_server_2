export interface ICampaign {
  user_name: string;
  user_email: string;
  user_phone_number: string;
  user_id: string;

  campaign_name: string;
  campaign_description: string;
  beneficiary_party_type: "individual" | "ngo";
  beneficiary_party_name: string;
  image_url: string;
  category_name: string;
  targeted_amount: number;
  raised_amount: number;

  location: string;
  start_date: Date;
  end_date: Date;
  product_ids: string[];
  product_kit_ids: string[];
  documents: string[];
  isVerified: boolean;
  created_at: Date;
  status: "pending" | "active" | "rejected" | "onHold";
  rejectMessage: string;
  products: {
    product_id: string;
    product_name: string;
    product_description: string;
    product_price: number;
    product_quantity: number;
    product_image_url: string;
  }[];
  productKits: {
    name: string;
    products: {
      product_id: string;
      product_name: string;
      product_description: string;
      product_price: number;
      product_quantity: number;
      product_image_url: string;
    }[];
  };
}
