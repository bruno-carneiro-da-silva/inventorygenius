import { HeaderLayout } from "@/components/Dashboard/components/Header";
import DashboardChart from "@/components/DashboardChart";
import AxisFormatter from "@/components/DashboardChart/AxisFormatter";
import DashboardTable from "@/components/DashboardTable";
import { showErrorToast } from "@/components/Toast";
import { useListCompany } from "@/queries/company";
import { useGetSells } from "@/queries/sales";
import { GetSales, GetSalesResponse } from "@/queries/sales/types";
import { ColumnTable } from "@/types/table";
import { maskDateISO } from "@/utils/functions";
import { User } from "lucide-react";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [page, setPage] = useState<number>(1);
  const [filter, _setFilter] = useState("");
  const { data, isError } = useGetSells(page, filter);
  const { data: companyData } = useListCompany(page);

  const salesData: GetSalesResponse[] = data ? [data] : [];

  useEffect(() => {
    if (isError) {
      showErrorToast("Um erro aconteceu ao carregar os dados");
    }
  }, [isError]);
  const columns: ColumnTable[] = [
    {
      id: "employee",
      label: "Funcionário",
      render: (data: GetSales) => {
        return (
          <div className="flex flex-row space-x-2 items-center justify-start pl-6">
            <div className="flex flex-row">
              <User className="w-[48px] h-[48px] border border-orange-500 bg-orange-500 text-white rounded-full p-3" />
            </div>
            <div className="flex flex-col">
              <span>Funcionário</span>
              <span className="text-primary-dark font-bold size-7 text-lg">
                {data?.employee?.name}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      id: "productName",
      label: "Produto",
      width: "w-3/12",
      render: (data: GetSales) => {
        const lastItem = data?.soldItems?.[data.soldItems.length - 1];
        return (
          <div className="flex flex-row space-x-6 items-center">
            {lastItem && (
              <div className="flex flex-row space-x-6 items-center">
                {lastItem.product?.photos?.[0]?.base64 && (
                  <img
                    src={lastItem.product.photos[0].base64}
                    className="w-[48px] h-[48px] rounded-full"
                  />
                )}
                <div className="flex flex-col">
                  {lastItem?.product?.name && (
                    <div className="text-sm text-primary-dark font-bold">{`${lastItem?.product?.name}`}</div>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      },
    },
    {
      id: "productId",
      label: "ID da Venda",
      render: (data: GetSales) => (
        <div className="flex flex-row items-center justify-center">
          <div className="flex flex-col">
            <span className="text-primary-dark font-bold text-lg">{`  ${data?.id}`}</span>
          </div>
        </div>
      ),
    },
    {
      id: "category",
      render: (data: GetSales) => {
        return (
          <div className="flex flex-row space-x-2 items-center justify-center">
            <div className="flex flex-row">
              <User className="w-[48px] h-[48px] border border-orange-500 bg-orange-500 text-white rounded-full p-3" />
            </div>
            <div className="flex flex-col">
              <span>Categoria</span>
              {data?.soldItems?.map((item) => (
                <span
                  key={item.id}
                  className="text-primary-dark font-bold size-7 text-lg"
                >
                  {item?.product?.category?.name}
                </span>
              ))}
            </div>
          </div>
        );
      },
    },
    {
      id: "total",
      label: "Total da Venda",
      render: (data: GetSales) => {
        return (
          <div className="flex flex-row items-center justify-start pl-10">
            <span className="text-primary-dark font-bold size-7 text-lg whitespace-nowrap">
              R$ {data?.totalPrice}
            </span>
          </div>
        );
      },
    },
    {
      id: "createdAt",
      label: "Data de Criação",
      render: (data: GetSales) => {
        const filteredData = data.soldItems[data.soldItems.length - 1];
        return (
          <div>
            {filteredData && (
              <p className="text-gray-500 mt-2 ml-7">
                Criada em -{" "}
                {filteredData?.createdAt &&
                  maskDateISO(filteredData?.createdAt)}
              </p>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div className="w-full">
      <div className="flex flex-col space-y-3">
        <HeaderLayout
          overviewItems={[
            {
              number: companyData?.companyData._count.contacts || 0,
              text: "Clientes",
              percentage: 30,
            },
            {
              number: companyData?.companyData?._count.suppliers || 0,
              text: "Total de Fornecedores",
              percentage: 20,
            },
            {
              number: data?.totalSales || 0,
              text: "Balanço",
              percentage: 50,
            },
          ]}
        />
      </div>
      <div className="flex flex-col h-auto border rounded-2xl shadow-md p-3 mb-4 mt-4">
        <DashboardChart data={salesData} />
      </div>
      <div className="flex mx-auto justify-center items-center border shadow-md rounded-2xl">
        <AxisFormatter data={salesData} />
      </div>
      <div className="w-full shadow-md rounded-2xl border p-4 mt-4">
        <DashboardTable
          columns={columns}
          title="Todas as vendas"
          data={data?.sales || []}
          totalPages={data ? Math.ceil(data.total / data.per_page) : 0}
          handlePage={(page) => setPage(page)}
          currentPage={page}
        />
      </div>
    </div>
  );
}
