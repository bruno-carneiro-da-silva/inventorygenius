import coverImage from "@/assets/cover.png";
import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import { LoadingIcon } from "@/icons";
import { useSupplierStore } from "@/stores/supplier";
import { maskDateISO } from "@/utils/functions";
import { ChevronLeftIcon, Locate, Mail, Phone } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function SupplierDetails() {
  const navigate = useNavigate()
  const { selectedSupplier } = useSupplierStore();

  const handleGoBack = () => navigate(-1)

  if (!selectedSupplier) {
    return (
      <div>
        <LoadingIcon />
      </div>
    );
  }

  return (
    <React.Fragment>
      <DashboardLayout />
      <div className="relative max-w-7xl mx-auto border p-6 bg-white shadow-lg rounded-lg mt-8">
        <div
          className="absolute top-0 -left-[48px] w-[1374px] rounded-t-lg  h-32 bg-cover bg-center z-0"
          style={{ backgroundImage: `url(${coverImage})` }}
        ></div>
        <button className="absolute z-50 text-black top-0 left-0 p-2" type="button" onClick={handleGoBack}>
          <ChevronLeftIcon className="text-white w-8 h-8" />
        </button>
        <div className="relative flex flex-col items-start mt-24">
          <img
            src={selectedSupplier.photo_base64}
            alt={selectedSupplier.name}
            className="w-40 h-40 rounded-full mb-5 object-cover border-2 border-white -mt-20"
          />
          <div className="flex flex-col items-start">
            <h1 className="text-2xl mb-3 font-bold text-primary-darker">
              {selectedSupplier.name}
            </h1>
            <p className="text-sm text-gray-500">{selectedSupplier.niche}</p>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center text-gray-600 space-x-4">
            <div className="flex items-center">
              <span>
                <Locate className="w-5 h-5 text-orange-500" />
              </span>
              <span className="ml-2 text-primary-darker">
                {selectedSupplier.address}
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-orange-500">
                <Phone className="w-5 h-5" />
              </span>
              <span className="ml-2 text-primary-darker">
                {selectedSupplier.phone}
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-orange-500">
                <Mail className="w-5 h-5" />
              </span>
              <span className="ml-2 text-primary-darker">
                {selectedSupplier.email}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-primary-darker">Nacionalidade:</h2>
          <p className="text-primary-darker mt-2">
            {selectedSupplier.nationality}
          </p>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-primary-darker">Contrato:</h2>
          <p className="text-primary-darker mt-2">
            {maskDateISO(selectedSupplier.startContractDate)} - {maskDateISO(selectedSupplier.endContractDate)}
          </p>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-primary-darker">
            Cadastro:
          </h2>
          <ul className="list-disc ml-7 mt-5">
            <li className="text-primary-darker">
              {selectedSupplier.corporateReason}
            </li>
          </ul>
          <p className="text-gray-500 mt-2 ml-7">
            Desde -{" "}
            {selectedSupplier?.createdAt &&
              maskDateISO(selectedSupplier?.createdAt)}
          </p>
        </div>

        {/* <div className="mt-6">
          <h2 className="text-xl font-semibold text-primary-darker">
            Categorias:
          </h2>
          <p className=" mt-4 mb-20 text-sm text-primary-darker">
            {selectedSupplier.productCategory &&
              selectedSupplier.productCategory.split(", ").join(", ")}{" "}
          </p>
        </div> */}
      </div>
    </React.Fragment>
  );
}
