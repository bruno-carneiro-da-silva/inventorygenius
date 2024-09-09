import Button from "@/components/Button";
import { LoginLayoutPayload } from "@/components/Layouts/Login/LoginLayout";
import Header from "@/components/LogoHeader";
import { showErrorToast } from "@/components/Toast";
import { LoadingIcon } from "@/icons";
import { useCreatePaymentCheckout } from "@/queries/payment";
import { useSubscriptionStore } from "@/stores/subscription";
import { useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";

export default function PaymentRefused() {
  const stripe = useStripe();
  const [isLoading, setIsLoading] = useState(false);
  const { selectedPriceId, selectedPlan } = useSubscriptionStore();
  const createPaymentCheckout = useCreatePaymentCheckout();

  const handlePayment = async () => {
    if (!selectedPlan || !selectedPriceId) return;
    setIsLoading(true);
    createPaymentCheckout
      .mutateAsync({
        subscriptionUid: selectedPlan?.uid,
        intervalId: selectedPriceId,
      })
      .then((data) => {
        if (!stripe) {
          showErrorToast("Stripe is not loaded");
          return;
        }
        stripe?.redirectToCheckout({
          sessionId: data.data.sessionCheckoutId,
        });
      })
      .catch((err) => {
        const errorMessage =
          err?.response?.data?.errors?.[0]?.message || "An error occurred";
        showErrorToast(errorMessage);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <LoginLayoutPayload>
      <Header backButton={false} />
      <div className="flex flex-col space-y-6">
        <h1 className="text-2xl font-bold text-center">Payment was refused</h1>
        <div className="text-center text-sm font-light ">
          Your payment was refused. Please try again.
        </div>
        <Button type="button" onClick={handlePayment}>
          {isLoading ? <LoadingIcon /> : "Try again"}
        </Button>
      </div>
    </LoginLayoutPayload>
  );
}
