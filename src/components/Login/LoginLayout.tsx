import BackgroundImage from "@/assets/react.svg";

export interface LoginLayoutPayload {
  children: React.ReactNode;
}

export const LoginLayoutPayload: React.FC<LoginLayoutPayload> = ({
  children,
}) => {
  return (
    <div className="grid grid-cols-5">
      <div className="col-span-3">
        <img
          src={BackgroundImage}
          alt="background"
          className={`w-full h-screen hidden md:block`}
        />
      </div>
      <div className="col-span-5 md:col-span-2 overflow-auto max-h-screen">
        <div className="flex justify-center text-center items-center p-5 md:p-10">
          <div className="w-96 flex flex-col space-y-16">{children}</div>
        </div>
      </div>
    </div>
  );
};
