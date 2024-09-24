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

export interface Plan {
  id: number;
  uid: string;
  name: string;
  description: string;
  prices: {
    id: number;
    benefits: string;
    name: "Ano" | "Mês";
    price: number;
  }[];
  externalIntegrationPaymentId: null;
  statusId: number;
  features: {
    name: string;
    description: string;
  }[];
}

export interface Feature {
  name: string;
  description: string;
}
