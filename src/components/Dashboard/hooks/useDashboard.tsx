import { sidebarItens } from "@/mocks/dashboard.mock";
import { useUserStore } from "@/stores/user";
import { SubItem } from "@/types/dashboard";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

export const useDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const methods = useForm();
  const { logout } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isCompanyLoading, setIsCompanyLoading] = useState(false);

  const handleNavigate = (route: string) => {
    navigate(route);
  };

  const [subItems, setSubItems] = useState<SubItem[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const item = sidebarItens.find((item) =>
      location.pathname.includes(item.route)
    );
    if (item) {
      setSubItems(item.subItems?.filter((item) => !item.notShow) || []);
    }
  }, [location.pathname]);

  const handleOpen = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const [openOptions, setOpenOptions] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenOptions = () => {
    setOpenOptions((prev) => !prev);
  };
  const handleProfileClick = () => {
    setOpenModal((prev) => !prev);
  };

  const handleLogout = () => {
    setIsLoading(true);
    setTimeout(() => {
      logout();
      setIsLoading(false);
      navigate("/");
    }, 200);
  };

  return {
    methods,
    handleNavigate,
    handleLogout,
    subItems,
    isLoading,
    setIsLoading,
    open,
    setOpen,
    handleOpen,
    onClose,
    openOptions,
    handleOpenOptions,
    handleProfileClick,
    openModal,
    isCompanyLoading,
    setIsCompanyLoading,
  };
};
