import BackgroundImage from "@/assets/logo.png";

export interface LoginLayoutPayload {
  children: React.ReactNode;
}

export const LoginLayoutPayload: React.FC<LoginLayoutPayload> = ({
  children,
}) => {
  return (
    <div className="grid grid-cols-5 overflow-hidden">
      <div className="col-span-3 flex flex-col items-center justify-center h-screen bg-primary-dark">
        <img
          src={BackgroundImage}
          alt="background"
          className="w-full h-screen"
        />
        <p className="-mt-24 text-md font-light text-white">
          Powered by Techne &copy;
        </p>
      </div>
      <div className="col-span-5 md:col-span-2 overflow-auto max-h-screen">
        <div className="flex justify-center text-center items-center p-5 md:p-10">
          <div className="w-96 flex flex-col space-y-16">{children}</div>
        </div>
      </div>
    </div>
  );
};
