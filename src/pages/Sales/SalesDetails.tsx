import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import { useSalesStore } from "@/stores/sales";
import { BarChart2Icon, MoveUpRight, Star } from "lucide-react";
import React from "react";

export default function SalesDetails() {
  const { selectedSell } = useSalesStore();

  if (!selectedSell) {
    return <div>Loading...</div>;
  }

  return (
    <React.Fragment>
      <DashboardLayout />
      <div className="relative max-w-7xl mx-auto border p-6 bg-white shadow-lg rounded-lg mt-8 flex flex-row space-x-6">
        <div className="w-2/3">
          <div className="relative flex flex-row items-start mt-24">
            <img
              src={selectedSell.photo}
              alt={selectedSell.name}
              className="w-[361px] h-[269px] rounded-2xl mb-5 object-cover border-2 border-white -mt-20"
            />
            <div className="flex flex-col w-1/2 -mt-20 items-start ml-6">
              <h1 className="text-2xl mb-3 font-bold text-primary-darker">
                {selectedSell.name}
              </h1>
              <div className="border w-[120px] border-primary-dark bg-primary-dark text-white rounded-full p-3 text-center mb-6">
                {selectedSell.tag}
              </div>
              <p className="text-sm text-gray-500">
                {selectedSell.description}
              </p>
            </div>
          </div>

          <div className="flex flex-row mb-20 items-center space-x-20">
            <div className="flex flex-col items-start">
              <span className="text-sm text-gray-500 mb-1">Avaliação</span>
              <div className="flex flex-row space-x-2 items-center">
                <Star className="w-6 h-6 text-yellow-400 font-bold" />
                <span className="text-primary-dark font-bold text-lg">
                  {selectedSell.rating}
                </span>
              </div>
            </div>

            <div className="flex flex-row">
              <div className="flex flex-row">
                <BarChart2Icon className="w-[62px] h-[53px] text-primary-dark font-bold" />
              </div>
              <div className="flex flex-col">
                <span className="text-primary-dark font-bold text-lg">{`  ${selectedSell.total}`}</span>
                <span>total</span>
              </div>
            </div>

            <div className="flex flex-row space-x-2">
              <div className="flex flex-row">
                <MoveUpRight className="w-[48px] h-[48px] text-primary-dark font-bold" />
              </div>
              <div className="flex flex-col">
                <span className="text-primary-dark font-bold size-7 text-lg">
                  {selectedSell.interesting}%
                </span>
                <span>de interesse</span>
              </div>
            </div>

            <div className="flex flex-row">
              <div className="relative">
                <svg
                  className="w-15 h-16 text-primary-dark"
                  viewBox="0 0 36 36"
                >
                  <circle
                    className="text-gray-300"
                    strokeWidth="4"
                    stroke="currentColor"
                    fill="transparent"
                    r="16"
                    cx="18"
                    cy="18"
                  />
                  <circle
                    className="text-primary-dark"
                    strokeWidth="4"
                    strokeDasharray="50, 100"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="16"
                    cx="18"
                    cy="18"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-lg p-4">
                  {selectedSell.circlePercentage}%
                </span>
              </div>
            </div>
          </div>
          {/* Details about the sell */}
          <div className="flex flex-row space-x-20">
            <div className="flex flex-col items-start w-1/2">
              <span className="text-2xl text-primary-dark font-bold mb-1">
                Caracteristica
              </span>
              <div className="flex flex-row space-x-2 items-start">
                <p className="text-gray-400 font-light text-sm">
                  {selectedSell.caracteristic}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-start w-1/2">
              <span className="text-2xl text-primary-dark font-bold mb-1">
                Materiais
              </span>
              <div className="flex flex-row space-x-2 items-start">
                <ul className="text-gray-400 flex flex-wrap font-light text-sm">
                  {selectedSell.material.map((material) => (
                    <li key={material} className="list-disc list-inside mr-2">
                      {material}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          {/* End of sell details */}
        </div>
      </div>
    </React.Fragment>
  );
}
