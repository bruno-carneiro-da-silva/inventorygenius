import { TimelineItem } from "@/types/activities";
import React from "react";

type TimelineItemProp = {
  item: TimelineItem;
};

const TimeLine: React.FC<TimelineItemProp> = ({ item }) => {
  return (
    <div className="p-4">
      <div className="space-y-8">
        <div key={item.id} className="flex items-start">
          <div className="flex-shrink-0">
            <img
              className="h-10 w-10 rounded-full"
              src={item.avatar}
              alt={item.name}
            />
          </div>
          <div className="ml-4 flex-1">
            <p className="text-sm">
              <span className="font-bold text-gray-900">{item.name}</span>{" "}
              {item.action}{" "}
              <span className="text-primary-dark font-bold">{item.task}</span>
              {item.from && item.to && (
                <>
                  {" "}
                  from <span className="text-gray-600">
                    {item.from}
                  </span> to{" "}
                  <span className="text-primary-dark font-bold">{item.to}</span>
                </>
              )}
            </p>
            <p className="text-xs text-gray-500 mt-1">{item.date}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeLine;
