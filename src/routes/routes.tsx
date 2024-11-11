import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import { sidebarItens } from "@/mocks/dashboard.mock";
import Contacts from "@/pages/Clients/Contacts";
import ConfirmAccountCreated from "@/pages/ConfirmAccount";
import Employee from "@/pages/Employee";
import ChangeNewPassword from "@/pages/ForgotPassword/ChangeNewPassword";
import ConfirmNewPassword from "@/pages/ForgotPassword/ConfirmNewPassword";
import RecoveryPassword from "@/pages/ForgotPassword/RecoveryPassword";
import ValidateCode from "@/pages/ForgotPassword/ValidateCode";
import Login from "@/pages/Login";
import ProductDetails from "@/pages/Product/ProductDetails";
import Register from "@/pages/Register";
import Sales from "@/pages/Sales";
import SalesDetails from "@/pages/Sales/SalesDetails";
import CreateSupplier from "@/pages/Supplier/CreateSupplier";
import SupplierDetails from "@/pages/Supplier/SupplierDetails";
import PublicRoutes from "@/utils/PublicRoutes";
import { ReactElement } from "react";
import ProtectedRoutes from "../utils/ProtectedRoutes";
import { CreateProductPage } from "@/pages/Product/CreateProductPage";
import EmployeeDetail from "@/pages/Employee/EmployeeDetail";

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
    element: <PublicRoutes>{<Login />}</PublicRoutes>,
  },
  {
    path: "/cadastrar",
    element: <Register />,
  },
  {
    path: "/cadastrar/confirm-account",
    element: <ConfirmAccountCreated />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoutes>
        <DashboardLayout />
      </ProtectedRoutes>
    ),
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
    path: "/produtos/criar",
    element: (
      <ProtectedRoutes>
        <CreateProductPage />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/produtos/detalhes/:id",
    element: (
      <ProtectedRoutes>
        <ProductDetails />
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
  {
    path: "/funcionarios/detalhes/:id",
    element: (
      <ProtectedRoutes>
        <EmployeeDetail />
      </ProtectedRoutes>
    ),
  },
];
