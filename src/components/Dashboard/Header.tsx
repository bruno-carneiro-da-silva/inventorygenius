import Icon from "@/assets/icon.png";

export interface HeaderLayoutPayload {
  children: React.ReactNode;
}

export const HeaderLayout: React.FC<HeaderLayoutPayload> = ({ children }) => {
  return (
    <div className="flex flex-col space-y-3">
      <div className="flex flex-col space-y-2 p-3 bg-white">
        <img src={Icon} alt="logo" className="w-10 self-center" />
      </div>
      {children}
    </div>
  );
};
