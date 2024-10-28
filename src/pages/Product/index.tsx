import Card from "@/components/Card";
import SubHeader from "@/components/SubHeader";
import Pagination from "@/components/Table/Pagination";
import { supplier } from "@/mocks/supplier";
import { KebabMenuItem } from "@/types/table";
import { Eye, Mail, Phone, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ModalDeleteProduct from "./Modals/DeleteProduct";
import { useProductStore } from "@/stores/product";
import { ProductResponse } from "@/queries/product/types";
import { useGetProducts } from "@/queries/product";
import { showErrorToast } from "@/components/Toast";

export default function Product() {
  const methods = useForm();
  const navigate = useNavigate();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const { selectedProduct } = useProductStore();

  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState("");

  const handlePage = (page: number) => {
    setPage(page);
  };

  const handleSearch = (input: string) => {
    setFilter(input);
    setPage(1);
  };

  const { data } = useGetProducts(page, filter);

  useEffect(() => {
    if (!data) {
      showErrorToast("Erro ao buscar produtos");
    }
  }, []);

  const handleOpenProductDetails = (product: ProductResponse) => {
    selectedProduct(product);
    navigate(`/produto/detalhes/${product.id}`);
  };

  const handleCreateProduct = () => {
    navigate("/produtos/criar");
  };

  const handleOpenModalDelete = () => {
    setOpenDeleteModal(!openDeleteModal);
  };

  const KebabMenuItems: KebabMenuItem[] = [
    {
      id: "details",
      label: "Ver detalhes",
      onClick: (data) => handleOpenProductDetails(data),
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
          placeholder="Procurar produto"
          text="Produto"
          options={[
            { label: "Todos", value: "all" },
            { label: "Ativos", value: "active" },
            { label: "Inativos", value: "inactive" },
          ]}
          onChange={handleSearch}
          onClick={handleCreateProduct}
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
            currentPage={page}
            totalPages={3}
            onPageChange={handlePage}
          />
        </div>
      </FormProvider>
      {openDeleteModal && (
        <ModalDeleteProduct
          isOpen={openDeleteModal}
          onClose={handleOpenModalDelete}
        />
      )}
    </div>
  );
}
