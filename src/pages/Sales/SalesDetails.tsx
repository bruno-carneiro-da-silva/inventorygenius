import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import { LoadingIcon } from "@/icons";
import { useGetSale } from "@/queries/sales";
import { useSalesStore } from "@/stores/sales";
import {
  BarChart2Icon,
  ChevronLeftIcon,
  CircleDollarSign,
  Percent,
} from "lucide-react";
import React from "react";

export default function SalesDetails() {
  const { selectedSell } = useSalesStore();

  const { data } = useGetSale(selectedSell?.id)

  const handleGoBack = () => {
    window.history.back();
  };

  if (!selectedSell || !data) {
    return <LoadingIcon />;
  }

  const totalSoldItem = selectedSell?.soldItems?.[0];
  return (
    <React.Fragment>
      <DashboardLayout />
      <div className="relative max-w-7xl mx-auto border p-6 bg-white shadow-lg rounded-lg mt-8 flex flex-row space-x-6">
        <button
          className="absolute z-50 text-black top-0 left-0 p-2"
          type="button"
          onClick={handleGoBack}
        >
          <ChevronLeftIcon className="text-black w-8 h-8" />
        </button>
        <div className="w-full">
          {data?.soldItems?.map((item) => (
            <React.Fragment key={item.id}>
              <div className="mb-8 relative w-full flex flex-row items-center mt-24">
                <img
                  src={
                    item?.product?.photos?.map(
                      (photo) => photo.base64
                    )[0]
                  }
                  alt={item.product.name}
                  className="w-[50px] h-[50px] rounded-2xl object-cover border-2 border-white -mt-20"
                />
                <div className="flex flex-row w-full -mt-20 items-center justify-between ml-6 space-x-4">
                  <div className="border w-[120px] border-primary-dark bg-primary-dark text-white rounded-full p-3 text-center">
                    {item?.product?.category.name}
                  </div>
                  <h1 className="text-2xl font-bold text-primary-darker">
                    {item?.product?.name}
                  </h1>
                  <p className="text-sm text-gray-500 border-red-400 border-spacing-1">
                    {item?.product.description}
                  </p>

                  <p className="text-sm font-bold text-gray-500 border-red-400 border-spacing-1">
                    {item?.qtd}X
                  </p>
                  <span className="text-sm font-bold text-gray-500 border-red-400 border-spacing-1">
                    {item?.price.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                </div>
              </div>
            </React.Fragment>
          ))}

          <div className="flex flex-row mb-20 items-center space-x-20">
            <div className="flex flex-col items-start">
              <span className="text-sm text-gray-500 mb-1">
                Desconto aplicado
              </span>
              <div className="flex flex-row space-x-2 items-center">
                <Percent className="w-6 h-6 text-yellow-400 font-bold" />
                <span className="text-primary-dark font-bold text-lg">
                  {data.discount || 0}
                </span>
              </div>
            </div>

            <div className="flex flex-row">
              <div className="flex flex-row">
                <BarChart2Icon className="w-[62px] h-[53px] text-primary-dark font-bold" />
              </div>
              <div className="flex flex-col">
                <span className="text-primary-dark font-bold text-lg">{`${totalSoldItem.qtd}`}</span>
                <span>total</span>
              </div>
            </div>

            <div className="flex flex-row space-x-2">
              <div className="flex flex-row">
                <CircleDollarSign className="w-[48px] h-[48px] text-primary-dark font-bold" />
              </div>
              <div className="flex flex-col">
                <span className="text-primary-dark font-bold size-7 text-lg">
                  {data.totalPrice.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
                <span>de reais</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
