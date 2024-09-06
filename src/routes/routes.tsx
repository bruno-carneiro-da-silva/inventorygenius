import { ReactElement } from "react";
import ProtectedRoutes from "../utils/ProtectedRoutes";
import PublicRoutes from "@/utils/PublicRoutes";
import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import { sidebarItens } from "@/mocks/dashboard.mock";
import Login from "@/pages/Login";
import SupplierDetails from "@/pages/Supplier/SupplierDetails";
import CreateSupplier from "@/pages/Supplier/CreateSupplier";
import Contacts from "@/pages/Clients/Contacts";
import { User } from "lucide-react";

type Route = {
  path: string;
  element?: ReactElement | null;
  children?: Route[];
};

const itensAndSubItensSidebar: Route[] = sidebarItens.map((item) => {
  const route: Route = {
    path: item.route || "/",
    element: (
      // <ProtectedRoutes>
      <DashboardLayout />
      // </ProtectedRoutes>
    ),
  };

  if (item.subItems) {
    route.children = item.subItems.map((subItem) => ({
      path: subItem.route,
      element: subItem.element
        ? // <ProtectedRoutes>
          subItem.element
        : // {/* </ProtectedRoutes> */}
          null,
    }));
  } else {
    route.children = item.element
      ? [
          {
            path: item.route,
            element:
              // <ProtectedRoutes>
              item.element,
            // {/* </ProtectedRoutes>, */}
          },
        ]
      : [];
  }

  return route;
});

export const routes: Route[] = [
  ...itensAndSubItensSidebar,
  {
    path: "/",
    element: <PublicRoutes>{<Login />}</PublicRoutes>,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      // {
      //   path: "",
      //   element: ,
      // },
    ],
  },
  {
    path: "/clientes",
    element: <Contacts />,
  },
  {
    path: "/fornecedores/detalhes/:id",
    element: <SupplierDetails />,
  },
  {
    path: "/fornecedores/criar",
    element: <CreateSupplier />,
  },
  // {
  //   path: "/confirm-password",
  //   element: <ConfirmNewPassword />,
  // },
  // {
  //   path: "/validate-code",
  //   element: <ValidateCode />,
  // },
  // {
  //   path: "/register",
  //   element: <Register />,
  // },
  // {
  //   path: "/register/choose-plan",
  //   element: <ChoosePlan />,
  // },
  // {
  //   path: "/register/choose-cycle/:planId",
  //   element: <ChooseCycle />,
  // },
  // {
  //   path: "/register/review-confirm",
  //   element: <ReviewConfirm />,
  // },
  // {
  //   path: "/register/billing-details",
  //   element: <BillingDetails />,
  // },
  // {
  //   path: "/account-created",
  //   element: <AccountCreated />,
  // },
  // {
  //   path: "/account-not-integrated",
  //   element: <AccountNotIntegrated />,
  // },
  // {
  //   path: "/create-customer-account/:companyUid",
  //   element: <CreateCustomerAccount />,
  // },
];
