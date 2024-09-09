import { useListSubscription } from "@/queries/subscription";
import { useSubscriptionStore } from "@/stores/subscription";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const useCycle = () => {
  const { planId } = useParams();
  const { data: plans } = useListSubscription();
  const navigate = useNavigate();
  const {
    setSelectedCycle,
    setSelectedPlan,
    selectedPlan,
    selectedPriceId,
    setSelectedPriceId,
  } = useSubscriptionStore();

  useEffect(() => {
    if (plans?.data && planId) {
      const plan = plans.data.find((p) => p.uid === planId);
      if (plan) {
        setSelectedPlan(plan);
        setSelectedPriceId(null);
      }
    }
  }, [plans, planId, setSelectedPlan]);

  const handleCycleSelection = (cycle: "Month" | "Year", priceId: number) => {
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
