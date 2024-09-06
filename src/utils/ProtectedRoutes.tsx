import { useUserStore } from "@/stores/user";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, ReactElement } from "react";

type ProtectedRoutesProps = {
  children?: ReactElement;
};

const ProtectedRoutes = ({ children }: ProtectedRoutesProps) => {
  const { login } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!login || !login.data || !login.data.accessToken) {
      navigate("/");
    }
  }, [login, navigate]);

  return children ? children : <Outlet />;
};

export default ProtectedRoutes;
