import Logo from "@/assets/react.svg";
import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import { LoginLayoutPayload } from "@/components/Login/LoginLayout";
import { LoadingIcon } from "@/icons";
import useCustomLogin from "@/pages/Login/hooks/useCustomLogin";
import { getValueByKey } from "@/utils/utils";
import { Eye, EyeOff, Phone } from "lucide-react";
import { useState } from "react";
import { FormProvider, FieldError } from "react-hook-form";
import MaskedTextInput from "@/pages/Register/components/PhoneInput";
import cx from "classnames";

export default function Login() {
  const { navigate, methods, onSubmit, isLoading } = useCustomLogin();
  const [visible, setVisible] = useState(false);

  const {
    formState: { errors },
  } = methods;
  const fieldError = getValueByKey(errors, "password") as
    | FieldError
    | undefined;
  const isFieldError = fieldError && fieldError.message;

  const handleShowPassword = () => {
    setVisible(!visible);
  };

  return (
    <LoginLayoutPayload>
      <div className="flex flex-col space-y-2">
        <img src={Logo} alt="logo" className="w-36 self-center" />
        <div className="text-sm font-light">
          Master connectivity to craft your path to CRM victory in this
          thrilling airborne adventure
        </div>
      </div>
      <div className="flex flex-col space-y-6">
        <h1 className="text-2xl font-bold text-center">
          Login in to your Account
        </h1>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="flex flex-col space-y-4"
          >
            <MaskedTextInput
              name="phoneNumber"
              type="text"
              placeholder="Phone"
              icon={<Phone />}
            />
            <div
              className={cx(
                "relative bg-white border border-gray-300 rounded-md p-2 w-full",
                isFieldError && "border-red-400"
              )}
            >
              <div
                className="absolute inset-y-0 left-0 flex items-center pl-4 cursor-pointer"
                onClick={handleShowPassword}
              >
                {visible ? <Eye /> : <EyeOff />}
              </div>
              <input
                type={visible ? "text" : "password"}
                className="rounded-md p-2 w-full pl-10 focus:outline-none focus:border-transparent"
                placeholder="Password"
                {...methods.register("password")}
              />
            </div>
            {isFieldError && (
              <span className="text-red-400 text-left text-sm">
                {fieldError?.message}
              </span>
            )}

            <div className="flex flex-row justify-between">
              <Checkbox name="isPersistent" label="Remember me" />
              <button
                type="button"
                onClick={() => navigate("/recovery-password")}
                className="text-sm text-primary font-bold"
              >
                Forgot password?
              </button>
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <LoadingIcon className="items-center h-6 w-6 m-auto justify-center" />
              ) : (
                "Login"
              )}
            </Button>
            <div className="flex flex-row space-x-1 self-center text-sm">
              <div className="text-sm">Don't have an account?</div>
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="text-sm text-primary font-bold"
              >
                Create an account
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </LoginLayoutPayload>
  );
}
