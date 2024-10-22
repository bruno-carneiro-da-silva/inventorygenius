export interface CategoryDetails {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryMapperInit {
  id?: string;
  name: string;
}

export interface DeleteContactResponse {
  message: string;
}
