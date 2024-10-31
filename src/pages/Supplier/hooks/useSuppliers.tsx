import { showErrorToast, showSuccessToast } from "@/components/Toast";
import { useCreateSupplier } from "@/queries/supplier";
import { Supplier, SupplierResponse } from "@/queries/supplier/types";
import { useUserStore } from "@/stores/user";
import { fileToBase64 } from "@/utils/functions";
import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosError } from "axios";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

type useSuppliersProps = {
    onClose: () => void;
    onSaved?: (customer: SupplierResponse) => void;
};

type SupplierForm = Omit<Supplier, 'photo'>

const schema: yup.ObjectSchema<SupplierForm> = yup.object({
    name: yup.string().required("Nome é obrigatório"),
    lastName: yup.string().required("Sobrenome é obrigatório"),
    phone: yup.string().required("Telefone é obrigatório"),
    email: yup.string().email().required("Email é obrigatório"),
    address: yup.string().required("Endereço é obrigatório"),
    dateOfBirth: yup.string().required("Data de nascimento é obrigatório"),
    document: yup.string().required("CNPJ é obrigatório"),
    nationality: yup.string().required("Nacionalidade é obrigatório"),
    niche: yup.string().required("Nincho é obrigatório"),
    contract_start: yup.string().required("Começo do contrato é obrigatório"),
    contract_end: yup.string().required("Fim do contrato é obrigatório"),
    city: yup.string().required("Cidade é obrigatório"),
});

export default function useCreateSuppliers({
    onClose,
    onSaved,
}: useSuppliersProps) {
    const methods = useForm<SupplierForm>({
        resolver: yupResolver(schema),
    });

    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [address, setAddress] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [location, setLocation] = useState({ lat: 0, lng: 0 });
    const createSupplier = useCreateSupplier();
    const companyID = useUserStore((state) => state.login?.user?.id)

    const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
        autocompleteRef.current = autocomplete;
    };

    const onPlaceChanged = () => {
        if (autocompleteRef.current) {
            const place = autocompleteRef.current.getPlace();
            if (place.geometry?.location) {
                const address = place.formatted_address || "";
                const lat = place.geometry.location.lat();
                const lng = place.geometry.location.lng();
                setAddress(address);
                setLocation({ lat, lng });
            } else {
                showErrorToast("No geometry found for this place.");
            }
        }
    };

    const onSubmit = async (payload: SupplierForm) => {
        if (!file) return showErrorToast('Foto obrigatória!')
        setIsLoading(true);

        const photoBase64 = await fileToBase64(file)

        const finalPayload = {
            ...payload,
            companyUid: companyID,
            address: address,
            latitude: location.lat,
            longitude: location.lng,
            photo: photoBase64,
        };

        try {
            const data = await createSupplier.mutateAsync(finalPayload)
            showSuccessToast("Supplier created successfully");
            onClose();
            if (onSaved && data) {
                onSaved(data.data);
            }
        } catch (errors) {
            const errorMessage =
                (errors as AxiosError<{ error: string }>)?.response?.data?.error || "An error occurred";
            showErrorToast(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const updateFile = (file: File) => {
        setFile(file);
    };

    return {
        methods,
        isLoading,
        onSubmit,
        address,
        onLoad,
        onPlaceChanged,
        updateFile,
    };
}
