import React from "react";
import plancover from "@/assets/Masking.png";
import KebabMenu from "../KebabMenu";
import { KebabMenuItem } from "@/types/table";
import { PlanDetails } from "@/types/plan";

type CardPlanProps = {
  item: PlanDetails;
  kebabMenuItems?: KebabMenuItem[];
};

export const CardPlan: React.FC<CardPlanProps> = ({ kebabMenuItems, item }) => {
  const filterData = (data: PlanDetails): Record<string, string | number> => {
    const filteredData: Record<string, string | number> = {};
    for (const key in data) {
      if (typeof data[key] === "string" || typeof data[key] === "number") {
        filteredData[key] = data[key] as string | number;
      }
    }
    return filteredData;
  };

  if (!kebabMenuItems) {
    kebabMenuItems = [];
  }

  return (
    <div className="bg-white mt-8">
      <div
        className="bg-primary-dark relative h-[368px] w-[386px] bg-cover bg-center rounded-2xl"
        style={{ backgroundImage: `url(${plancover})` }}
      >
        <div className="absolute top-2 right-2">
          <KebabMenu items={kebabMenuItems} data={filterData(item)} />
        </div>
        <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
          <div>
            <h2 className="text-lg font-semibold">Seu Plano</h2>
            <h1 className="text-4xl font-bold mt-2">{item.name}</h1>
          </div>
          <div className="mt-6">
            <ul className="space-y-2 list-disc list-inside text-white">
              <li className="flex items-center">
                <span>{item.storage}</span>
              </li>
              <li className="flex items-center">
                <span>{item.features}</span>
              </li>
            </ul>
            <p className="mt-4 text-sm">
              Mude para Plano Premium para pegar mais Funcionalidades & Memória
            </p>
          </div>
          <div className="mt-6">
            <button className="px-4 py-2 bg-white text-primary-dark font-semibold rounded-full">
              Mudar o Plano
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
