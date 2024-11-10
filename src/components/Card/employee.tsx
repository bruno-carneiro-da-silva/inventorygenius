import Button from "@/components/Button";
import KebabMenu from "@/components/KebabMenu";
import { Employee } from "@/queries/employee/types";
import { KebabMenuItem } from "@/types/table";
import { Mail, Phone } from "lucide-react";

interface CardPropsWithMenu {
  kebabMenuItems: KebabMenuItem[];
  item: Employee;
}

export const CardEmployee = ({ kebabMenuItems, item }: CardPropsWithMenu) => {
  return (
    <div className="bg-white rounded-xl mt-10 border-gray-300 border p-4 flex w-[330px] h-[352px] flex-col items-center relative">
      <div className="absolute top-2 right-2">
        <KebabMenu items={kebabMenuItems} data={item} />
      </div>
      <div className="mt-4 flex flex-col items-center justify-center">
        <h1 className="text-center text-2xl text-primary-dark font-bold mb-2">
          {item.name}
        </h1>
        <span className="text-center mb-4 text-gray-400">{item.email}</span>
      </div>
      <div className="flex space-x-2">
        <Button
          className="bg-primary-dark"
          onClick={() => {
            window.open(`mailto:${item.email}`, "_blank");
          }}
        >
          <Mail />
        </Button>
        <Button
          className="bg-primary-dark"
          onClick={() => {
            window.open(`https://wa.me/+55${item.phone}`, "_blank");
          }}
        >
          <Phone />
        </Button>
      </div>
    </div>
  );
};

CardEmployee.displayName = "Card";
export type CardType = CardPropsWithMenu;
export default CardEmployee;
