import { showErrorToast, showSuccessToast } from "@/components/Toast";
import { useGetEmployees } from "@/queries/employee";
import { useGetProducts } from "@/queries/product";
import { ProductResponse } from "@/queries/product/types";
import { useCreateSell } from "@/queries/sales";
import { useCompanyStore } from "@/stores/company";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

type FormValues = {
  employeeId: string;
  companyId: string;
  totalPrice: string;
  discount?: number | null;
  soldItems: Array<{
    productId: string;
    qtd: number;
    price: number;
  }>;
};

type UseCreateSalesProps = {
  onClose: () => void;
  onSave?: (sell: any) => void;
  editSell?: () => void;
};

const schema: yup.ObjectSchema<FormValues> = yup.object({
  employeeId: yup.string().required("ID do funcionário é obrigatório"),
  companyId: yup.string().required("ID da empresa é obrigatório"),
  totalPrice: yup.string().required("Preço total é obrigatório"),
  discount: yup.number().nullable(),
  soldItems: yup.array().required("Itens vendidos são obrigatórios"),
});

export default function useCreateSales({ onClose }: UseCreateSalesProps) {
  const [isLoading, setIsLoading] = useState(false);
  const companyUid = useCompanyStore((state) => state.company?.id || "");
  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      companyId: companyUid,
      soldItems: [],
      totalPrice: "",
    },
  });
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState("");
  const [addEmployeeModalOpen, setAddEmployeeModalOpen] = useState(false);
  const [discount, setDiscount] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<ProductResponse | null>(null);
  const [quantity, setQuantity] = useState<number>(0);
  const [selectedProducts, setSelectedProducts] = useState<
    { product: ProductResponse; quantity: number }[]
  >([]);
  const { data: productsResponse } = useGetProducts(page, filter);
  const { data: employees } = useGetEmployees(page, filter);
  const createSell = useCreateSell();

  const handlePage = (page: number) => {
    setPage(page);
  };

  const handleSearch = (input: string) => {
    setFilter(input);
    setPage(1);
  };

  const handleSelectProduct = (value: string) => {
    const product = productsResponse?.products.find(
      (item) => item.id === value
    );
    if (product) {
      setSelectedProduct(product as ProductResponse);
    }
  };

  const handleAddProduct = () => {
    if (selectedProduct && quantity > 0) {
      const currentProducts = methods.getValues("soldItems") || [];
      methods.setValue("soldItems", [
        ...currentProducts,
        {
          productId: selectedProduct.id,
          qtd: quantity,
          price: selectedProduct.price,
        },
      ] as never);

      setSelectedProducts([
        ...selectedProducts,
        { product: selectedProduct, quantity },
      ]);

      setSelectedProduct(null);
      setQuantity(0);
    }
  };

  const removeProduct = (index: number) => {
    const currentProducts = methods.getValues("soldItems") || [];
    const newProducts = currentProducts.filter((_, i) => i !== index);
    methods.setValue("soldItems", newProducts);
  };

  const onSubmit = (payload: FormValues) => {
    setIsLoading(true);
    const finalPayload = {
      ...payload,
      companyId: companyUid,
    };
    createSell
      .mutateAsync(finalPayload)
      .then(() => {
        showSuccessToast("Venda criada com sucesso");
        onClose();
      })
      .catch((err) => {
        const errorMessage = err?.response?.data?.error || "Ocorreu um erro";
        showErrorToast(errorMessage);
        setIsLoading(false);
      });
  };

  return {
    isLoading,
    methods,
    onSubmit,
    productsResponse,
    handlePage,
    handleSearch,
    setAddEmployeeModalOpen,
    addEmployeeModalOpen,
    employees,
    handleSelectProduct,
    handleAddProduct,
    removeProduct,
    discount,
    setDiscount,
    selectedProduct,
    selectedProducts,
    setQuantity,
  };
}
