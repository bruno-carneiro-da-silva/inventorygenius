import coverImage from "@/assets/cover.png";
import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import { LoadingIcon } from "@/icons";
import { useGetEmployee } from "@/queries/employee";
import { maskPhone } from "@/utils/functions";
import { ChevronLeftIcon, Mail, Phone } from "lucide-react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EmployeeDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data } = useGetEmployee(id);

  const handleGoBack = () => navigate(-1);

  if (!data) {
    return (
      <div>
        <LoadingIcon />
      </div>
    );
  }

  return (
    <React.Fragment>
      <DashboardLayout />
      <div className="relative max-w-7xl mx-auto border p-6 bg-white shadow-lg rounded-lg mt-8">
        <div
          className="absolute top-0 -left-[48px] w-[1374px] rounded-t-lg  h-32 bg-cover bg-center z-0"
          style={{ backgroundImage: `url(${coverImage})` }}
        ></div>
        <button
          className="absolute z-50 text-black top-0 left-0 p-2"
          type="button"
          onClick={handleGoBack}
        >
          <ChevronLeftIcon className="text-white w-8 h-8" />
        </button>
        <div className="relative flex flex-col items-start mt-24">
          <div className="flex flex-col items-start">
            <h1 className="text-2xl mb-3 font-bold text-primary-darker mt-8">
              {data.name}
            </h1>
          </div>
        </div>

        <div className="text-sm font-light flex flex-row space-x-2 text-gray-500">
          <div className="flex flex-row items-center space-x-2">
            <Mail className="w-5 h-5" />
            <div className="font-light text-base">{data?.email}</div>
          </div>
          <div className="flex flex-row items-center space-x-2">
            <Phone className="w-5 h-5" />
            <div className="font-light text-base">{maskPhone(data?.phone)}</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
