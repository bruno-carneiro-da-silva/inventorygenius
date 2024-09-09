import Button from "@/components/Button";
import TextInput from "@/components/Input";
import Header from "@/components/LogoHeader";
import { Autocomplete } from "@react-google-maps/api";
import { Earth, MapPin, MapPinned } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function ReviewConfirm() {
  const navigate = useNavigate();
  const methods = useForm();
  return (
    <div className="p-5 flex flex-col space-y-3">
      <Header />
      <div className="flex flex-col space-y-3 w-6/12 self-center p-3">
        <h1 className="text-xl font-bold text-left">3. Review & Confirm</h1>
        <FormProvider {...methods}>
          <form className="flex flex-col space-y-5 text-left rounded-md p-4 bg-white">
            <div className="text-md font-semibold">Address</div>
            <Autocomplete>
              <TextInput
                type="text"
                name="address_country"
                placeholder="Country"
                icon={<Earth />}
              />
            </Autocomplete>
            <Autocomplete>
              <TextInput
                type="text"
                name="state"
                placeholder="State"
                icon={<MapPinned />}
              />
            </Autocomplete>
            <Autocomplete>
              <TextInput
                type="text"
                name="city"
                placeholder="City"
                icon={<MapPin />}
              />
            </Autocomplete>
          </form>
        </FormProvider>
        <Button onClick={() => navigate("/register/billing-details")}>
          Continue
        </Button>
      </div>
    </div>
  );
}
