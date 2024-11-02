import SellsTable from "@/components/SellsTable";
import productMock from "@/mocks/sells";
import { useSalesStore } from "@/stores/sales";
import { Product } from "@/types/sales";
import { ColumnTable, KebabMenuItem } from "@/types/table";
import { BarChart2Icon, Eye, MoveUpRight, Star, Trash2 } from "lucide-react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ModalDeleteSell from "./Modals/DeleteSell";
import ModalCreateSell from "./Modals/CreateSell";
import { useGetSells } from "@/queries/sales";
import { useGetProducts } from "@/queries/product";

export default function Sales() {
  const methods = useForm();
  const navigate = useNavigate();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState("");

  const handleCreateSell = () => {
    setOpenCreateModal(!openCreateModal);
  };

  const { data: sales } = useGetSells(page, filter);
  const { data: product } = useGetProducts(page, filter);

  const columns: ColumnTable[] = [
    {
      id: "productName",  
      width: "w-4/12",
      render: (data: Product) => (
        <div className="flex flex-row space-x-6 items-center">
          <img src={data.photo} className="w-[150px] h-[150px] rounded-md" />
          <div className="flex flex-col">
            <div className="border w-[120px] border-primary-dark bg-primary-dark text-white -mt-[62px] rounded-full p-3 text-center mb-6">
              {data.tag}
            </div>
            <div className="text-sm text-primary-dark font-bold">{`${data.name}`}</div>
          </div>
        </div>
      ),
    },
    {
      id: "productRating",
      render: (data: Product) => (
        <div className="flex flex-row space-x-2 items-center">
          <div className="flex flex-row">
            <Star className="w-6 h-6 text-yellow-400 font-bold" />
          </div>
          <div className="flex flex-col">
            <span className="text-primary-dark font-bold text-lg">
              {data.rating}
            </span>
          </div>
        </div>
      ),
    },
    {
      id: "total",
      render: (data: Product) => (
        <div className="flex flex-row">
          <div className="flex flex-row">
            <BarChart2Icon className="w-[62px] h-[53px] text-primary-dark font-bold" />
          </div>
          <div className="flex flex-col">
            <span className="text-primary-dark font-bold text-lg">{`  ${data.total}`}</span>
            <span>total</span>
          </div>
        </div>
      ),
    },
    {
      id: "interesting",
      render: (data: Product) => (
        <div className="flex flex-row space-x-2">
          <div className="flex flex-row">
            <MoveUpRight className="w-[48px] h-[48px] text-primary-dark font-bold" />
          </div>
          <div className="flex flex-col">
            <span className="text-primary-dark font-bold size-7 text-lg">
              {data.interesting}%
            </span>
            <span>de interesse</span>
          </div>
        </div>
      ),
    },
    {
      id: "statistic",
      width: "w-[200px]",
      render: (data: any) => {
        return (
          <div className="flex flex-row">
            <div className="relative">
              <svg className="w-15 h-16 text-primary-dark" viewBox="0 0 36 36">
                <circle
                  className="text-gray-300"
                  strokeWidth="4"
                  stroke="currentColor"
                  fill="transparent"
                  r="16"
                  cx="18"
                  cy="18"
                />
                <circle
                  className="text-primary-dark"
                  strokeWidth="4"
                  strokeDasharray="50, 100"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="16"
                  cx="18"
                  cy="18"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-lg p-4">
                {data.circlePercentage}%
              </span>
            </div>
          </div>
        );
      },
    },
  ];

  const { setSelectedSell } = useSalesStore();

  const handleOpenSalesDetails = (sell: Product) => {
    setSelectedSell(sell);
    navigate(`/vendas/${sell.uId}`);
  };

  const handleOpenModalDelete = () => {
    setOpenDeleteModal(!openDeleteModal);
  };

  const KebabMenuItems: KebabMenuItem[] = [
    {
      id: "details",
      label: "Detalhes",
      onClick: (data) => handleOpenSalesDetails(data),
      icon: <Eye />,
    },
    {
      id: "delete",
      label: "Deletar",
      onClick: handleOpenModalDelete,
      icon: <Trash2 />,
    },
  ];

  return (
    <div>
      <FormProvider {...methods}>
        <SellsTable
          handleCreate={handleCreateSell}
          columns={columns}
          data={productMock}
          onSearch={(input) => {
            setFilter(input);
          }}
          kebabMenu={KebabMenuItems}
          totalPages={5}
          isLoading={false}
          handlePage={(page) => setPage(page)}
          currentPage={page}
        />
      </FormProvider>
      {openDeleteModal && (
        <ModalDeleteSell
          isOpen={openDeleteModal}
          onClose={handleOpenModalDelete}
        />
      )}
      {openCreateModal && (
        <ModalCreateSell
          editSell={null}
          isOpen={openCreateModal}
          onClose={handleCreateSell}
        />
      )}
    </div>
  );
}
