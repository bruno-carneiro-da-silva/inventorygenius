import { DashboardHeaderLayout } from "@/components/Dashboard/DashboardHeaderLayout";
import DashboardChart from "@/components/DashboardChart";
import DashboardTable from "@/components/DashboardTable";
import customerMock from "@/mocks/customer.mock";
import { sellsTransactionsMock } from "@/mocks/sells";
import { Customer } from "@/types/customer";
import { salesTransactionsProps } from "@/types/sales";
import { ColumnTable, KebabMenuItem } from "@/types/table";
import { Eye, Trash2, TrendingUp, User } from "lucide-react";
import cx from "classnames";
import { maskDateISO } from "@/utils/functions";
import React, { useState } from "react";
import { useGetSuppliers } from "@/queries/supplier";
import { useGetSells } from "@/queries/sales";
import { GetSales } from "@/queries/sales/types";

export default function FinanceInspector() {
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);

  const { data: suppliersResponse } = useGetSuppliers(page, filter || "");
  const { data: sellsResponse } = useGetSells(page, filter || "");

  const columns: ColumnTable[] = [
    {
      id: "photo",
      width: "w-3/12",
      render: (data: GetSales) => (
        <div className="flex flex-row space-x-6 items-center">
          {data.soldItems.map((item) => {
            return (
              <React.Fragment key={item.id}>
                <img
                  key={item.id}
                  src={item?.product?.photos?.[0]?.base64}
                  className="w-[48px] h-[48px] rounded-full"
                />

                <div className="flex flex-col">
                  <div className="text-sm text-primary-dark font-bold">{`${item.product.name}`}</div>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      ),
    },
    {
      id: "total",
      render: (data: GetSales) => (
        <div className="flex flex-row">
          <div className="flex flex-col">
            {data.soldItems.map((item) => {
              return (
                <span className="text-primary-dark font-bold text-lg">{`  ${item.id}`}</span>
              );
            })}
          </div>
        </div>
      ),
    },
    {
      id: "category",
      render: (data: GetSales) => (
        <div className="flex flex-row space-x-2">
          <div className="flex flex-row">
            <User className="w-[48px] h-[48px] border border-orange-500 bg-orange-500 text-white rounded-full p-3" />
          </div>
          <div className="flex flex-col">
            <span>Categoria</span>
            {data.soldItems.map((item) => {
              return (
                <span className="text-primary-dark font-bold size-7 text-lg">
                  {item.product.category.name}
                </span>
              );
            })}
          </div>
        </div>
      ),
    },
    {
      id: "value",
      render: (data: GetSales) => (
        <div className="flex flex-row">
          <span className="text-primary-dark font-bold size-7 text-lg whitespace-nowrap">
            {data.totalPrice.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        </div>
      ),
    },
  ];
  const transactionsColumns: ColumnTable[] = [
    {
      id: "photo",
      render: (data: salesTransactionsProps) => (
        <div className="flex flex-row space-x-6 items-center mr-16">
          <TrendingUp className="w-[48px] h-[48px] border border-orange-500 bg-orange-500 text-white p-3 rounded-full" />
          <div className="flex flex-col">
            <div className="text-sm text-primary-dark font-bold">{`${maskDateISO(
              data.date
            )}`}</div>
          </div>
        </div>
      ),
    },
    {
      id: "uId",
      render: (data: salesTransactionsProps) => (
        <div className="flex flex-row mr-16">
          <div className="flex flex-col">
            <span className="text-primary-dark font-bold text-lg">{`  ${data.uId}`}</span>
          </div>
        </div>
      ),
    },
    {
      id: "value",
      render: (data: salesTransactionsProps) => (
        <div className="flex flex-row mr-16">
          <span className="text-primary-dark font-bold size-7 text-lg whitespace-nowrap">
            {data.value.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        </div>
      ),
    },
    {
      id: "status",
      render: (data: salesTransactionsProps) => (
        <div className="flex flex-row">
          <span
            className={cx("font-bold size-7 text-lg whitespace-nowrap", {
              "text-green-500": data.status === "Completo",
              "text-red-500": data.status === "Cancelado",
              "text-gray-400": data.status === "Pendente",
            })}
          >
            {data.status}
          </span>
        </div>
      ),
    },
  ];

  const KebabMenuItems: KebabMenuItem[] = [
    {
      id: "details",
      label: "Detalhes",
      onClick: (data: any) => console.log(data),
      icon: <Eye />,
    },
    {
      id: "delete",
      label: "Deletar",
      onClick: () => console.log("Deleted"),
      icon: <Trash2 />,
    },
  ];

  return (
    <div className="w-full">
      <div className="flex flex-col space-y-3 mb-4">
        <DashboardHeaderLayout
          overviewItems={[
            {
              number: sellsResponse?.total,
              text: "Total de Vendas",
              percentage: -30,
            },
            {
              number: suppliersResponse?.suppliers.length,
              text: "Total de Fornecedores",
              percentage: 20,
            },
            {
              number: sellsResponse
                ? sellsResponse.sales.reduce(
                    (acc, sale) => acc + sale.totalPrice - sale.discount,
                    0
                  )
                : 0,
              text: "Balanço",
              percentage: 50,
            },
          ]}
        />
      </div>
      <div className="flex flex-col border rounded-2xl shadow-md p-3 mb-4">
        <DashboardChart />
      </div>
      <div className="flex flex-row space-x-4 gap-4">
        <div className="w-full shadow-md rounded-2xl border p-4">
          <DashboardTable
            columns={columns}
            title="Aguardando pagamento"
            data={sellsResponse?.sales || []}
            kebabMenu={KebabMenuItems}
            totalPages={page}
            handlePage={(page) => setPage(page)}
            currentPage={page}
          />
        </div>
        <div className="w-2/3  shadow-md rounded-2xl border p-4">
          <DashboardTable
            columns={transactionsColumns}
            title="Vendas"
            data={sellsTransactionsMock}
            totalPages={sellsResponse?.total || 0}
            handlePage={(page) => setPage(page)}
            currentPage={page}
          />
        </div>
      </div>
    </div>
  );
}
