import { Mail } from "lucide-react";
import Logo from "@/assets/logo.png";
import Button from "@/components/Button";
import TextInput from "@/components/Input";
import { LoginLayoutPayload } from "@/components/Login/LoginLayout";
import { useNavigate } from "react-router-dom";

export default function RecoveryPassword() {
  const navigate = useNavigate();

  return (
    <LoginLayoutPayload>
      <div className="flex flex-col space-y-2">
        <img src={Logo} alt="logo" className="w-36 self-center" />
      </div>
      <div className="flex flex-col space-y-6">
        <h1 className="text-2xl font-bold text-center">
          Recovery your password
        </h1>
        <div className="text-center text-sm font-light ">
          Insert your active e-mail to receive our token in order to reset your
          password
        </div>
        <form className="flex flex-col space-y-4">
          <TextInput
            type="email"
            name="mail"
            placeholder="Mail"
            icon={<Mail />}
          />
          <Button type="submit" onClick={() => navigate("/change-password")}>
            Send
          </Button>
        </form>
      </div>
    </LoginLayoutPayload>
  );
}
