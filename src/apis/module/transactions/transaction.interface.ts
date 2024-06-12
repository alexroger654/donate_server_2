export interface ITransaction {
  user_Id: string;
  user_name: string;
  amount: number;
  payment_method: string;
  transaction_type: "one_time" | "monthly";
  status: "completed" | "pending";
  product_name: string;
  product_id: string;
  createdAt: Date;
  updatedAt: Date;
}
