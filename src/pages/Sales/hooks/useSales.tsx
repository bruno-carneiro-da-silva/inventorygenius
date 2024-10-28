import { showErrorToast, showSuccessToast } from "@/components/Toast";
import { useGetEmployees } from "@/queries/employee";
import { useGetProducts } from "@/queries/product";
import { useCreateSell } from "@/queries/sales";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

type FormValues = {
  employeeId: string;
  companyId: string;
  totalPrice: number;
  discount: number;
  soldItems: {
    productId: string;
    qtd: number;
    price: number;
  }[];
};

const schema: yup.ObjectSchema<FormValues> = yup.object({
  employeeId: yup.string().required("Name is required"),
  companyId: yup.string().required("Last name is required"),
  totalPrice: yup.number().required("E-mail is required"),
  discount: yup.number().required("Please write a valid phone number"),
  soldItems: yup
    .array()
    .of(
      yup.object({
        productId: yup.string().required("Product ID is required"),
        qtd: yup.number().required("Quantity is required"),
        price: yup.number().required("Price is required"),
      })
    )
    .required("Sold items are required"),
});

type UseCreateSalesProps = {
  onClose: () => void;
  onSave?: (sell: any) => void;
  editSell?: () => void;
};

export default function useCreateSales({ onClose }: UseCreateSalesProps) {
  const [isLoading, setIsLoading] = useState(false);
  const methods = useForm({
    resolver: yupResolver(schema),
  });
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState("");
  const [addEmployeeModalOpen, setAddEmployeeModalOpen] = useState(false);

  const handlePage = (page: number) => {
    setPage(page);
  };

  const handleSearch = (input: string) => {
    setFilter(input);
    setPage(1);
  };

  const { data: products } = useGetProducts(page, filter);
  const { data: employees } = useGetEmployees(page, filter);

  const createSell = useCreateSell();

  const onSubmit = (sell: FormValues) => {
    setIsLoading(true);
    createSell
      .mutateAsync(sell)
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
    products,
    handlePage,
    handleSearch,
    setAddEmployeeModalOpen,
    addEmployeeModalOpen,
    employees,
  };
}
