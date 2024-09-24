import { Feature, Plan } from "@/types/plan";
import { Check } from "lucide-react";
import React from "react";
import Button from "../Button";

export interface CardPlanLoadingPayload {
  plan: Plan;
}

export const CardPlanLoading: React.FC<CardPlanLoadingPayload> = ({ plan }) => {
  const FeatureItem: React.FC<{ feature: Feature | null }> = () => {
    return (
      <div className="flex flex-row space-x-2">
        <div className="w-2/12 self-center flex place-content-center">
          <div className="bg-gray-300 rounded-full flex text-white w-6 h-6 place-content-center items-center">
            <Check className="w-4 h-4" />
          </div>
        </div>
        <div className="flex flex-col space-y-1">
          <div className="bg-gray-300 h-4 w-24 rounded"></div>
          <div className="bg-gray-300 h-3 w-32 rounded"></div>
        </div>
      </div>
    );
  };

  // const BenefitItem: React.FC = () => {
  //   return (
  //     <div className="col-span-1 p-2 m-1 rounded-3xl text-center bg-gray-300 h-6 w-20"></div>
  //   );
  // };

  return (
    <div className="bg-gray-100 border p-5 rounded-md text-left shadow-md flex flex-col space-y-3 h-full">
      <div className="border-b pb-5">
        <div className="bg-gray-300 h-8 w-48 rounded"></div>
        <div className="bg-gray-300 h-4 w-64 rounded mt-2"></div>
      </div>
      <div className="flex flex-col space-y-2">
        <div className="bg-gray-300 h-8 w-32 rounded"></div>
        <div className="bg-gray-300 h-4 w-40 rounded"></div>
      </div>
      <div className="flex flex-col space-y-3 border-b pb-5">
        {plan.features.map((_, index) => (
          <FeatureItem key={index} feature={null} />
        ))}
      </div>
      <div className="flex-wrap flex flex-row place-content-center space-x-2"></div>
      <div className="h-full w-full content-end">
        <Button className="w-full font-semibold bg-gray-300 text-transparent">
          Get Started
        </Button>
      </div>
    </div>
  );
};

CardPlanLoading.displayName = "CardPlanLoading";
export type CardPlanProps = CardPlanLoadingPayload;
export default CardPlanLoading;
