import CardPlan from "@/components/Cards/CardPlan";
import CardPlanLoading from "@/components/Cards/CardPlanLoading";
import { plans as plansMock } from "@/mocks/plans.mock";
import Header from "@/components/LogoHeader";
import { useListSubscription } from "@/queries/subscription";

export default function ChoosePlan() {
  const { data: plans, isLoading } = useListSubscription();
  return (
    <div className="p-5 flex flex-col space-y-3">
      <Header />
      <div className="flex flex-col space-y-3">
        <h1 className="text-xl font-bold text-left">1. Choose your plan</h1>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-4">
          {isLoading
            ? plansMock.map((plan) => (
                <CardPlanLoading key={plan.id} plan={plan} />
              ))
            : plans?.data.map((plan) => <CardPlan key={plan.id} plan={plan} />)}
        </div>
      </div>
    </div>
  );
}
