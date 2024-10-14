import { Company } from "@/queries/company/types";

export const companyMock: Company = {
  errors: [],
  succeeded: true,
  data: {
    id: 1,
    uId: "123e4567-e89b-12d3-a456-426614174000",
    name: "Example Company",
    email: "contact@example.com",
    phoneNumber: "+1234567890",
    photoUrl: "https://example.com/photo.jpg",
    address: "123 Example Street, Example City, EX 12345",
  },
};
