import { HandCoins, User, Users } from "lucide-react";
import React from "react";

interface OverviewItem {
  number: number | undefined;
  text: string;
  percentage?: number;
}

interface DashboardHeaderLayoutPayload {
  title?: string;
  subtitle?: string;
  showTitles?: boolean;
  coverText?: string;
  className?: string;
  overviewItems: OverviewItem[];
}

export const DashboardHeaderLayout: React.FC<DashboardHeaderLayoutPayload> = ({
  title,
  subtitle,
  showTitles = true,
  overviewItems,
}) => {
  const sales = overviewItems.find(
    (item) => item.text === "Total de Vendas"
  ) || {
    number: 0,
    text: "Total de Vendas",
    percentage: 0,
  };
  const suppliers = overviewItems.find(
    (item) => item.text === "Total de Fornecedores"
  ) || {
    number: 0,
    text: "Total de Fornecedores",
    percentage: 0,
  };
  const balance = overviewItems.find((item) => item.text === "Balanço") || {
    number: 0,
    text: "Balanço",
    percentage: 0,
  };

  return (
    <div className="flex flex-col space-y-4">
      {showTitles && (
        <div className="text-gray-500 flex flex-col space-y-3 bg-white px-12 py-6">
          <div className="font-bold text-3xl">{title}</div>
          <div className="font-light text-sm">{subtitle}</div>
        </div>
      )}

      <div className="flex justify-between space-x-6">
        {/* Card de Vendas */}
        <div className="flex flex-col bg-white p-6 rounded-lg border shadow-md w-1/3">
          <div className="flex flex-row items-center space-x-4">
            <User className="w-[72px] h-[72px] border border-primary-dark rounded-full text-white bg-primary-dark p-4" />
            <div className="flex flex-col">
              <div className="text-xl font-bold text-gray-400">
                {sales.text}
              </div>
              <div className="text-3xl font-bold text-primary-dark mt-2">
                {sales.number?.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </div>
              <div
                className={`mt-1 text-sm ${
                  sales.percentage && sales.percentage > 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {sales.percentage > 0
                  ? `▲ ${sales.percentage}% a mais`
                  : `▼ ${sales.percentage}% a menos`}
              </div>
            </div>
          </div>
        </div>

        {/* Card de Fornecedores */}
        <div className="flex flex-col bg-white p-6 rounded-lg border shadow-md w-1/3">
          <div className="flex flex-row items-center space-x-4">
            <Users className="w-[72px] h-[72px] border border-orange-500 rounded-full text-white bg-orange-500 p-4" />

            <div className="flex flex-col">
              <div className="text-xl font-bold text-gray-400">
                {suppliers.text}
              </div>
              <div className="text-3xl font-bold text-primary-dark mt-2">
                {suppliers.number}
              </div>
              <div
                className={`mt-1 text-sm ${
                  suppliers.percentage && suppliers.percentage > 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {suppliers.percentage > 0
                  ? `▲ ${suppliers.percentage}% a mais`
                  : `▼ ${suppliers.percentage}% a menos`}
              </div>
            </div>
          </div>
        </div>

        {/* Card de Balanço */}
        <div className="flex flex-col bg-white p-6 rounded-lg border shadow-md w-1/3">
          <div className="flex flex-row space-x-4 items-center">
            <HandCoins className="w-[72px] h-[72px] border border-yellow-500 rounded-full text-white bg-yellow-500 p-4" />
            <div className="flex flex-col">
              <div className="text-xl font-bold text-gray-400">
                {balance.text}
              </div>
              <div className="text-3xl font-bold text-primary-dark mt-2">
                {balance.number?.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </div>
              <div
                className={`mt-1 text-sm ${
                  balance.percentage && balance.percentage > 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {balance.percentage > 0
                  ? `▲ ${balance.percentage}% a mais`
                  : `▼ ${balance.percentage}% a menos`}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
