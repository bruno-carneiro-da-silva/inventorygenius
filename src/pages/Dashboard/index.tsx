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
          title="Dashboard"
          subtitle="Conectar, Criar redes, Colaborar"
          overviewItems={[
            { number: 100, text: "Novos" },
            { number: 50, text: "Em progresso" },
            { number: 200, text: "Contactado" },
            { number: 20, text: "Qualificado" },
            { number: 10, text: "Feito" },
          ]}
        />
      </div>
    </React.Fragment>
  );
}
