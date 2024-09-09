import { ReactElement } from "react";
import ProtectedRoutes from "../utils/ProtectedRoutes";
import PublicRoutes from "@/utils/PublicRoutes";
import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import { sidebarItens } from "@/mocks/dashboard.mock";
import Login from "@/pages/Login";
import SupplierDetails from "@/pages/Supplier/SupplierDetails";
import CreateSupplier from "@/pages/Supplier/CreateSupplier";
import Contacts from "@/pages/Clients/Contacts";
import Sells from "@/pages/Sales";
import Employee from "@/pages/Employee";
import FinanceInspector from "@/pages/FinanceInspector";
import Finance from "@/pages/Finance";
import Register from "@/pages/Register";

type Route = {
  path: string;
  element?: ReactElement | null;
  children?: Route[];
};

const itensAndSubItensSidebar: Route[] = sidebarItens.map((item) => {
  const route: Route = {
    path: item.route || "/",
    element: (
      <ProtectedRoutes>
        <DashboardLayout />
      </ProtectedRoutes>
    ),
  };

  if (item.subItems) {
    route.children = item.subItems.map((subItem) => ({
      path: subItem.route,
      element: subItem.element ? (
        <ProtectedRoutes>{subItem.element}</ProtectedRoutes>
      ) : null,
    }));
  } else {
    route.children = item.element
      ? [
          {
            path: item.route,
            element: <ProtectedRoutes>{item.element}</ProtectedRoutes>,
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
    element: (
      <PublicRoutes>
        <Login />
      </PublicRoutes>
    ),
  },
  {
    path: "/cadastrar",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoutes>
        <DashboardLayout />
      </ProtectedRoutes>
    ),
    children: [
      // Adicione aqui as rotas filhas do dashboard, se houver
    ],
  },
  {
    path: "/clientes",
    element: (
      <ProtectedRoutes>
        <Contacts />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/fornecedores/detalhes/:id",
    element: (
      <ProtectedRoutes>
        <SupplierDetails />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/fornecedores/criar",
    element: (
      <ProtectedRoutes>
        <CreateSupplier />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/fiscal",
    element: (
      <ProtectedRoutes>
        <FinanceInspector />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/financeiro",
    element: (
      <ProtectedRoutes>
        <Finance />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/vendas",
    element: (
      <ProtectedRoutes>
        <Sells />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/funcionarios",
    element: (
      <ProtectedRoutes>
        <Employee />
      </ProtectedRoutes>
    ),
  },
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
