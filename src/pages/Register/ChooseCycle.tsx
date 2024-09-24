import Button from "@/components/Button";
import RadioButton from "@/components/RadioButton";
import { formatNumber } from "@/constants/currency";
import Header from "@/components/LogoHeader";
import { useCycle } from "./hooks/useCycle";

export default function ChooseCycle() {
  const {
    handleCycleSelection,
    selectedPlan,
    navigate,
    planNotFound,
    selectedPriceId,
  } = useCycle();

  if (planNotFound) {
    return <div>Plano não encontrado</div>;
  }

  return (
    <div className="p-5 flex flex-col space-y-3">
      <div className="flex flex-col w-2/4 p-2 mx-auto space-y-2">
        <Header />
      </div>
      <div className="flex flex-col space-y-3 w-6/12 self-center p-3">
        <h1 className="text-xl font-bold text-left">2. Escolha seu plano</h1>
        <div className="flex flex-col space-y-5 bg-white rounded-md p-4">
          {selectedPlan?.prices.map((price) => (
            <RadioButton
              label={price.name}
              description={
                price.price !== 0
                  ? `Cobrado R$ ${price.price} anualmente`
                  : "Cobrado anualmente"
              }
              className="justify-between"
              value="option1"
              name="subscriptionCycle"
              onChange={() => handleCycleSelection(price.name, price.id)}
            >
              <div className="text-lg font-bold flex items-center">
                R$ {formatNumber(price.price)}/mo
              </div>
            </RadioButton>
          ))}
        </div>
        <Button
          disabled={!selectedPriceId}
          onClick={() => navigate("/register/billing-details")}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
