import CardProduct from "@/components/Card/product";
import SubHeader from "@/components/SubHeader";
import Pagination from "@/components/Table/Pagination";
import { useGetProducts } from "@/queries/product";
import { ProductResponse } from "@/queries/product/types";
import { useProductStore } from "@/stores/product";
import { KebabMenuItem } from "@/types/table";
import { Eye, Mail, Phone, Trash2 } from "lucide-react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ModalDeleteProduct from "./Modals/DeleteProduct";
import NotFound from "@/components/NotFound/NotFound";

export default function Product() {
  const methods = useForm();
  const navigate = useNavigate();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const { selectedProduct } = useProductStore();

  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState("");

  const { data: productsResponse } = useGetProducts(page, filter);

  const handleOpenProductDetails = (product: ProductResponse) => {
    selectedProduct(product);
    navigate(`/produtos/detalhes/${product.id}`);
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
          onChange={() => { }}
          onSearch={(input) => {
            setFilter(input)
          }}
          onClick={handleCreateProduct}
        />
        <div className="flex flex-row flex-wrap gap-2">
          {productsResponse?.products?.map((product) => (
            <div className="m-2" key={product.id}>
              <CardProduct
                key={product.id}
                item={product}
                icon={<Mail />}
                secondIcon={<Phone />}
                kebabMenuItems={KebabMenuItems}
              />
            </div>
          ))}
          {productsResponse?.products?.length === 0 && (
            <div className="w-full flex items-center justify-center">
              <NotFound no_create_text={!!filter} />
            </div>
          )}
        </div>

        <div className="mt-16 flex flex-row items-center justify-center">
          {productsResponse && productsResponse.total > 0 && <Pagination
            currentPage={page}
            totalPages={productsResponse ? Math.ceil(productsResponse.total / productsResponse.per_page) : 0}
            onPageChange={(page) => setPage(page)}
          />}
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
