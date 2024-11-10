import { showErrorToast, showSuccessToast } from "@/components/Toast";
import { useGetEmployees } from "@/queries/employee";
import { useGetProducts } from "@/queries/product";
import { ProductResponse } from "@/queries/product/types";
import { useCreateSell, useUpdateSell } from "@/queries/sales";
import { GetSales } from "@/queries/sales/types";
import { useCompanyStore } from "@/stores/company";
import { PaymentStatus } from "@/utils/enum";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

type FormValues = {
  employeeId: string;
  companyId: string;
  totalPrice: string;
  paymentStatus: "PENDING" | "PAID" | "CANCELED" | "REFUSED";
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
  editSell?: GetSales | null;
};

const schema: yup.ObjectSchema<FormValues> = yup.object({
  employeeId: yup.string().required("ID do funcionário é obrigatório"),
  companyId: yup.string().required("ID da empresa é obrigatório"),
  totalPrice: yup.string().required("Preço total é obrigatório"),
  paymentStatus: yup
    .mixed<"PENDING" | "PAID" | "CANCELED" | "REFUSED">()
    .oneOf(["PENDING", "PAID", "CANCELED", "REFUSED"])
    .required("Status de pagamento é obrigatório"),
  discount: yup.number().nullable(),
  soldItems: yup.array().required("Itens vendidos são obrigatórios"),
});

export default function useCreateSales({
  onClose,
  editSell,
}: UseCreateSalesProps) {
  const [isLoading, setIsLoading] = useState(false);
  const companyUid = useCompanyStore((state) => state.company?.id || "");
  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      companyId: companyUid,
      soldItems: [],
      totalPrice: "",
      paymentStatus: "PENDING",
    },
  });
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState("");
  const [addEmployeeModalOpen, setAddEmployeeModalOpen] = useState(false);
  const [discount, setDiscount] = useState<number | null>(null);

  const [selectedProduct, setSelectedProduct] =
    useState<ProductResponse | null>(null);
  const [quantity, setQuantity] = useState<number>(0);
  const [selectedProducts, setSelectedProducts] = useState<
    { product: ProductResponse; quantity: number }[]
  >([]);
  const { data: productsResponse } = useGetProducts(page, filter);
  const { data: employees } = useGetEmployees(page, filter);
  const { mutateAsync: createSell } = useCreateSell();
  const { mutateAsync: updateSell } = useUpdateSell();

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

    const newSelectedProducts = selectedProducts.filter((_, i) => i !== index);
    setSelectedProducts(newSelectedProducts);
  };

  useEffect(() => {
    const total = selectedProducts.reduce((acc, product) => {
      return acc + product.product.price * product.quantity;
    }, 0);
    const finalTotal = discount
      ? total - (total * Number(discount)) / 100
      : total;
    methods.setValue("totalPrice", finalTotal.toFixed(2));
  }, [selectedProducts, discount, methods]);

  useEffect(() => {
    if (editSell) {
      methods.reset({
        employeeId: editSell.employee.id,
        companyId: editSell.companyId,
        totalPrice: String(editSell.totalPrice),
        discount: editSell.discount,
        soldItems: editSell.soldItems.map((item) => ({
          productId: item.productId,
          qtd: item.qtd,
          price: item.price,
        })),
        paymentStatus: editSell.paymentStatus as PaymentStatus,
      });
      setDiscount(editSell.discount);
      setSelectedProducts(
        editSell.soldItems.map((item) => ({
          product: {
            id: item.productId,
            name: item.product.name,
            description: item.product.description,
            photos: item.product.photos.map((photo) => ({
              id: photo.id,
              base64: photo.base64,
              productId: photo.productId,
              createdAt: photo?.createdAt,
              updatedAt: photo.updatedAt,
            })),
            category: item.product.category,
            createdAt: item.product?.createdAt,
            updatedAt: item.product?.updatedAt,
            stock: item.product.stock,
            price: item.price,
            size: item.product.size,
          } as ProductResponse,
          quantity: item.qtd,
        }))
      );
    }
  }, [editSell]);

  const onSubmit = (payload: FormValues) => {
    setIsLoading(true);
    const finalPayload = {
      employeeId: payload.employeeId,
      companyId: companyUid,
      totalPrice: payload.totalPrice,
      paymentStatus: payload.paymentStatus,
      discount: payload.discount ?? 0,
      soldItems: payload.soldItems,
    };

    const action = editSell
      ? updateSell({ id: editSell.id, ...finalPayload })
      : createSell(finalPayload);

    action
      .then(() => {
        showSuccessToast(
          editSell ? "Venda atualizada com sucesso" : "Venda criada com sucesso"
        );
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
