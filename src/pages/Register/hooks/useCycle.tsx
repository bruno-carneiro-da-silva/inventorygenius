// import { useListSubscription } from "@/queries/subscription";
import { useSubscriptionStore } from "@/stores/subscription";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { plans as PlanMock } from "@/mocks/plans.mock";

export const useCycle = () => {
  const { planId } = useParams();
  // const { data: plans } = useListSubscription();
  const navigate = useNavigate();
  const {
    setSelectedCycle,
    setSelectedPlan,
    selectedPlan,
    selectedPriceId,
    setSelectedPriceId,
  } = useSubscriptionStore();

  useEffect(() => {
    if (PlanMock && planId) {
      const plan = PlanMock.find((p) => p.uid === planId);
      if (plan) {
        setSelectedPlan(plan);
        setSelectedPriceId(null);
      }
    }
  }, [PlanMock, planId, setSelectedPlan]);

  const handleCycleSelection = (cycle: "Mês" | "Ano", priceId: number) => {
    setSelectedCycle(cycle);
    setSelectedPriceId(priceId);
  };

  return {
    handleCycleSelection,
    selectedPriceId,
    selectedPlan,
    navigate,
    planNotFound: !selectedPlan,
  };
};
