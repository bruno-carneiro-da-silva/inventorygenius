import { showErrorToast, showSuccessToast } from "@/components/Toast";
import { useCreateEmployee } from "@/queries/employee";
import { Employee } from "@/queries/employee/types";
import { useUserStore } from "@/stores/user";
import { getValueByKey } from "@/utils/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRef, useState } from "react";
import { FieldError, useForm } from "react-hook-form";
import * as yup from "yup";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  address: string;
  roleId?: string;
  userName: string;
  password: string;
};

const schema: yup.ObjectSchema<FormValues> = yup.object({
  name: yup.string().required("Nome é obrigatório"),
  email: yup.string().email().required("Email é obrigatório"),
  phone: yup.string().required("Telefone é obrigatório"),
  address: yup.string().required("Endereço é obrigatório"),
  roleId: yup.string().optional(),
  userName: yup.string().required("Nome de usuário é obrigatório"),
  password: yup.string().required("Senha é obrigatória"),
});

type UseCreateEmployeeProps = {
  onClose: () => void;
  onSave?: (employee: Employee) => void;
};

export default function useCreateEmployees({
  onClose,
}: UseCreateEmployeeProps) {
  const [isLoading, setIsLoading] = useState(false);
  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
  });
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const roleId = useUserStore((state) => state.login?.user?.role?.uId);

  const [addEmployeeModalOpen, setAddEmployeeModalOpen] = useState(false);

  const [visible, setVisible] = useState(false);

  const {
    formState: { errors },
  } = methods;
  const fieldError = getValueByKey(errors, "password") as
    | FieldError
    | undefined;
  const isFieldError = fieldError && fieldError.message;

  const handleShowPassword = () => {
    setVisible(!visible);
  };

  const handlePage = (page: number) => {
    setPage(page);
  };

  const handleSearch = (input: string) => {
    setFilter(input);
    setPage(1);
  };

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

  const createEmployee = useCreateEmployee();

  const onSubmit = (employee: FormValues) => {
    const finalEmployee = {
      ...employee,
      roleId: roleId || "",
    };
    setIsLoading(true);
    createEmployee
      .mutateAsync(finalEmployee)
      .then(() => {
        showSuccessToast("Funcionário criado com sucesso");
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
    handlePage,
    handleSearch,
    setAddEmployeeModalOpen,
    addEmployeeModalOpen,
    page,
    filter,
    visible,
    handleShowPassword,
    isFieldError,
    fieldError,
    onLoad,
    onPlaceChanged,
    address,
    location,
  };
}
