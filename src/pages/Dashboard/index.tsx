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
          subtitle="Connect, Network, Collaborate"
          overviewItems={[
            { number: 100, text: "New" },
            { number: 50, text: "Working" },
            { number: 200, text: "Contacted" },
            { number: 20, text: "Qualified" },
            { number: 10, text: "Done" },
          ]}
        />
      </div>
    </React.Fragment>
  );
}
