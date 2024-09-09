import { useUserStore } from "@/stores/user";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, ReactElement } from "react";

type PublicRoutesProps = {
  children?: ReactElement;
};

const PublicRoutes = ({ children }: PublicRoutesProps) => {
  const { login } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (login && login.accessToken) {
      navigate("/dashboard");
    }
  }, [login, navigate]);

  return children ? children : <Outlet />;
};

export default PublicRoutes;
