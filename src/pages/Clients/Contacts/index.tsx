import Icon from "@/assets/react.svg";
import Button from "@/components/Button";
// import Filter from "@/components/Filter";
import { DashboardHeaderLayout } from "@/components/Dashboard/DashboardHeaderLayout";
import Filter from "@/components/Filter";
import Table from "@/components/Table";
// import Table from "@/components/Table";
import { showErrorToast } from "@/components/Toast";
import ModalCreateContact from "@/pages/Clients/Contacts/Modals/ModalCreate";
import ModalDelete from "@/pages/Clients/Contacts/Modals/ModalDelete";
import ModalDetails from "@/pages/Clients/Contacts/Modals/ModalDetails";
import ModalNote from "@/pages/Clients/Contacts/Modals/ModalNote";
import { useGetCustomer } from "@/queries/contact";
import { ContactDetails } from "@/queries/contact/types";
import { useCompanyStore } from "@/stores/company";
import { useMyContactStore } from "@/stores/contacts";
import { ColumnTable, KebabMenuItem } from "@/types/table";
// import { ColumnTable, KebabMenuItem } from "@/types/table";
import { maskDateISO, maskPhone } from "@/utils/functions";
import { tableLimit } from "@/utils/utils";
import { Eye, Plus, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";

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

  const handleOpenModalDetails = (contact: ContactDetails) => {
    setSelectedContact(contact);
    setOpenModalDetails(!openModalDetails);
  };

  const handleOpenModalCreate = () => {
    setOpenModalCreate(!openModalCreate);
  };
  const [page, setPage] = useState<number>(1);

  const companyUid = useCompanyStore((state) => state.company?.data?.uId || "");

  const {
    data: contact,
    isLoading,
    isError,
  } = useGetCustomer(companyUid, page, tableLimit);

  const handlePage = (page: number) => {
    setPage(page);
  };

  useEffect(() => {
    if (isError) {
      showErrorToast("An error occurred while fetching the contact");
    }
  }, [isError]);

  const columns: ColumnTable[] = [
    {
      id: "name",
      label: "Name",
      width: "w-4/12",
      render: (data: ContactDetails) => (
        <div className="flex flex-row space-x-2 items-center">
          <img src={data.photoUrl || Icon} className="w-8 h-8 rounded-full" />
          <div className="flex flex-col">
            <div className="text-sm text-gray-500">{`${data.firstName} ${data.lastName}`}</div>
            <div className="text-xs text-gray-300">{data.email}</div>
          </div>
        </div>
      ),
    },
    {
      id: "phone",
      label: "Phone",
      render: (data: ContactDetails) => maskPhone(data.phoneNumber),
    },
    {
      id: "groups",
      label: "Groups",
      render: (data: ContactDetails) =>
        data.groups?.map((group) => group.name).join(", ") || "No group",
    },
    {
      id: "status",
      label: "Status",
      render: (data: ContactDetails) => {
        const isActive = data.groups?.map((group) => group.status);
        const statusClass = isActive
          ? "bg-green-500/20 rounded-full"
          : "bg-pink-500/20";
        const statusText = isActive ? "Activated" : "Inactive";

        return (
          <span className={`px-2 py-1 rounded ${statusClass}`}>
            {statusText}
          </span>
        );
      },
    },
    {
      id: "created",
      label: "Created",
      render: (data: ContactDetails) => (
        <div className="capitalize">{maskDateISO(data.createDate)}</div>
      ),
    },
  ];

  const KebabMenuItems: KebabMenuItem[] = [
    {
      id: "details",
      label: "Details",
      onClick: (data: ContactDetails) => handleOpenModalDetails(data),
      icon: <Eye />,
    },
    {
      id: "delete",
      label: "Delete",
      onClick: handleOpenModalDelete,
      icon: <Trash2 />,
    },
  ];

  return (
    <React.Fragment>
      <div className="flex flex-col space-y-3">
        <DashboardHeaderLayout
          title="Contacts"
          subtitle="Connect, Network, Collaborate"
          overviewItems={[
            { number: contact?.data.totalRecords, text: "New" },
            { number: contact?.data.totalRecords, text: "Working" },
            { number: contact?.data.totalRecords, text: "Contacted" },
            { number: contact?.data.totalRecords, text: "Qualified" },
            { number: contact?.data.totalRecords, text: "Done" },
          ]}
        />

        <Table
          columns={columns}
          data={contact?.data?.items || []}
          kebabMenu={KebabMenuItems}
          searchComponent={
            <div className="flex items-center space-x-3">
              <Filter itens={columns} />
              <Button
                onClick={() => handleOpenModalCreate()}
                className="!bg-transparent !text-gray-500 hover:!text-primary font-medium flex flex-row space-x-2"
              >
                <div>New Contact</div> <Plus className="w-5 h-5 self-center" />
              </Button>
            </div>
          }
          totalPages={contact?.data.totalPages || 0}
          currentPage={contact?.data.currentPage || 0}
          isLoading={isLoading}
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
