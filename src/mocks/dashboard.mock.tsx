import {
  Calendar,
  DollarSign,
  HandCoins,
  // Blocks,
  // CircleFadingPlus,
  // FolderKanban,
  LayoutDashboard,
  Store,
  UserRoundCog,
  Users
} from "lucide-react";
// import Contacts from "../pages/Clients/Contacts";
import Contacts from "@/pages/Clients/Contacts";
import Employee from "@/pages/Employee";
import Finance from "@/pages/Finance";
import FinanceInspector from "@/pages/FinanceInspector";
import Sells from "@/pages/Sales";
import Supplier from "@/pages/Supplier";
import Dashboard from "../pages/Dashboard";
import { SiderbarItem } from "../types/dashboard";
// import Integrations from "../pages/Integrations";
// // import Webhooks from "../pages/Webhooks";
// import Campaigns from "../pages/Campaigns";
// import Audience from "../pages/Audience";
// import Template from "../pages/Template";
// import CreateTemplate from "../pages/Template/Create";

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
    name: "Fiscal",
    route: "/financas",
    icon: <Calendar className={className} />,
    element: <Finance />,
  },
  {
    id: "5",
    name: "Financas",
    route: "/fiscal",
    icon: <HandCoins className={className} />,
    element: <FinanceInspector />,
  },
  {
    id: "6",
    name: "Vendas",
    route: "/vendas",
    icon: <DollarSign className={className} />,
    element: <Sells />,
  },
  {
    id: "7",
    name: "Funcionários",
    route: "/funcionarios",
    icon: <UserRoundCog className={className} />,
    element: <Employee />,
  },
  // {
  //   id: "6",
  //   name: "Integrations",
  //   route: "/integrations",
  //   icon: <Blocks className={className} />,
  //   subItems: [
  //     {
  //       id: "1",
  //       name: "Integrations",
  //       route: "/integrations",
  //       element: <Integrations />,
  //     },
  //     // {
  //     //   id: "2",
  //     //   name: "Webhooks",
  //     //   route: "/integrations/webhooks",
  //     //   element: <Webhooks />,
  //     // },
  //   ],
  // },
  // {
  //   id: "7",
  //   name: "Campaigns",
  //   route: "/campaigns",
  //   icon: <CircleFadingPlus className={className} />,
  //   subItems: [
  //     {
  //       id: "1",
  //       name: "Campaigns",
  //       route: "/campaigns",
  //       element: <Campaigns />,
  //     },
  //     {
  //       id: "2",
  //       name: "Audience",
  //       route: "/campaigns/audience",
  //       element: <Audience />,
  //     },
  //     // {
  //     //   id: "3",
  //     //   name: "Feedback Quizes",
  //     //   route: "/campaigns/feedback-quizes",
  //     //   element: <Campaigns />,
  //     // },
  //     {
  //       id: "4",
  //       name: "Templates",
  //       route: "/campaigns/templates",
  //       element: <Template />,
  //     },
  //     {
  //       id: "4",
  //       name: "Create template",
  //       route: "/campaigns/templates/create",
  //       notShow: true,
  //       element: <CreateTemplate />,
  //     },
  //   ],
  // },
  // {
  //   id: "8",
  //   name: "Account Management",
  //   route: "/account-management/",
  //   icon: <UserIcon className={className} />,
  //   subItems: [
  //     {
  //       id: "1",
  //       name: "Users",
  //       route: "/account-management/users",
  //       element: <Users />,
  //     },
  //     {
  //       id: "2",
  //       name: "Roles",
  //       route: "/account-management/roles",
  //       element: <></>,
  //     },
  //     {
  //       id: "3",
  //       name: "Groups",
  //       route: "/account-management/groups",
  //       element: <></>,
  //     },
  //   ],
  // },
];
