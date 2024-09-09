import Button from "@/components/Button";
import TextInput from "@/components/Input";
import Modal from "@/components/Modal";
import ModalHeader from "@/components/ModalHeader";
import { showErrorToast, showSuccessToast } from "@/components/Toast";
import { LoadingIcon } from "@/icons";
import LoadingPlaceholder from "@/pages/Clients/Contacts/components/LoadingPlaceholder";
import MaskedTextInput from "@/pages/Register/components/PhoneInput";
import { useUpdateCompany, useUpdateCompanyLogo } from "@/queries/company";
import { Company, UpdateCompany } from "@/queries/company/types";
import { ApiError } from "@/types/ApiError";
import { BlockBlobClient, BlockBlobUploadResponse } from "@azure/storage-blob";
import { yupResolver } from "@hookform/resolvers/yup";
import { Autocomplete } from "@react-google-maps/api";
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
  photoUrl?: string | null;
};

const schema: yup.ObjectSchema<FormValues> = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email().required("Email is required"),
  phoneNumber: yup.string().required("Phone number is required"),
  address: yup.string().required("Address is required"),
  photoUrl: yup.string(),
});

type ModalContactDetailsProps = {
  isOpen: boolean;
  onClose: () => void;
  company?: Company;
  isLoading: boolean;
};

const ModalContactDetails = ({
  isOpen,
  onClose,
  company,
  isLoading,
}: ModalContactDetailsProps) => {
  const [isCompanyLoading, setIsCompanyLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const methods = useForm({
    defaultValues: {
      name: company?.data.name || "",
      email: company?.data.email || "",
      phoneNumber: company?.data.phoneNumber || "",
      address: company?.data.address || "",
      photoUrl: company?.data.photoUrl || null,
    },
    resolver: yupResolver(schema),
  });

  const updateFile = (file: File) => {
    setFile(file);
  };

  const updateCompany = useUpdateCompany();
  const updateCompanyLogo = useUpdateCompanyLogo();

  const uploadFileToBlob = (
    file: File,
    sasUrl: string
  ): Promise<BlockBlobUploadResponse> => {
    const blobClient = new BlockBlobClient(sasUrl);
    return blobClient.upload(file, file.size, {
      blobHTTPHeaders: { blobContentType: file.type },
    });
  };

  const updateCompanySubmit = (companyPayload: UpdateCompany) => {
    if (!company) return;
    updateCompany
      .mutateAsync(companyPayload)
      .then(() => {
        showSuccessToast("Company updated successfully");
        onClose();
      })
      .catch((err: ApiError) => {
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

  // const onSubmit = (data: FormValues) => {
  //   setIsCompanyLoading(true);
  //   if (!company) return;
  //   const companyPayload: UpdateCompany = {
  //     companyUid: company?.data.uId,
  //     photoUrl: data.photoUrl,
  //     name: data.name,
  //     email: data.email,
  //     phoneNumber: data.phoneNumber,
  //     address: data.address,
  //   };

  //   if (file) {
  //     updateCompanyLogo
  //       .mutateAsync({
  //         companyUid: company?.data.uId,
  //       })
  //       .then((res) => {
  //         const photoUrl: string = res.data.photoUrl;

  //         const teste = photoUrl.split("?")[0];
  //         uploadFileToBlob(file, photoUrl)
  //           .then(() => {
  //             companyPayload.photoUrl = teste;
  //             updateCompanySubmit(companyPayload);
  //           })
  //           .catch(() => {
  //             showErrorToast("An error occurred while uploading the image");
  //             setIsCompanyLoading(false);
  //           });
  //       })
  //       .catch((err: ApiError) => {
  //         const errors = err?.response?.data?.errors;
  //         if (errors && Array.isArray(errors)) {
  //           errors.forEach((error) => {
  //             showErrorToast(error.message);
  //           });
  //         } else {
  //           showErrorToast("An unexpected error occurred.");
  //         }
  //         setIsCompanyLoading(false);
  //       });
  //   } else {
  //     updateCompanySubmit(companyPayload);
  //   }
  // };

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
          title="Company Details"
          subtitle="See in details"
          onClose={handleClose}
        />
        {isLoading ? (
          <LoadingPlaceholder />
        ) : (
          <FormProvider {...methods}>
            <form
              className="overflow-auto"
              // onSubmit={methods.handleSubmit(onSubmit)}
            >
              <div className="bg-white grid grid-cols-12 p-4 rounded-sm space-y-1 space-x-2">
                <div className="flex flex-col col-span-12 space-y-5 overflow-auto">
                  <ModalCropImage updateFile={updateFile} company={company} />
                  <div className="text-sm font-light flex flex-row space-x-2 w-full text-gray-500">
                    <TextInput
                      name="name"
                      icon={<PencilIcon className="h-5 w-5" />}
                      label="Name"
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
                      label="Phone Number"
                      icon={<Phone className="w-5 h-5" />}
                      className="font-light text-base"
                    />
                  </div>
                  <div className="text-sm font-light flex flex-row w-full space-x-2 text-gray-500">
                    <Autocomplete className="w-full">
                      <TextInput
                        name="address"
                        label="Address"
                        icon={<MapPinned className="w-5 h-5" />}
                        className="font-light w-full text-base"
                      />
                    </Autocomplete>
                  </div>
                  <div className="col-span-3 text-right">
                    <Button type="submit" className="font-medium text-xs w-36">
                      {isCompanyLoading ? <LoadingIcon /> : "Save Changes"}
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
            <h2 className="text-lg font-semibold">Unsaved Changes</h2>
            <p>
              You have unsaved changes. If you close this modal, your changes
              will be lost. Are you sure you want to proceed?
            </p>
            <div className="flex flex-row  items-center justify-center space-x-4">
              <Button
                onClick={handleConfirmClose}
                className="!bg-primary !text-white"
              >
                Yes, close it
              </Button>
              <Button
                onClick={() => setShowAlert(false)}
                className="!bg-white !text-primary"
              >
                Cancel
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ModalContactDetails;
