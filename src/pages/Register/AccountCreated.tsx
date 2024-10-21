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
        <h1 className="text-2xl font-bold text-center">
          Conta criada com sucesso!
        </h1>
        <div className="text-center text-sm font-light ">
          Para mais detalhes ou dúvidas nos mande um email{" "}
          <span className="font-bold">technetecnology@gmail.com</span> para
          tirar suas dúvidas ou resolver qualquer problema.
        </div>
        <Button type="submit" onClick={() => navigate("/")}>
          Ir para login
        </Button>
      </div>
    </LoginLayoutPayload>
  );
}
