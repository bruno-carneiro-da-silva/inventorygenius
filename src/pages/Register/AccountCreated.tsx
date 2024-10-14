import Button from "@/components/Button";
import { LoginLayoutPayload } from "@/components/Login/LoginLayout";
import Header from "@/components/LogoHeader";
import { useNavigate } from "react-router-dom";

export default function AccountCreated() {
  const navigate = useNavigate();

  return (
    <LoginLayoutPayload>
      <Header />
      <div className="flex flex-col space-y-6">
        <h1 className="text-2xl font-bold text-center">Account was created</h1>
        <div className="text-center text-sm font-light ">
          Our team will be in touch with the email{" "}
          <span className="font-bold">user@company.com</span> to activate the
          account once review is completed
        </div>
        <Button
          type="submit"
          onClick={() => navigate("/account-not-integrated")}
        >
          Go to dashboard
        </Button>
      </div>
    </LoginLayoutPayload>
  );
}
