import React from "react";
import { ArrowIcon } from "@/icons";

type TotalInterestingComponentProps = {
  totalIntersting: number;
};

export const TotalInterestingComponent = ({
  totalIntersting,
}: TotalInterestingComponentProps) => {
  return (
    <>
      <div className="flex gap-4">
        <ArrowIcon className="h-3 w-3" />
        <div className="flex flex-col">
          <h5 className="card-title">{totalIntersting}</h5>
          <span className="card-title">interesse</span>
        </div>
      </div>
    </>
  );
};

export default TotalInterestingComponent;
