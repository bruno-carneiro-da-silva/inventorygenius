import Background from "@/assets/react.svg";
import Item from "@/components/Dashboard/components/Items";

export interface DashboardHeaderLayoutPayload {
  title?: string;
  subtitle?: string;
  showTitles?: boolean;
  coverText?: string;
  className?: string;
  overviewItems: {
    number: number | undefined;
    text: string;
  }[];
}

export const DashboardHeaderLayout: React.FC<DashboardHeaderLayoutPayload> = ({
  title,
  subtitle,
  showTitles = true,
  coverText,
  className,
  overviewItems,
}) => {
  return (
    <div className="flex flex-row space-x-2 border rounded-md">
      {showTitles && (
        <div className="text-gray-500 w-4/12 flex flex-col space-y-3 bg-white px-12 py-6   rounded-md">
          <div className="font-bold text-3xl">{title}</div>
          <div className="font-light text-sm">{subtitle}</div>
        </div>
      )}
      <div className="flex w-full">
        <div
          className={
            className
              ? className
              : "w-4/12 h-40 bg-cover bg-center bg-no-repeat rounded-l-md bg-primary-light/30 flex flex-col justify-center items-center"
          }
          style={{ backgroundImage: `url(${Background})` }}
        >
          <div className="bg-primary-light/30 w-full h-full font-bold text-white text-2xl text-center place-content-center">
            {coverText ? coverText : "OVERVIEW"}
          </div>
        </div>
        <div className="bg-cover flex flex-row space-x-10 px-10 w-8/12 rounded-e-md bg-white place-items-center">
          {overviewItems.map((item, index) => (
            <Item key={index} number={item.number} text={item.text} />
          ))}
        </div>
      </div>
    </div>
  );
};
