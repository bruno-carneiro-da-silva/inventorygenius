import coverImage from "@/assets/cover.png";
import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import { LoadingIcon } from "@/icons";
import { useGetProduct } from "@/queries/product";
import { ChevronLeftIcon, DollarSignIcon } from "lucide-react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ProductDetails() {
  const navigate = useNavigate()
  const { id } = useParams();

  const { data } = useGetProduct(id)

  const handleGoBack = () => navigate(-1)

  if (!data) {
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
            src={data.photos?.[0]?.base64}
            alt={data.name}
            className="w-40 h-40 rounded-full mb-5 object-cover border-2 border-white -mt-20"
          />
          <div className="flex flex-col items-start">
            <h1 className="text-2xl mb-3 font-bold text-primary-darker">
              {data.name}
            </h1>
            <p className="text-sm text-gray-500">Categoria: {data.category?.name}</p>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center text-gray-600 space-x-4">
            <div className="flex items-center">
              <span>
                <DollarSignIcon className="w-5 h-5 text-orange-500" />
              </span>
              <span className="ml-2 text-primary-darker">
                R$ {data.price}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-primary-darker">Sobre:</h2>
          <p className="text-primary-darker mt-2">
            {data.description}
          </p>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-primary-darker">Estoque:</h2>
          <div className="flex flex-col gap-1">
            {/* <div className="flex gap-1">
              <span className="text-gray-600 font-medium">Disponível:</span>
              <span className="font-medium">{data.qtd}</span>
            </div> */}
            <div className="flex gap-1">
              <span className="text-gray-600 font-medium">Mínimo:</span>
              <span className="font-medium">{data.stock?.minStock || 'Não definido'}</span>
            </div>
            <div className="flex gap-1">
              <span className="text-gray-600 font-medium">Capacidade:</span>
              <span className="font-medium">{data.stock?.capacity || 'Não definido'}</span>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-primary-darker">Vendidos:</h2>
          <p className="text-primary-darker mt-2">
            {data.soldItems?.length || 0}
          </p>
        </div>
      </div>
    </React.Fragment>
  );
}
