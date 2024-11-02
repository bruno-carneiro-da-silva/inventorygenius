import Card from "@/components/Card";
import NotFound from "@/components/NotFound/NotFound";
import SubHeader from "@/components/SubHeader";
import Pagination from "@/components/Table/Pagination";
import { useGetSuppliers } from "@/queries/supplier";
import { SupplierResponse } from "@/queries/supplier/types";
import { useSupplierStore } from "@/stores/supplier";
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

  const [filter, setFilter] = useState('')
  const [page, setPage] = useState(1)
  
  const { data: suppliersResponse, isLoading } = useGetSuppliers(page, filter || '')

  const handleOpenSupplierDetails = (supplier: SupplierResponse) => {
    setSelectedSupplier(supplier);
    navigate(`/fornecedores/detalhes/${supplier.id}`);
  };

  const handleCreateSupplier = () => {
    setSelectedSupplier(null)
    navigate("/fornecedores/criar");
  };

  const handleOpenModalDelete = (supplier: SupplierResponse) => {
    setSelectedSupplier(supplier)
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
      onClick: (data) => handleOpenModalDelete(data),
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
          onChange={() => {}}
          onSearch={(input) => {
            setFilter(input)
          }}
          onClick={handleCreateSupplier}
        />
        {isLoading ? (
          <div className="flex flex-row space-x-3 bg-white p-4 rounded-md text-gray-500 hover:bg-gray-100 mt-4">
            <div className="animate-pulse bg-gray-200 h-80 w-full rounded-md"></div>
            <div className="animate-pulse bg-gray-200 h-80 w-full rounded-md"></div>
            <div className="animate-pulse bg-gray-200 h-80 w-full rounded-md"></div>
            <div className="animate-pulse bg-gray-200 h-80 w-full rounded-md"></div>
          </div>
        ) : (
          <div className="flex flex-row flex-wrap gap-2">
            {suppliersResponse?.suppliers?.map((supplier) => (
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
            {suppliersResponse?.suppliers?.length === 0 && (
              <div className="w-full flex items-center justify-center">
                <NotFound no_create_text={!!filter} />
              </div>
            )}
          </div>
        )}

        <div className="mt-16 flex flex-row items-center justify-center">
          {suppliersResponse && suppliersResponse.total > 0 && <Pagination
            currentPage={page}
            totalPages={suppliersResponse ? Math.ceil(suppliersResponse.total / suppliersResponse.per_page) : 0}
            onPageChange={(page) => setPage(page)}
          />}
        </div>
      </FormProvider>
      {openDeleteModal && (
        <ModalDeleteSupplier
          isOpen={openDeleteModal}
          onClose={() => setOpenDeleteModal(!openDeleteModal)}
        />
      )}
    </div>
  );
}
