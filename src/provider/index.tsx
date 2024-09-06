import React from "react";
import { LoadScript } from "@react-google-maps/api";
import { googleMapsLibraries, REACT_GOOGLE_MAPS_API_KEY } from "@/utils/config";
import { LoadingIcon } from "@/icons";

const GoogleMapsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <LoadScript
      googleMapsApiKey={REACT_GOOGLE_MAPS_API_KEY}
      libraries={googleMapsLibraries}
      loadingElement={
        <div className="flex items-center justify-center h-screen">
          <LoadingIcon className="h-14 w-14" />
        </div>
      }
    >
      {children}
    </LoadScript>
  );
};

export default GoogleMapsProvider;
