import Logo from "@/assets/logo_transparent.png";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import Tooltip from "@/components/Tooltip";
import { LoadingIcon } from "@/icons";
import { sidebarItens } from "@/mocks/dashboard.mock";
import { useGetCompanyByUid } from "@/queries/company";
import cx from "classnames";
import { LogOut } from "lucide-react";
import { FormProvider } from "react-hook-form";
import { Outlet } from "react-router-dom";
import DropdownProfile from "../DropdownMenu";
import ModalContactDetails from "./components/ModalContactDetails";
import { useDashboard } from "./hooks/useDashboard";

export const DashboardLayout: React.FC = () => {
  const {
    handleNavigate,
    handleOpen,
    onClose,
    open,
    isLoading,
    handleLogout,
    subItems,
    methods,
    openOptions,
    handleOpenOptions,
    handleProfileClick,
    openModal,
    isCompanyLoading,
    login,
  } = useDashboard();

  const { data: company } = useGetCompanyByUid(login?.user?.id);

  const buttonText = isLoading ? <LoadingIcon /> : "Sim, sair";

  const PerfilImg = company?.photo_base64 ?? Logo;

  return (
    <div className="flex flex-row">
      <div className="bg-primary-dark h-screen fixed z-30 py-5 justify-between flex flex-col place-items-center place-content-center space-y-2 w-20">
        <div className="text-center">
          <div className="w-20 self-center flex place-content-center mb-10">
            <img
              src={PerfilImg}
              alt="logo"
              className="w-10 place-self-center rounded-full"
            />
          </div>
          {sidebarItens.map((item, index) => (
            <Tooltip key={index} text={item.name}>
              <Button
                onClick={() => handleNavigate(item.route)}
                className={cx(
                  `bg-white !text-gray-400 hover:!text-primary-dark mb-4 hover:bg-white`,
                  location.pathname.includes(item.route)
                    ? "!text-primary-dark bg-white"
                    : ""
                )}
              >
                {item.icon}
              </Button>
            </Tooltip>
          ))}
        </div>
        <Tooltip
          text={"Logout"}
          bgColor="bg-red-500"
          borderColor="border-r-red-500"
        >
          <Button
            onClick={handleOpen}
            className="bg-white !text-gray-400 hover:!text-primary hover:bg-white"
          >
            <LogOut />
          </Button>
        </Tooltip>
      </div>
      <div className="w-full fixed pl-28 bg-white z-20">
        <div className="flex flex-row justify-between">
          <div className="flex space-x-5">
            {subItems.map((item, index) => (
              <Button
                key={index}
                onClick={() => handleNavigate(item.route)}
                className={cx(
                  `bg-white uppercase  font-semibold hover:bg-primary-light/20 rounded-none  border-primary`,
                  location.pathname == item.route
                    ? "!text-primary border-primary !border-b-4"
                    : "border-white !text-gray-400"
                )}
              >
                {item.name}
              </Button>
            ))}
          </div>
          <FormProvider {...methods}>
            <div className="flex items-center rounded-full flex-row space-x-2 p-2">
              <button
                onClick={handleOpenOptions}
                className="border-l-2 pl-2 pr-5 flex-row flex space-x-3"
              >
                <div className="text-primary-dark">
                  {login?.user?.firstName} <br></br>
                  <span className="text-primary text-sm">
                    {login?.user?.role?.name}
                  </span>
                </div>
                <img
                  className="bg-cover w-9 h-9 border-2 border-primary bg-primary-dark rounded-full"
                  onError={(
                    e: React.SyntheticEvent<HTMLImageElement, Event>
                  ) => {
                    e.currentTarget.src = PerfilImg;
                  }}
                  src={PerfilImg}
                />
              </button>
            </div>
          </FormProvider>
        </div>
      </div>
      <div className="py-5 pr-5 md:col-span-11 col-span-9 w-full ml-28 mt-20">
        <Outlet />
      </div>
      {open && (
        <Modal isOpen={open} onClose={onClose} className="!w-4/12">
          <div className="place-items-center rounded-sm flex flex-col space-y-10">
            <div className="text-2xl font-semibold text-primary-dark">
              Sair da conta
            </div>
            <div className="text-base font-light text-gray-500">
              Tem certeza que você quer sair?
            </div>
            <div className="flex flex-row space-x-2">
              <Button
                className="bg-white border border-primary-dark !text-primary-dark hover:!text-white font-medium w-28"
                onClick={onClose}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                onClick={handleLogout}
                disabled={isLoading}
                className="bg-primary-dark text-white w-28 font-medium hover:bg-primary"
              >
                {buttonText}
              </Button>
            </div>
          </div>
        </Modal>
      )}
      {openOptions && (
        <DropdownProfile
          onClose={handleOpenOptions}
          onProfileClick={() => {
            handleProfileClick();
            handleOpenOptions();
          }}
          onLogoutClick={handleOpen}
          company={login}
          imageProfile={PerfilImg}
        />
      )}
      {openModal && (
        <ModalContactDetails
          login={login}
          company={company}
          isLoading={isCompanyLoading}
          isOpen={openModal}
          onClose={handleProfileClick}
        />
      )}
    </div>
  );
};
