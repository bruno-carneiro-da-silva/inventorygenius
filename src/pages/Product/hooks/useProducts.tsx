import { showErrorToast, showSuccessToast } from "@/components/Toast";
import { useListCategories } from "@/queries/category";
import { useCategoryStore } from "@/stores/category";
import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosError } from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useCreateProduct, useUpdateProduct } from "@/queries/product";
import { fileToBase64 } from "@/utils/functions";
import { ProductResponse } from "@/queries/product/types";

type FormValues = {
  name: string;
  description: string;
  price: string;
  qtd: string;
  // size: string;
  minStock: string;
  capacity: string;
  categoryId: string;
};

const schema: yup.ObjectSchema<FormValues> = yup.object({
  id: yup.string().nullable(),
  name: yup.string().required("Nome é obrigatório"),
  description: yup.string().required("Descrição é obrigatória"),
  price: yup.string().required("Preço é obrigatório"),
  qtd: yup.string().required("Estoque é obrigatório"),
  // size: yup.string().required("Tamanho é obrigatório"),
  minStock: yup.string().required("Estoque mínimo é obrigatório"),
  capacity: yup.string().required("Estoque máximo é obrigatório"),
  categoryId: yup.string().required("Categoria é obrigatória"),
});

interface UseProductsProps {
  editProduct?: ProductResponse;
  onClose: () => void;
}

export function useProducts({ editProduct, onClose }: UseProductsProps) {
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const { data: categories } = useListCategories();
  const { setCategories, selectCategory } = useCategoryStore();
  const { mutateAsync: createProduct } = useCreateProduct();
  const { mutateAsync: updateProduct } = useUpdateProduct();

  const [isLoading, setIsLoading] = React.useState(false);
  const [file, setFile] = React.useState<File | null>(null);

  const onSubmit = async (formData: FormValues) => {
    if (!file && !editProduct) return showErrorToast("Foto obrigatória!");
    setIsLoading(true);

    const photoBase64 = file
      ? await fileToBase64(file)
      : editProduct?.photos?.[0]?.base64!;

    const finalPayload = {
      name: formData.name,
      capacity: Number(formData.capacity),
      categoryId: formData.categoryId,
      description: formData.description,
      minStock: Number(formData.minStock),
      price: Number(formData.price),
      qtd: Number(formData.qtd),
      // size: formData.size,
      photos: [photoBase64],
    };

    try {
      if (editProduct) {
        await updateProduct({ id: editProduct.id, ...finalPayload });
        showSuccessToast("Produto atualizado com sucesso");
      } else {
        await createProduct(finalPayload);
        showSuccessToast("Produto criado com sucesso");
      }
      onClose();
      // if (onSaved && data) {
      //   onSaved(data.data);
      // }
    } catch (errors) {
      const errorMessage =
        (errors as AxiosError<{ error: string }>)?.response?.data?.error ||
        "Ocorreu um erro interno";
      showErrorToast(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (categories) {
      setCategories(categories);
    }
  }, [categories, setCategories]);

  const categoryOptions =
    categories?.map((category) => ({
      value: category.id,
      label: category.name,
    })) || [];

  const [isCategoryModalOpen, setIsCategoryModalOpen] = React.useState(false);

  const handleCreateCategory = () => {
    setIsCategoryModalOpen(!isCategoryModalOpen);
  };

  const handleCategoryChange = (value: string) => {
    selectCategory(value);
    methods.setValue("categoryId", value);
  };

  const updateFile = (file: File) => {
    setFile(file);
  };

  React.useEffect(() => {
    if (editProduct) {
      methods.reset({
        categoryId: editProduct.category?.id,
        name: editProduct.name,
        description: editProduct.description,
        price: String(editProduct.price),
        minStock: editProduct.stock?.minStock
          ? String(editProduct.stock.minStock)
          : "",
        capacity: editProduct.stock?.capacity
          ? String(editProduct.stock.capacity)
          : "",
        qtd: editProduct.stock?.qtd ? String(editProduct.stock.qtd) : "",
      });
      handleCategoryChange(editProduct.category?.id);
    }
  }, [editProduct]);

  return {
    methods,
    isLoading,
    onSubmit,
    categoryOptions,
    isCategoryModalOpen,
    handleCreateCategory,
    handleCategoryChange,
    updateFile,
  };
}
