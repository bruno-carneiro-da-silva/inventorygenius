import ProfileImg from "@/assets/logo_transparent.png";
import Button from "@/components/Button";
import Table from "@/components/Table";
import { showErrorToast } from "@/components/Toast";
import ModalCreateContact from "@/pages/Clients/Contacts/Modals/ModalCreate";
import ModalDelete from "@/pages/Clients/Contacts/Modals/ModalDelete";
import ModalDetails from "@/pages/Clients/Contacts/Modals/ModalDetails";
import ModalNote from "@/pages/Clients/Contacts/Modals/ModalNote";
import { useGetContacts } from "@/queries/contact";
import {
  ContactDetailResponse,
  ContactDetails,
  GetContact,
} from "@/queries/contact/types";
import { useMyContactStore } from "@/stores/contacts";
import { Contact } from "@/types/contact";
import { ColumnTable, KebabMenuItem } from "@/types/table";
import { maskDateISO } from "@/utils/functions";
import { Eye, Plus, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function Contacts() {
  const { setSelectedContact } = useMyContactStore((state) => ({
    setSelectedContact: state.setSelectedContact,
  }));

  const [openModalNotes, setOpenModalNotes] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalDetails, setOpenModalDetails] = useState(false);
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [editContact, setEditContact] = useState<ContactDetailResponse | null>(
    null
  );

  const handleOpenModalNotes = () => {
    setOpenModalNotes(!openModalNotes);
  };

  const handleOpenModalDelete = (contact: Contact) => {
    setSelectedContact(contact);
    setOpenModalDelete(!openModalDelete);
  };

  const handleOpenModalDetails = (contact: Contact) => {
    setSelectedContact(contact);
    setOpenModalDetails(!openModalDetails);
  };

  const handleEdit = (contact: ContactDetailResponse) => {
    setEditContact(contact);
    setOpenModalCreate(!openModalCreate);
  };

  const handleOpenModalCreate = () => {
    setEditContact(null);
    setOpenModalCreate(!openModalCreate);
  };

  const [filter, setFilter] = useState("");
  const [page, setPage] = useState<number>(1);

  const {
    data: contactsResponse,
    isLoading,
    isError,
  } = useGetContacts(page, filter);

  const handleSearch = (input: string) => {
    setFilter(input);
    setPage(1);
  };

  const handlePage = (page: number) => {
    setPage(page);
  };

  useEffect(() => {
    if (isError) {
      showErrorToast("Ocorreu um erro ao buscar os contatos");
    }
  }, [isError]);

  const columns: ColumnTable[] = [
    {
      id: "name",
      label: "Nome",
      width: "w-4/12",
      render: (data: GetContact) => (
        <div className="flex flex-row space-x-2 items-center">
          <img
            src={data.photo || ProfileImg}
            className="w-8 h-8 rounded-full bg-primary-dark"
          />
          <div className="flex flex-col">
            <div className="text-sm text-primary-dark font-bold">{`${data.name}`}</div>
          </div>
        </div>
      ),
    },
    {
      id: "email",
      label: "Email",
      render: (data: GetContact) => data.email,
    },
    {
      id: "data",
      label: "Criado em",
      render: (data: GetContact) => maskDateISO(data.createdAt),
    },
    {
      id: "status",
      label: "Status",
      render: (data: GetContact) => {
        const isActive = data.status === true;
        const statusClass = isActive
          ? "bg-green-500/20 rounded-full"
          : "bg-red-700/20";
        const statusText = isActive ? "Ativo" : "Inativo";

        return (
          <span className={`px-3 py-2 rounded-full ${statusClass}`}>
            {statusText}
          </span>
        );
      },
    },
  ];

  const KebabMenuItems: KebabMenuItem[] = [
    {
      id: "details",
      label: "Detalhes",
      onClick: (data: Contact) => handleOpenModalDetails(data),
      icon: <Eye />,
    },
    {
      id: "delete",
      label: "Deletar",
      onClick: handleOpenModalDelete,
      icon: <Trash2 />,
    },
  ];

  return (
    <React.Fragment>
      <div className="flex flex-col space-y-3">
        <Table
          columns={columns}
          data={contactsResponse?.contacts || []}
          kebabMenu={KebabMenuItems}
          searchComponent={
            <div className="flex items-center space-x-6">
              {/* <Filter itens={columns} /> */}
              <Button
                onClick={handleOpenModalCreate}
                className="!bg-primary-dark !text-white hover:!text-primary pr-5 pl-5 font-medium flex h-[50px] flex-row items-center space-x-2"
              >
                <div className="flex items-center">
                  <span>Novo cliente</span>
                  <Plus className="w-5 h-5 ml-2" />
                </div>
              </Button>
            </div>
          }
          totalPages={
            contactsResponse
              ? Math.ceil(contactsResponse.total / contactsResponse.per_page)
              : 0
          }
          filter={filter}
          currentPage={page}
          isLoading={isLoading}
          onSearch={handleSearch}
          handlePage={handlePage}
        />
      </div>
      {openModalDetails && (
        <ModalDetails
          isOpen={openModalDetails}
          handleEdit={handleEdit}
          onClose={() => setOpenModalDetails(!openModalDetails)}
        />
      )}
      {openModalCreate && (
        <ModalCreateContact
          isOpen={openModalCreate}
          editContact={editContact}
          onClose={handleOpenModalCreate}
        />
      )}
      {openModalNotes && (
        <ModalNote isOpen={openModalNotes} onClose={handleOpenModalNotes} />
      )}
      {openModalDelete && (
        <ModalDelete
          isOpen={openModalDelete}
          onClose={() => setOpenModalDelete(!openModalDelete)}
        />
      )}
    </React.Fragment>
  );
}
