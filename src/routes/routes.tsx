import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import { sidebarItens } from "@/mocks/dashboard.mock";
import Contacts from "@/pages/Clients/Contacts";
import Employee from "@/pages/Employee";
import Finance from "@/pages/Finance";
import FinanceInspector from "@/pages/FinanceInspector";
import ChangeNewPassword from "@/pages/ForgotPassword/ChangeNewPassword";
import ConfirmNewPassword from "@/pages/ForgotPassword/ConfirmNewPassword";
import RecoveryPassword from "@/pages/ForgotPassword/RecoveryPassword";
import ValidateCode from "@/pages/ForgotPassword/ValidateCode";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import BillingDetails from "@/pages/Register/BillingDetails";
import ChooseCycle from "@/pages/Register/ChooseCycle";
import ChoosePlan from "@/pages/Register/ChoosePlan";
import CreateSupplier from "@/pages/Supplier/CreateSupplier";
import SupplierDetails from "@/pages/Supplier/SupplierDetails";
import PublicRoutes from "@/utils/PublicRoutes";
import { ReactElement } from "react";
import ProtectedRoutes from "../utils/ProtectedRoutes";
import SalesDetails from "@/pages/Sales/SalesDetails";
import Sales from "@/pages/Sales";

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
    path: "/recovery-password",
    element: <RecoveryPassword />,
  },
  {
    path: "/change-password",
    element: <ChangeNewPassword />,
  },
  {
    path: "/confirm-password",
    element: <ConfirmNewPassword />,
  },
  {
    path: "/validate-code",
    element: <ValidateCode />,
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
    path: "/financas",
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
        <Sales />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/vendas/:id",
    element: (
      <ProtectedRoutes>
        <SalesDetails />
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
  {
    path: "/register/choose-plan",
    element: <ChoosePlan />,
  },
  {
    path: "/register/choose-cycle/:planId",
    element: <ChooseCycle />,
  },
  // {
  //   path: "/register/review-confirm",
  //   element: <ReviewConfirm />,
  // },
  {
    path: "/register/billing-details",
    element: <BillingDetails />,
  },
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
