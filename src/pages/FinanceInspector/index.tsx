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

export default function FinanceInspector() {
  const columns: ColumnTable[] = [
    {
      id: "productName",
      width: "w-3/12",
      render: (data: Customer) => (
        <div className="flex flex-row space-x-6 items-center">
          <img src={data.photo} className="w-[48px] h-[48px] rounded-full" />
          <div className="flex flex-col">
            <div className="text-sm text-primary-dark font-bold">{`${data.customerName}`}</div>
          </div>
        </div>
      ),
    },
    {
      id: "total",
      render: (data: Customer) => (
        <div className="flex flex-row">
          <div className="flex flex-col">
            <span className="text-primary-dark font-bold text-lg">{`  ${data.uId}`}</span>
          </div>
        </div>
      ),
    },
    {
      id: "category",
      render: (data: Customer) => (
        <div className="flex flex-row space-x-2">
          <div className="flex flex-row">
            <User className="w-[48px] h-[48px] border border-orange-500 bg-orange-500 text-white rounded-full p-3" />
          </div>
          <div className="flex flex-col">
            <span>Categoria</span>
            <span className="text-primary-dark font-bold size-7 text-lg">
              {data.category}
            </span>
          </div>
        </div>
      ),
    },
    {
      id: "value",
      render: (data: Customer) => (
        <div className="flex flex-row">
          <span className="text-primary-dark font-bold size-7 text-lg whitespace-nowrap">
            R$ {data.totalValue}
          </span>
        </div>
      ),
    },
  ];
  const transactionsColumns: ColumnTable[] = [
    {
      id: "productName",
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
            R$ {data.value}
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
            { number: 100, text: "Total de Vendas", percentage: -30 },
            { number: 50, text: "Total de Fornecedores", percentage: 20 },
            { number: 200, text: "Balanço", percentage: 50 },
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
            data={customerMock}
            kebabMenu={KebabMenuItems}
            totalPages={5}
            isLoading={false}
            handlePage={() => {}}
            currentPage={1}
          />
        </div>
        <div className="w-2/3  shadow-md rounded-2xl border p-4">
          <DashboardTable
            columns={transactionsColumns}
            title="Vendas"
            data={sellsTransactionsMock}
            totalPages={5}
            isLoading={false}
            handlePage={() => {}}
            currentPage={1}
          />
        </div>
      </div>
    </div>
  );
}
