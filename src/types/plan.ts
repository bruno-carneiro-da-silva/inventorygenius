export type PlanDetails = {
  id: string;
  name: string;
  price: string;
  storage: string;
  features: string[];
  status: string;
  created_at: string;
  updated_at: string;
  [key: string]: string | string[] | number;
};
