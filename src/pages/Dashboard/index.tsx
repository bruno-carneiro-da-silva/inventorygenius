import React from "react";
import { DashboardHeaderLayout } from "@/components/Dashboard/DashboardHeaderLayout";
// import { showErrorToast } from "@/components/Toast";
// import { useListCompany } from "@/queries/company";
// import { useCompanyStore } from "@/stores/company";

export default function Dashboard() {
  // const { setCompany } = useCompanyStore((state) => ({
  //   setCompany: state.setCompany,
  // }));

  // const { data, isError } = useListCompany();

  // useEffect(() => {
  //   if (data) {
  //     setCompany(data);
  //   }
  // }, [data]);

  // useEffect(() => {
  //   if (isError) {
  //     showErrorToast("An error occurred while fetching the company");
  //   }
  // }, [isError]);

  return (
    <React.Fragment>
      <div className="flex flex-col space-y-3">
        <DashboardHeaderLayout
          overviewItems={[
            { number: 100, text: "Total de Vendas", percentage: 30 },
            { number: 50, text: "Total de Fornecedores", percentage: 20 },
            { number: 200, text: "Balanço", percentage: 50 },
          ]}
        />
      </div>
    </React.Fragment>
  );
}
