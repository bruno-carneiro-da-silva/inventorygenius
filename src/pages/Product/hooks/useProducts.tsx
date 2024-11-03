import { showErrorToast, showSuccessToast } from "@/components/Toast";
import { useListCategories } from "@/queries/category";
import { useCategoryStore } from "@/stores/category";
import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosError } from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from 'yup'
import { useCreateProduct, useUpdateProduct } from '@/queries/product'
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
    editProduct?: ProductResponse
    onClose: () => void
}

export function useProducts({ editProduct, onClose }: UseProductsProps) {
    const methods = useForm({
        resolver: yupResolver(schema),
    });

    const { data: categories } = useListCategories();
    const { setCategories, selectCategory } = useCategoryStore();
    const { mutateAsync: createProduct } = useCreateProduct()
    const { mutateAsync: updateProduct } = useUpdateProduct()

    const [isLoading, setIsLoading] = React.useState(false)
    const [file, setFile] = React.useState<File | null>(null);

    const onSubmit = async (formData: FormValues) => {
        if (!file) return showErrorToast('Foto obrigatória!')
        setIsLoading(true);

        const photoBase64 = await fileToBase64(file)

        const finalPayload = {
            name: formData.name,
            capacity: Number(formData.capacity),
            categoryId: formData.categoryId,
            description: formData.description,
            minStock: Number(formData.minStock),
            price: Number(formData.price),
            qtd: Number(formData.qtd),
            // size: formData.size,
            photos: [photoBase64]
        }

        try {
            let data
            if (editProduct) {
                data = await updateProduct({ id: editProduct.id, ...finalPayload })
                showSuccessToast("Product updated successfully");
            } else {
                data = await createProduct(finalPayload)
                showSuccessToast("Product created successfully");
            }
            onClose();
            // if (onSaved && data) {
            //   onSaved(data.data);
            // }
        } catch (errors) {
            const errorMessage =
                (errors as AxiosError<{ error: string }>)?.response?.data?.error || "An error occurred";
            showErrorToast(errorMessage);
        } finally {
            setIsLoading(false)
        }
    }

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
        methods.setValue('categoryId', value)
    };

    const updateFile = (file: File) => {
        setFile(file);
    };

    return {
        methods,
        isLoading,
        onSubmit,
        categoryOptions,
        isCategoryModalOpen,
        handleCreateCategory,
        handleCategoryChange,
        updateFile,
    }
}