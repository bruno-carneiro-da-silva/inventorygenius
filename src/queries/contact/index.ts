import {
  QueryFunctionContext,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import api from "@/services/api";
import CreateContactMapper from "@/queries/contact/mappers/CreateContactMapper";
import {
  CreateContactResponse,
  Contact,
  GetContact,
  DeleteContact,
  DeleteContactResponse,
} from "@/queries/contact/types";
import DeleteContactMapper from "@/queries/contact/mappers/DeleteContactMapper";

const getContact = async (ctx: QueryFunctionContext) => {
  const [, companyUid, page, pageSize] = ctx.queryKey;
  if (!companyUid || !page || !pageSize) return;
  const { data } = await api.get<GetContact>(
    `/customer/company/${companyUid}/${page}/${pageSize}`
  );
  return CreateContactMapper.toDomain(data);
};

const getFilteredContact = async (ctx: QueryFunctionContext) => {
  const [, companyUid, page, pageSize, name] = ctx.queryKey;
  if (!companyUid || !page || !pageSize) return;
  const { data } = await api.get<GetContact>(`/customer/company/filter`, {
    params: {
      companyUid,
      page,
      pageSize,
      name,
    },
  });
  return data;
};

const createContact = async (payload: Contact) => {
  const body = CreateContactMapper.toPersistence(payload);
  const { data } = await api.post<CreateContactResponse>(
    "/customer/create",
    body
  );
  return data;
};

const deleteContact = async (payload: DeleteContact) => {
  const body = DeleteContactMapper.toPersistence(payload);
  const { data } = await api.delete<DeleteContactResponse>("/customer/delete", {
    data: body,
  });
  return data;
};

export const useGetCustomer = (
  companyUid: string,
  page: number,
  pageSize: number
) => {
  return useQuery({
    queryKey: ["contact", companyUid, page, pageSize],
    queryFn: getContact,
  });
};

export const useGetFilteredContact = (
  companyUid: string,
  page: number,
  pageSize: number,
  name?: string
) => {
  return useQuery({
    queryKey: ["filtered-contact", companyUid, page, pageSize, name],
    queryFn: getFilteredContact,
  });
};

export const useCreateContact = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: Contact) => createContact(payload),
    onMutate: () => {
      queryClient.invalidateQueries({ queryKey: ["create-contact"] });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact"] });
    },
  });
};

export const useDeleteContact = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: DeleteContact) => deleteContact(payload),
    onMutate: () => {
      queryClient.invalidateQueries({ queryKey: ["delete-contact"] });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact"] });
    },
  });
};
