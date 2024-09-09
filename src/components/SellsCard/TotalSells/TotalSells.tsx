import { ChartIcon } from "@/icons";

type TotalSellsComponentProps = {
  totalSells: number;
};

export const TotalSellsComponent = ({
  totalSells,
}: TotalSellsComponentProps) => {
  return (
    <>
      <div className="d-flex gap-4">
        <ChartIcon className="h-3 w-3" />
        <div className="flex flex-col">
          <h5 className="card-title font-bold">{totalSells}</h5>
          <span className="card-title">total</span>
        </div>
      </div>
    </>
  );
};

export default TotalSellsComponent;
