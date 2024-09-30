import Card from "@/components/Card";
import SubHeader from "@/components/SubHeader";
import Pagination from "@/components/Table/Pagination";
import { supplier } from "@/mocks/supplier";
import { useSupplierStore } from "@/stores/supplier";
import { CardSupplierProps } from "@/types/Supplier";
import { KebabMenuItem } from "@/types/table";
import { Eye, Mail, Phone, Trash2 } from "lucide-react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ModalDeleteSupplier from "./Modals/DeleteSupplier";

export default function Supplier() {
  const methods = useForm();
  const navigate = useNavigate();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const { setSelectedSupplier } = useSupplierStore();

  const handleOpenSupplierDetails = (supplier: CardSupplierProps) => {
    setSelectedSupplier(supplier);
    navigate(`/fornecedores/detalhes/${supplier.id}`);
  };

  const handleCreateSupplier = () => {
    navigate("/fornecedores/criar");
  };

  const handleOpenModalDelete = () => {
    setOpenDeleteModal(!openDeleteModal);
  };

  const KebabMenuItems: KebabMenuItem[] = [
    {
      id: "details",
      label: "Ver detalhes",
      onClick: (data) => handleOpenSupplierDetails(data),
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
    <div>
      <FormProvider {...methods}>
        <SubHeader
          name="search"
          placeholder="Procurar fornecedor"
          text="Fornecedor"
          options={[
            { label: "Todos", value: "all" },
            { label: "Ativos", value: "active" },
            { label: "Inativos", value: "inactive" },
          ]}
          onChange={(value) => console.log(value)}
          onClick={handleCreateSupplier}
        />
        <div className="flex flex-row flex-wrap gap-2">
          {supplier.map((supplier) => (
            <div className="m-2" key={supplier.id}>
              <Card
                key={supplier.id}
                item={supplier}
                icon={<Mail />}
                secondIcon={<Phone />}
                kebabMenuItems={KebabMenuItems}
              />
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-row items-center justify-center">
          <Pagination
            currentPage={1}
            totalPages={3}
            onPageChange={(page) => console.log(page)}
          />
        </div>
      </FormProvider>
      {openDeleteModal && (
        <ModalDeleteSupplier
          isOpen={openDeleteModal}
          onClose={handleOpenModalDelete}
        />
      )}
    </div>
  );
}
