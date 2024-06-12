export interface IDonation {
  type: "monthly_payment" | "donation" | "gift_cards";
  amount: number;
  userId: string;
  status: "pending" | "completed" | "failed";
  paymentMethod: "credit_card" | "paypal" | "bank_transfer";
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}
