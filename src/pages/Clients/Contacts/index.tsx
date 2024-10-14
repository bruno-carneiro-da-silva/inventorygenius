import Icon from "@/assets/react.svg";
import Button from "@/components/Button";
// import Filter from "@/components/Filter";
import Filter from "@/components/Filter";
import Table from "@/components/Table";
// import Table from "@/components/Table";
import { contacts } from "@/mocks/contacts.mock";
import ModalCreateContact from "@/pages/Clients/Contacts/Modals/ModalCreate";
import ModalDelete from "@/pages/Clients/Contacts/Modals/ModalDelete";
import ModalDetails from "@/pages/Clients/Contacts/Modals/ModalDetails";
import ModalNote from "@/pages/Clients/Contacts/Modals/ModalNote";
import { ContactDetails } from "@/queries/contact/types";
import { useMyContactStore } from "@/stores/contacts";
import { Contact } from "@/types/contact";
import { ColumnTable, KebabMenuItem } from "@/types/table";
// import { ColumnTable, KebabMenuItem } from "@/types/table";
import { maskDateISO } from "@/utils/functions";
import { Eye, Mail, Phone, Plus, Trash2 } from "lucide-react";
import React, { useState } from "react";
// import { FormProvider } from "react-hook-form";

export default function Contacts() {
  const [openModalNotes, setOpenModalNotes] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalDetails, setOpenModalDetails] = useState(false);
  const [openModalCreate, setOpenModalCreate] = useState(false);

  const handleOpenModalNotes = () => {
    setOpenModalNotes(!openModalNotes);
  };
  const handleOpenModalDelete = () => {
    setOpenModalDelete(!openModalDelete);
  };
  const { setSelectedContact } = useMyContactStore((state) => ({
    setSelectedContact: state.setSelectedContact,
  }));

  const handleOpenModalDetails = (contact: Contact) => {
    setSelectedContact(contact);
    setOpenModalDetails(!openModalDetails);
  };

  const handleOpenModalCreate = () => {
    setOpenModalCreate(!openModalCreate);
  };
  const [_page, setPage] = useState<number>(1);

  // const companyUid = useCompanyStore((state) => state.company?.data?.uId || "");

  // const {
  //   data: contact,
  //   isLoading,
  //   isError,
  // } = useGetCustomer(companyUid, page, tableLimit);

  const handlePage = (page: number) => {
    setPage(page);
  };

  // useEffect(() => {
  //   if (isError) {
  //     showErrorToast("An error occurred while fetching the contact");
  //   }
  // }, [isError]);

  const columns: ColumnTable[] = [
    {
      id: "name",
      label: "Nome",
      width: "w-4/12",
      render: (data: Contact) => (
        <div className="flex flex-row space-x-2 items-center">
          <img src={data.photo || Icon} className="w-8 h-8 rounded-full" />
          <div className="flex flex-col">
            <div className="text-sm text-primary-dark font-bold">{`${data.name} ${data.lastName}`}</div>
          </div>
        </div>
      ),
    },
    {
      id: "uId",
      label: "ID",
      render: (data: Contact) => data.uId,
    },
    {
      id: "data",
      label: "Data",
      render: (data: Contact) => maskDateISO(data.created),
    },
    {
      id: "lastaName",
      label: "Sobrenome",
      render: (data: Contact) => data.lastName,
    },
    {
      id: "city",
      label: "Cidade",
      render: (data: Contact) => data.city,
    },
    {
      id: "contact",
      label: "Contato",
      render: () => (
        <div className="flex space-x-2">
          <button className="flex items-center">
            <Mail className="w-10 h-8 text-primary-dark bg-primary-light border border-primary-dark rounded-full p-1" />
          </button>
          <button className="flex items-center">
            <Phone className="w-10 h-8 text-primary-dark border bg-primary-light border-primary-dark rounded-full p-1" />
          </button>
        </div>
      ),
    },
    {
      id: "status",
      label: "Status",
      render: (data: ContactDetails) => {
        const isActive = data.groups?.map((group) => group.status);
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
          data={contacts || []}
          kebabMenu={KebabMenuItems}
          searchComponent={
            <div className="flex items-center space-x-6">
              <Filter itens={columns} />
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
          totalPages={2}
          currentPage={1}
          isLoading={false}
          handlePage={handlePage}
        />
      </div>
      {openModalDetails && (
        <ModalDetails
          isOpen={openModalDetails}
          onClose={() => setOpenModalDetails(!openModalDetails)}
        />
      )}
      {openModalCreate && (
        <ModalCreateContact
          isOpen={openModalCreate}
          onClose={handleOpenModalCreate}
        />
      )}
      {openModalNotes && (
        <ModalNote isOpen={openModalNotes} onClose={handleOpenModalNotes} />
      )}
      {openModalDelete && (
        <ModalDelete isOpen={openModalDelete} onClose={handleOpenModalDelete} />
      )}
    </React.Fragment>
  );
}
