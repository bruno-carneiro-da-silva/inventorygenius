import { EllipsisVertical } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { KebabMenuItem } from "@/types/table";

interface KebabMenuProps {
  items: KebabMenuItem[];
  data: any;
}

const KebabMenu: React.FC<KebabMenuProps> = ({ items, data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={menuRef} className="relative inline-block text-left self-center">
      <button onClick={toggleMenu} className="w-5">
        <EllipsisVertical />
      </button>
      {isOpen && (
        <ul className="absolute right-0 mt-2 w-48 bg-white border p-2 border-gray-200 rounded-md shadow-lg z-50">
          {items.map((menuItem, index) => (
            <li
              key={index}
              onClick={() => {
                menuItem.onClick(data);
                setIsOpen(false);
              }}
              className="cursor-pointer border border-gray-300 my-2 rounded-md space-x-2 place-items-center text-gray-500 flex flex-row font-extralight text-sm px-4 py-2 hover:bg-gray-100"
            >
              {menuItem.icon}
              <div className="place-content-center">{menuItem.label}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default KebabMenu;
