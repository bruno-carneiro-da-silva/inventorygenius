import {
  // Blocks,
  // CircleFadingPlus,
  // FolderKanban,
  LayoutDashboard,
  User,
  Users,
} from "lucide-react";
// import Contacts from "../pages/Clients/Contacts";
import Dashboard from "../pages/Dashboard";
import { SiderbarItem } from "../types/dashboard";
import Supplier from "@/pages/Supplier";
import Contacts from "@/pages/Clients/Contacts";
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
    icon: <User className={className} />,
    element: <Supplier />,
  },
  // // {
  // //   id: "4",
  // //   name: "Clients",
  // //   route: "/others",
  // //   icon: <ListTodo className={className} />,
  // //   element: <></>,
  // // },
  // {
  //   id: "5",
  //   name: "Clients",
  //   route: "/clients/",
  //   icon: <FolderKanban className={className} />,
  //   subItems: [
  //     {
  //       id: "1",
  //       name: "Contacts",
  //       route: "/clients/contacts",
  //       element: <Contacts />,
  //     },
  //   ],
  // },
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
