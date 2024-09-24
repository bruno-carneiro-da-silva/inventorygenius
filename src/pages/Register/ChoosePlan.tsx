import { CardPlan } from "@/components/CardPlan";
import CardPlanLoading from "@/components/CardPlan/CardPlanLoading";
import { plans as plansMock } from "@/mocks/plans.mock";
import Header from "@/components/LogoHeader";
// import { useListSubscription } from "@/queries/subscription";
import { useState } from "react";
import CardPlanCompany from "@/components/CardPlan/CardPlanCompany";

export default function ChoosePlan() {
  // const { data: plans, isLoading } = useListSubscription();
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="p-5 flex flex-col space-y-3">
      <Header />
      <div className="flex flex-col space-y-3">
        <h1 className="text-xl font-bold text-left">1. Escolha seu plano</h1>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-4">
          {isLoading
            ? plansMock.map((plan) => (
                <CardPlanLoading key={plan.id} plan={plan} />
              ))
            : plansMock?.map((plan) => (
                <CardPlanCompany key={plan.id} plan={plan} />
              ))}
        </div>
      </div>
    </div>
  );
}
