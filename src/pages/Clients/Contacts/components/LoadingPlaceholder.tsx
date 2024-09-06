import React from "react";

const LoadingPlaceholder: React.FC = () => (
  <div className="flex flex-row space-x-1 bg-white p-4 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100">
    <div className="animate-pulse bg-gray-200 h-16 w-full rounded-md"></div>
  </div>
);

export default LoadingPlaceholder;
