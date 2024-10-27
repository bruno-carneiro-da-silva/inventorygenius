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
  ContactDetailResponse,
  EditContactPayload,
  GetContactsResponse,
} from "@/queries/contact/types";

const getContacts = async (page: number, filter: string) => {
  const { data } = await api.get<GetContactsResponse>(`/contacts?page=${page}&filter=${filter}`);
  return { ...data, contacts: CreateContactMapper.toDomain(data.contacts) };
};

const getContactDetail = async (id?: string) => {
  if (!id) return undefined
  const { data } = await api.get<ContactDetailResponse>(`/contacts/${id}`)
  return data
}

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
    "/contacts",
    body
  );
  return data;
};

const updateContact = async ({ id, ...payload }: EditContactPayload) => {
  const body = CreateContactMapper.toPersistence(payload);
  const { data } = await api.put<CreateContactResponse>(
    `/contacts/${id}`,
    body
  );
  return data;
};

const deleteContact = async (payload: DeleteContact) => {
  const { data } = await api.delete<DeleteContactResponse>(`/contacts/${payload.id}`);
  return data;
};

export const useGetContacts = (page: number, filter: string) => {
  return useQuery({
    queryKey: ["contact", page, filter],
    queryFn: () => getContacts(page, filter),
  });
};

export const useGetContactDetail = (id?: string) => {
  return useQuery({
    queryKey: ["contact-detail"],
    queryFn: () => getContactDetail(id)
  })
}

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

export const useUpdateContact = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: EditContactPayload) => updateContact(payload),
    onMutate: () => {
      queryClient.invalidateQueries({ queryKey: ["create-contact"] });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact"] });
      queryClient.invalidateQueries({ queryKey: ["contact-detail"] });
    },
  });
}

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
