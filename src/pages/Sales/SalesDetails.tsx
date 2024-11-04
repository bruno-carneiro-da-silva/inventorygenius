import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import { LoadingIcon } from "@/icons";
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

  const handleGoBack = () => {
    window.history.back();
  };

  if (!selectedSell) {
    return <LoadingIcon />;
  }

  const firstSoldItem = selectedSell.soldItems[0];
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
        <div className="w-2/3">
          <div className="relative flex flex-row items-start mt-24">
            <img
              src={firstSoldItem?.product?.photos[0].base64}
              alt={firstSoldItem?.product?.name}
              className="w-[361px] h-[269px] rounded-2xl mb-5 object-cover border-2 border-white -mt-20"
            />
            <div className="flex flex-col w-1/2 -mt-20 items-start ml-6">
              <h1 className="text-2xl mb-3 font-bold text-primary-darker">
                {firstSoldItem?.product?.name}
              </h1>
              <div className="border w-[120px] border-primary-dark bg-primary-dark text-white rounded-full p-3 text-center mb-6">
                {firstSoldItem?.product?.category.name}
              </div>
              <p className="text-sm text-gray-500 border-red-400 border-spacing-1">
                {firstSoldItem?.product.description}
              </p>
            </div>
          </div>

          <div className="flex flex-row mb-20 items-center space-x-20">
            <div className="flex flex-col items-start">
              <span className="text-sm text-gray-500 mb-1">
                Desconto aplicado
              </span>
              <div className="flex flex-row space-x-2 items-center">
                <Percent className="w-6 h-6 text-yellow-400 font-bold" />
                <span className="text-primary-dark font-bold text-lg">
                  {selectedSell.discount || 0}
                </span>
              </div>
            </div>

            <div className="flex flex-row">
              <div className="flex flex-row">
                <BarChart2Icon className="w-[62px] h-[53px] text-primary-dark font-bold" />
              </div>
              <div className="flex flex-col">
                <span className="text-primary-dark font-bold text-lg">{`  ${firstSoldItem.qtd}`}</span>
                <span>total</span>
              </div>
            </div>

            <div className="flex flex-row space-x-2">
              <div className="flex flex-row">
                <CircleDollarSign className="w-[48px] h-[48px] text-primary-dark font-bold" />
              </div>
              <div className="flex flex-col">
                <span className="text-primary-dark font-bold size-7 text-lg">
                  {selectedSell.totalPrice.toLocaleString("pt-BR", {
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
