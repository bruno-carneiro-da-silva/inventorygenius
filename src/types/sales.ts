export type salesProps = {
  id: number;
  product: string;
  customer: string;
  tag: string;
  price: string;
  rating: number;
  totalSells: number;
  interestings: string;
  progressBar: number;
  image: string;
};

export type salesTransactionsProps = {
  id: string;
  uId: string;
  date: string;
  value: number;
  status: string;
};

export type Product = {
  id: string;
  uId: string;
  photo: string;
  name: string;
  price: number;
  tag: string;
  quantity: number;
  total: number;
  rating: number;
  interesting: number;
  circlePercentage: number;
  material: string[];
  caracteristic: string;
  description: string;
};
