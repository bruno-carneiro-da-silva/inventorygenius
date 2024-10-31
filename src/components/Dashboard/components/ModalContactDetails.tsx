import Button from "@/components/Button";
import TextInput from "@/components/Input";
import Modal from "@/components/Modal";
import ModalHeader from "@/components/ModalHeader";
import { showErrorToast, showSuccessToast } from "@/components/Toast";
import { LoadingIcon } from "@/icons";
import LoadingPlaceholder from "@/pages/Clients/Contacts/components/LoadingPlaceholder";
import MaskedTextInput from "@/pages/Register/components/PhoneInput";
import { LoginResponse } from "@/queries/account/types";
import { useUpdateCompany } from "@/queries/company";
import { Company, UpdateCompany } from "@/queries/company/types";
import { fileToBase64, maskPhone } from "@/utils/functions";
import { yupResolver } from "@hookform/resolvers/yup";
import { Autocomplete } from "@react-google-maps/api";
import { AxiosError } from "axios";
import { Mail, MapPinned, PencilIcon, Phone } from "lucide-react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import ModalCropImage from "./ModalCropImage";

type FormValues = {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  photo?: string | null;
};

const schema: yup.ObjectSchema<FormValues> = yup.object({
  name: yup.string().required("Nome é obrigatório"),
  email: yup.string().email().required("Email é obrigatório"),
  phoneNumber: yup.string().required("Telefone é obrigatório"),
  address: yup.string().required("Endereço é obrigatório"),
  photo: yup.string().nullable(),
});

type ModalContactDetailsProps = {
  isOpen: boolean;
  onClose: () => void;
  company?: Company | null;
  login?: LoginResponse | null;
  isLoading: boolean;
};

const ModalContactDetails = ({
  isOpen,
  onClose,
  company,
  login,
  isLoading,
}: ModalContactDetailsProps) => {
  const [isCompanyLoading, setIsCompanyLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const methods = useForm({
    defaultValues: {
      name: company?.nameCompany || "",
      email: company?.emailCompany || "",
      phoneNumber: company?.phoneNumberCompany
        ? maskPhone(company.phoneNumberCompany)
        : "",
      address: company?.addressCompany || "",
      photo: company?.photo_base64 || null,
    },
    resolver: yupResolver(schema),
  });

  const updateFile = (file: File) => {
    setFile(file);
  };

  const updateCompany = useUpdateCompany();

  const updateCompanySubmit = (companyPayload: UpdateCompany) => {
    if (!company) return;
    updateCompany
      .mutateAsync(companyPayload)
      .then(() => {
        showSuccessToast("Company updated successfully");
        onClose();
      })
      .catch((err: AxiosError<any>) => {
        if (err?.status === 413) {
          showErrorToast("Imagem muito pesada!");
          return;
        }
        const errors = err?.response?.data?.errors;
        if (errors && Array.isArray(errors)) {
          errors.forEach((error) => {
            showErrorToast(error.message || "An unexpected error occurred.");
          });
        } else {
          showErrorToast("An unexpected error occurred.");
        }
      })
      .finally(() => {
        setIsCompanyLoading(false);
      });
  };

  const onSubmit = async (data: FormValues) => {
    setIsCompanyLoading(true);

    const photoBase64 = file
      ? await fileToBase64(file)
      : data.photo || undefined;

    if (!company) return;
    const companyPayload: UpdateCompany = {
      id: login?.user?.id,
      photo: photoBase64,
      name: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber,
      address: data.address,
    };

    updateCompanySubmit(companyPayload);
  };

  const handleClose = () => {
    setShowAlert(true);
  };

  const handleConfirmClose = () => {
    setShowAlert(false);
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose} className="!w-8/12">
        <ModalHeader
          title="Detalhes da empresa"
          subtitle="Ver em detalhes"
          onClose={handleClose}
        />
        {isLoading ? (
          <LoadingPlaceholder />
        ) : (
          <FormProvider {...methods}>
            <form
              className="overflow-auto"
              onSubmit={methods.handleSubmit(onSubmit)}
            >
              <div className="bg-white grid grid-cols-12 p-4 rounded-sm space-y-1 space-x-2">
                <div className="flex flex-col col-span-12 space-y-5 overflow-auto">
                  <ModalCropImage
                    updateFile={updateFile}
                    photo={company?.photo_base64}
                  />
                  <div className="text-sm font-light flex flex-row space-x-2 w-full text-gray-500">
                    <TextInput
                      name="name"
                      icon={<PencilIcon className="h-5 w-5" />}
                      label="Nome"
                      className="font-light text-gray-500 text-base"
                    />
                  </div>
                  <div className="text-sm font-light flex flex-row space-x-2 w-full text-gray-500">
                    <TextInput
                      name="email"
                      label="Email"
                      icon={<Mail className="w-5 h-5" />}
                      type="email"
                      className="font-light text-base"
                    />
                  </div>
                  <div className="text-sm font-light flex flex-row space-x-2 w-full text-gray-500">
                    <MaskedTextInput
                      name="phoneNumber"
                      label="Telefone"
                      icon={<Phone className="w-5 h-5" />}
                      className="font-light text-base"
                    />
                  </div>
                  <div className="text-sm font-light flex flex-row w-full space-x-2 text-gray-500">
                    <Autocomplete className="w-full">
                      <TextInput
                        name="address"
                        label="Endereço"
                        icon={<MapPinned className="w-5 h-5" />}
                        className="font-light w-full text-base"
                      />
                    </Autocomplete>
                  </div>
                  <div className="col-span-3 text-right">
                    <Button type="submit" className="font-medium text-xs w-36">
                      {isCompanyLoading ? <LoadingIcon /> : "Salvar"}
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </FormProvider>
        )}
      </Modal>
      {showAlert && (
        <Modal isOpen={showAlert} onClose={() => setShowAlert(false)}>
          <div className="flex flex-col space-y-4 p-4">
            <h2 className="text-lg font-semibold">Alterações sem salvar</h2>
            <p>
              Você não salvou as alterações. Se você fechar esse modal, suas
              alterações vão ser perdidas. Tem certeza que deseja continuar?
            </p>
            <div className="flex flex-row  items-center justify-center space-x-4">
              <Button
                onClick={handleConfirmClose}
                className="!bg-primary-dark !text-white"
              >
                Sim, fechar
              </Button>
              <Button
                onClick={() => setShowAlert(false)}
                className="!bg-white !text-primary-dark"
              >
                Cancelar
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ModalContactDetails;
