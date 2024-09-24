import cx from "classnames";
import React from "react";
import { formatCurrency } from "@/constants/currency";
import { Check } from "lucide-react";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { Feature, Plan } from "@/types/plan";

export interface CardPlanPayload {
  plan: Plan;
}

export const CardPlanCompany = ({ plan }: CardPlanPayload) => {
  const FeatureItem: React.FC<{ feature: Feature }> = ({ feature }) => {
    return (
      <div className="flex flex-row space-x-2">
        <div className="w-2/12 self-center flex place-content-center">
          <div className="bg-primary-dark rounded-full flex text-white w-6 h-6 place-content-center items-center">
            <Check className="w-4 h-4" />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-base font-bold">{feature.name}</div>
          <div
            className={cx(
              "text-xs font-normal text-gray-500"
              // plan.recommended && "!text-white"
            )}
          >
            {feature.description}
          </div>
        </div>
      </div>
    );
  };

  // const BenefitItem: React.FC<{ text: string }> = ({ text }) => {
  //   return (
  //     <div
  //       className={cx(
  //         "col-span-1 p-2 m-1 rounded-3xl text-center bg-primary-light/20 font-semibold text-xs text-primary "
  //         // plan.recommended && "!text-white"
  //       )}
  //     >
  //       {text}
  //     </div>
  //   );
  // };

  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate(`/register/choose-cycle/${plan.uid}`);
  };

  return (
    <div
      className={cx(
        `bg-white border p-5 rounded-md text-left shadow-md flex flex-col space-y-3 h-full`
        // plan.recommended && "!bg-gray-900 !text-white"
      )}
    >
      <div className="border-b pb-5">
        <div className="text-2xl font-semibold">{plan.name}</div>
        <div className="text-base font-light">{plan.description}</div>
      </div>
      {plan.prices.map((planPrice) => (
        <div className="flex flex-col">
          <div className="text-3xl font-bold">
            {formatCurrency(planPrice.price, "USD", true)}/{planPrice.name}
          </div>
          {/* <div className="text-sm font-bold ">{planPrice.}</div> */}
        </div>
      ))}
      <div className="flex flex-col space-y-3 border-b pb-5">
        {plan.features.map((feature, index) => (
          <FeatureItem key={index} feature={feature} />
        ))}
      </div>
      <div className="flex-wrap flex flex-row place-content-center">
        {/* {plan.benefits.map((benefit, index) => (
          <BenefitItem key={index} text={benefit} />
        ))} */}
      </div>
      <div className="h-full w-full content-end">
        <Button
          onClick={handleGetStarted}
          className={cx(
            "w-full font-semibold"
            // plan.recommended && "!bg-white !text-primary"
          )}
        >
          Começar
        </Button>
      </div>
    </div>
  );
};

CardPlanCompany.displayName = "CardPlanCompany";
export type CardPlanProps = CardPlanPayload;
export default CardPlanCompany;
