import { HeaderLayout } from "@/components/Dashboard/components/Header";
import DashboardChart from "@/components/DashboardChart";
import AxisFormatter from "@/components/DashboardChart/AxisFormatter";
import DashboardTable from "@/components/DashboardTable";
import customerMock from "@/mocks/customer.mock";
import { Customer } from "@/types/customer";
import { ColumnTable, KebabMenuItem } from "@/types/table";
import { Eye, Printer, Trash2, User } from "lucide-react";
import { showErrorToast } from "@/components/Toast";
import { useListCompany } from "@/queries/company";
import { useCompanyStore } from "@/stores/company";
import { useEffect } from "react";

export default function Dashboard() {
  const { setCompany, company } = useCompanyStore((state) => ({
    setCompany: state.setCompany,
    company: state.company,
  }));

  const { data, isError } = useListCompany();

  useEffect(() => {
    if (data) {
      setCompany(data);
    }
  }, [data]);

  useEffect(() => {
    if (isError) {
      showErrorToast("Um erro aconteceu ao carregar os dados");
    }
  }, [isError]);
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
        <div className="flex flex-row items-center justify-center">
          <div className="flex flex-col">
            <span className="text-primary-dark font-bold text-lg">{`  ${data.uId}`}</span>
          </div>
        </div>
      ),
    },
    {
      id: "category",
      render: (data: Customer) => (
        <div className="flex flex-row space-x-2 items-center justify-center">
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
        <div className="flex flex-row items-center justify-center">
          <span className="text-primary-dark font-bold size-7 text-lg whitespace-nowrap">
            R$ {data.totalValue}
          </span>
        </div>
      ),
    },
    {
      id: "print",
      render: () => (
        <div className="flex flex-row items-center justify-center mx-auto">
          <button>
            <Printer className="w-full h-full text-gray-500 rounded-full p-3 hover:bg-gray-400 hover:text-white" />
          </button>
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
      <div className="flex flex-col space-y-3">
        <HeaderLayout
          overviewItems={[
            {
              number: company?.[0]?._count.contacts,
              text: "Clientes",
              percentage: 30,
            },
            {
              number: company?.[0]?._count.suppliers,
              text: "Total de Fornecedores",
              percentage: 20,
            },
            {
              number: company?.[0]?._count.sales,
              text: "Balanço",
              percentage: 50,
            },
          ]}
        />
      </div>
      <div className="flex flex-col border rounded-2xl shadow-md p-3 mb-4 mt-4">
        <DashboardChart />
      </div>
      <div className="flex mx-auto justify-center items-center border shadow-md rounded-2xl">
        <AxisFormatter />
      </div>
      <div className="w-full shadow-md rounded-2xl border p-4 mt-4">
        <DashboardTable
          columns={columns}
          title="Boletos Pendentes & Clientes"
          data={customerMock}
          kebabMenu={KebabMenuItems}
          totalPages={5}
          isLoading={false}
          handlePage={() => {}}
          currentPage={1}
        />
      </div>
    </div>
  );
}
