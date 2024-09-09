import BackButton from "@/components/BackButton";
import Logo from "@/assets/logo_transparent.png";

interface HeaderProps {
  backButton?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ backButton = true }) => {
  return (
    <div className="flex items-center">
      <div className="flex-grow">{backButton && <BackButton />}</div>
      <div className="flex-grow-0">
        <img
          src={Logo}
          alt="logo"
          className="w-36 self-center bg-primary-dark rounded-full"
        />
      </div>
      <div className="flex-grow"></div>
    </div>
  );
};

Header.displayName = "Header";
export default Header;
