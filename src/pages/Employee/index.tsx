import coverImage from "@/assets/cover_2.png";
import { CardPlan } from "@/components/CardPlan";
import TimeLine from "@/components/TimeLine";
import { timelineData } from "@/mocks/activities";
import { freePlan } from "@/mocks/plan";

import { useSupplierStore } from "@/stores/supplier";
import { KebabMenuItem } from "@/types/table";
import { Eye, Mail, MapPin, Phone, Trash2 } from "lucide-react";

export default function Employee() {
  // const { id } = useParams();
  const { selectedSupplier } = useSupplierStore();

  if (!selectedSupplier) {
    return <div>Loading...</div>;
  }

  const handleOpenSupplierDetails = (supplier: any) => {
    console.log(supplier);
  };

  const handleOpenModalDelete = () => {
    console.log("Delete");
  };

  const KebabMenuItems: KebabMenuItem[] = [
    {
      id: "details",
      label: "Ver detalhes",
      onClick: (plan) => handleOpenSupplierDetails(plan),
      icon: <Eye />,
    },
    {
      id: "delete",
      label: "Deletar",
      onClick: handleOpenModalDelete,
      icon: <Trash2 />,
    },
  ];

  return (
    <div className="flex flex-row justify-between pr-0">
      <div className="relative max-w-5xl h-[370px] ml-44 border p-6 bg-white shadow-lg rounded-lg mt-8">
        <div
          className="absolute top-0 -left-[50px] w-[1123px] rounded-t-lg h-32 bg-cover bg-center z-0"
          style={{ backgroundImage: `url(${coverImage})` }}
        ></div>
        <div className="relative flex flex-col items-start mt-24">
          <img
            src={selectedSupplier.photo_base64}
            alt={selectedSupplier.name}
            className="w-40 h-40 rounded-full mb-5 object-cover border-2 border-white -mt-20"
          />
          <div className="flex flex-col items-start">
            <h1 className="text-2xl mb-3 font-bold text-primary-darker">
              {selectedSupplier.name}
            </h1>
            <p className="text-sm text-gray-500">{selectedSupplier.niche}</p>
          </div>
        </div>

        <div className="mt-6 w-[1123px]">
          <div className="flex items-center text-gray-600 space-x-4">
            <div className="flex items-center">
              <span>
                <MapPin className="w-5 h-5 text-orange-500" />
              </span>
              <span className="ml-2 text-primary-darker">
                {selectedSupplier.address}
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-white bg-orange-500 rounded-full p-2">
                <Phone className="w-5 h-5" />
              </span>
              <span className="ml-2 text-primary-darker">
                {selectedSupplier.phone}
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-white bg-orange-500 rounded-full p-2">
                <Mail className="w-5 h-5" />
              </span>
              <span className="ml-2 text-primary-darker">
                {selectedSupplier.email}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col ml-8">
        {freePlan.map((plan) => (
          <CardPlan key={plan.id} item={plan} kebabMenuItems={KebabMenuItems} />
        ))}
        <div className="pt-5">
          <h1 className="text-lg text-primary-dark font-bold">
            Últimas atividades
          </h1>
        </div>
        <div className="bg-white h-[368px] w-[386px] bg-cover bg-center rounded-2xl overflow-auto">
          {timelineData.map((item) => (
            <TimeLine key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
