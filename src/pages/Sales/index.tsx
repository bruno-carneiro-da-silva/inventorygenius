import SellsTable from "@/components/SellsTable";
import { LoadingIcon } from "@/icons";
import { useGetSells } from "@/queries/sales";
import { GetSales } from "@/queries/sales/types";
import { useSalesStore } from "@/stores/sales";
import { ColumnTable, KebabMenuItem } from "@/types/table";
import { getStatusClassAndText, maskDateISO } from "@/utils/functions";
import {
  BarChart2Icon,
  CircleDollarSign,
  Eye,
  Pencil,
  Percent,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ModalCreateSell from "./Modals/CreateSell";
import ModalDeleteSell from "./Modals/DeleteSell";
import ModalEditSell from "./Modals/EditSell";

export default function Sales() {
  const methods = useForm();
  const navigate = useNavigate();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState("");
  const { data: sales } = useGetSells(page, filter || "");

  const { selectedSell } = useSalesStore((state) => ({
    selectedSell: state.selectedSell,
    setSelectedSell: state.setSelectedSell,
  }));

  const handleSearch = (input: string) => {
    setFilter(input);
    setPage(1);
  };

  const handleCreateSell = () => {
    setOpenCreateModal(!openCreateModal);
  };

  const handleOpenEditSell = (sell: GetSales) => {
    setSelectedSell(sell);
    setOpenEditModal(!openEditModal);
  };

  useEffect(() => {
    if (!sales) {
      <LoadingIcon />;
    }
  }, [sales]);

  const columns: ColumnTable[] = [
    {
      id: "image",
      label: "Imagem",
      width: "w-4/12",
      render: (data: GetSales) => {
        const lastItem = data?.soldItems?.[data.soldItems.length - 1];
        return (
          <div className="flex flex-row space-x-6 items-center">
            {lastItem && (
              <div className="flex flex-row space-x-6 items-center">
                {lastItem.product?.photos?.[0]?.base64 && (
                  <img
                    src={lastItem.product.photos[0].base64}
                    className="w-[150px] h-[150px] rounded-md"
                  />
                )}
                <div className="flex flex-col">
                  {lastItem.product?.category?.name && (
                    <div className="border w-[120px] border-primary-dark bg-primary-dark text-white -mt-[62px] rounded-full p-3 text-center mb-6">
                      {lastItem.product.category.name}
                    </div>
                  )}
                  {lastItem.product?.name && (
                    <div className="text-sm text-primary-dark font-bold">{`${lastItem.product.name}`}</div>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      },
    },
    {
      id: "total",
      label: "Total de vendas",
      render: (data: GetSales) => {
        const filteredData = data.soldItems[data.soldItems.length - 1];
        return (
          <div className="flex flex-row">
            <div className="flex flex-row">
              <BarChart2Icon className="w-[62px] h-[53px] text-primary-dark font-bold" />
            </div>
            <div className="flex flex-col w-[63px]">
              {filteredData ? (
                <>
                  <span
                    key={filteredData.id}
                    className="text-primary-dark font-bold text-lg"
                  >
                    {filteredData.qtd}
                  </span>
                  <span>total</span>
                </>
              ) : (
                <div className="flex flex-col w-[63px]">
                  <span className="text-primary-dark font-bold text-lg">0</span>
                  <span>total</span>
                </div>
              )}
            </div>
          </div>
        );
      },
    },
    {
      id: "price",
      label: "Preço",
      render: (data: GetSales) => (
        <div className="flex flex-row space-x-2 items-center">
          <div className="flex flex-row">
            <CircleDollarSign className="w-[48px] h-[48px] text-primary-dark font-bold" />
          </div>
          <div className="flex flex-col">
            <span className="text-primary-dark font-bold size-7 text-lg">
              <span className="text-primary-dark font-bold text-md">
                {data.totalPrice.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            </span>
          </div>
        </div>
      ),
    },
    {
      id: "discount",
      label: "Desconto",
      render: (data: GetSales) => (
        <div className="flex flex-row space-x-2 items-center">
          <div className="flex flex-row">
            <Percent className="w-6 h-6 text-yellow-400 font-bold" />
          </div>
          <div className="flex flex-col">
            <span className="text-primary-dark font-bold text-lg">
              {data.discount || 0}
            </span>
          </div>
        </div>
      ),
    },
    {
      id: "status",
      label: "Status",
      render: (data: GetSales) => {
        const { statusClass, statusText } = getStatusClassAndText(
          data.paymentStatus
        );

        return (
          <span className={`px-3 py-2 rounded-full ${statusClass}`}>
            {statusText}
          </span>
        );
      },
    },
    {
      id: "createdAt",
      label: "Data de criação",
      width: "w-[200px]",
      render: (data: GetSales) => {
        const filteredData = data.soldItems[data.soldItems.length - 1];
        return (
          <div>
            {filteredData && (
              <p className="text-gray-500 mt-2 ml-7">
                Criada em -{" "}
                {filteredData.createdAt && maskDateISO(filteredData.createdAt)}
              </p>
            )}
          </div>
        );
      },
    },
  ];

  const { setSelectedSell } = useSalesStore();

  const handleOpenSalesDetails = (sell: GetSales) => {
    setSelectedSell(sell);
    navigate(`/vendas/${sell.id}`);
  };

  const handleOpenModalDelete = (sell: GetSales) => {
    setSelectedSell(sell);
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
      id: "update",
      label: "Editar",
      onClick: (data) => handleOpenEditSell(data),
      icon: <Pencil />,
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
          data={sales?.sales || []}
          onSearch={handleSearch}
          kebabMenu={KebabMenuItems}
          totalPages={sales ? Math.ceil(sales.total / sales.per_page) : 0}
          handlePage={(page) => setPage(page)}
          currentPage={page}
          filter={filter}
        />
      </FormProvider>
      {openDeleteModal && (
        <ModalDeleteSell
          isOpen={openDeleteModal}
          onClose={() => setOpenDeleteModal(!openDeleteModal)}
        />
      )}
      {openCreateModal && (
        <ModalCreateSell
          editSell={null}
          isOpen={openCreateModal}
          onClose={handleCreateSell}
        />
      )}
      {openEditModal && (
        <ModalEditSell
          editSell={selectedSell}
          isOpen={openEditModal}
          onClose={() => setOpenEditModal(!openEditModal)}
        />
      )}
    </div>
  );
}
