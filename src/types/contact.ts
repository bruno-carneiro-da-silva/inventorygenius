export type Contact = {
  id: string;
  photo: string;
  name: string;
  email?: string;
  phone?: string;
  uId: string;
  createdAt: string;
  lastName: string;
  city: string;
  contact: {
    Mail: string;
    Phone: string;
  };
  status: "ACTIVATED" | "INACTIVE";
  totalPages: number,
  currentPage: number,
};
