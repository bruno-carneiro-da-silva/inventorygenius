import { CategoryDetails } from "@/queries/category/types";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useCreateCategory } from "@/queries/category";
import { showErrorToast, showSuccessToast } from "@/components/Toast";
import { useCategoryStore } from "@/stores/category";

type useCategoryProps = {
  onClose: () => void;
  onSaved?: (category: CategoryDetails) => void;
};

type FormValues = {
  name: string;
};

const schema: yup.ObjectSchema<FormValues> = yup.object({
  name: yup.string().required("O nome da categoria é obrigatório"),
});
export default function useCreateCategories({
  onClose,
  onSaved,
}: useCategoryProps) {
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const categoryForm = useCreateCategory();

  const onSubmit = (payload: FormValues) => {
    setIsLoading(true);

    categoryForm
      .mutateAsync(payload)
      .then((data) => {
        showSuccessToast("Categoria criada com successo");
        onClose();
        if (onSaved) {
          onSaved(data);
        }
      })
      .catch((errors) => {
        console.log(errors);
        const errorMessage =
          errors?.response?.data.error || "Aconteceu um erro interno";
        showErrorToast(errorMessage);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return {
    onSubmit,
    methods,
    isLoading,
  };
}
