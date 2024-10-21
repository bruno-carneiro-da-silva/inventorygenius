import { useEffect, useRef } from "react";
import { LogOut, Pencil } from "lucide-react";
import React from "react";
import User from "@/assets/cover.png";
import { LoginResponse } from "@/queries/account/types";

type DropdownProfileProps = {
  onProfileClick: () => void;
  onLogoutClick: () => void;
  company?: LoginResponse | null;
  onClose?: () => void;
  imageProfile?: string;
};

const DropdownProfile: React.FC<DropdownProfileProps> = ({
  onProfileClick,
  onLogoutClick,
  company,
  onClose,
  imageProfile,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose?.();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={dropdownRef}
      className="flex flex-col relative mt-20 border border-spacing-1 bg-white rounded-md w-1/6 dropDownProfile"
    >
      <ul className="flex flex-col gap-4 text-gray-600">
        <div className="flex flex-row border-b pb-3 space-x-3">
          <img
            className="bg-cover w-9 h-9 border border-spacing-1 border-gray-200 rounded-full"
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              e.currentTarget.src = User;
            }}
            src={imageProfile}
          />
          <div className="flex flex-col">
            <div className="text-sm font-semibold text-gray-500">
              {company?.user?.nameCompany || "Sem nome"}
            </div>
            <div className="text-xs font-light text-gray-500">
              {company?.user?.emailCompany || "Sem email"}
            </div>
          </div>
        </div>
        <button
          type="button"
          className="cursor-pointer flex flex-row space-x-2 text-left text-sm hover:text-primary-dark"
          onClick={onProfileClick}
        >
          <Pencil className="w-5 h-5" />
          <li>Editar Perfil</li>
        </button>
        <button
          type="button"
          className="cursor-pointer flex flex-row space-x-2  text-left text-sm hover:text-primary-dark"
          onClick={onLogoutClick}
        >
          <LogOut className="w-5 h-5" />
          <li>Sair</li>
        </button>
      </ul>
    </div>
  );
};

DropdownProfile.displayName = "DropdownProfile";
export type DropdownProps = DropdownProfileProps;
export default DropdownProfile;
