import { CardPlan } from "@/components/CardPlan";
import { freePlan } from "@/mocks/plan";

export default function CardCommentsList() {
  return (
    <div className="w-1/3 flex flex-col">
      {freePlan.map((plan) => (
        <CardPlan key={plan.id} item={plan} />
      ))}
    </div>
  );
}
