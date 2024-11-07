import {
  DollarSign,
  LayoutDashboard,
  Shirt,
  Store,
  UserRoundCog,
  Users,
} from "lucide-react";
import Contacts from "@/pages/Clients/Contacts";
import Employee from "@/pages/Employee";
import Product from "@/pages/Product";
import Sells from "@/pages/Sales";
import Supplier from "@/pages/Supplier";
import Dashboard from "../pages/Dashboard";
import { SiderbarItem } from "../types/dashboard";

const className = "w-6 h-6";

export const sidebarItens: SiderbarItem[] = [
  {
    id: "1",
    name: "Dashboard",
    route: "/dashboard",
    icon: <LayoutDashboard className={className} />,
    element: <Dashboard />,
  },
  {
    id: "2",
    name: "Clientes",
    route: "/clientes",
    icon: <Users className={className} />,
    element: <Contacts />,
  },
  {
    id: "3",
    name: "Fornecedores",
    route: "/fornecedores",
    icon: <Store className={className} />,
    element: <Supplier />,
  },
  {
    id: "4",
    name: "Produtos",
    route: "/produtos",
    icon: <Shirt className={className} />,
    element: <Product />,
  },
  {
    id: "5",
    name: "Vendas",
    route: "/vendas",
    icon: <DollarSign className={className} />,
    element: <Sells />,
  },
  {
    id: "6",
    name: "Funcionários",
    route: "/funcionarios",
    icon: <UserRoundCog className={className} />,
    element: <Employee />,
  },
];
