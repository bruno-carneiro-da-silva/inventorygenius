import Button from "@/components/Button";
import { LoginLayoutPayload } from "@/components/Layouts/Login/LoginLayout";
import Header from "@/components/LogoHeader";
import { showErrorToast } from "@/components/Toast";
import { LoadingIcon } from "@/icons";
import { useRefreshToken } from "@/queries/account";
import { useUserStore } from "@/stores/user";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { login, setLogin, setIsPersistent } = useUserStore();
  const refreshToken = useRefreshToken();

  const handleDashboard = () => {
    if (!login?.data) {
      navigate("/");
      return;
    }

    setIsLoading(true);
    refreshToken
      .mutateAsync(login.data.refreshToken)
      .then((res) => {
        setLogin(res);
        setIsPersistent(true);
        navigate("/dashboard");
      })
      .catch((err) => {
        const errorMessage =
          err?.response?.data?.errors?.[0]?.message || "An error occurred";
        showErrorToast(errorMessage);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <LoginLayoutPayload>
      <Header backButton={false} />
      <div className="flex flex-col space-y-6">
        <h1 className="text-2xl font-bold text-center">
          Payment was successful
        </h1>
        <div className="text-center text-sm font-light ">
          Your payment was successful. Click the button below to go to the login
        </div>
        <Button type="button" onClick={handleDashboard}>
          {isLoading ? <LoadingIcon /> : "Go to dashboard"}
        </Button>
      </div>
    </LoginLayoutPayload>
  );
}
