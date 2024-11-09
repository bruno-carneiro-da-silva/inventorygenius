import CardEmployee from "@/components/Card/employee";
import NotFound from "@/components/NotFound/NotFound";
import SubHeader from "@/components/SubHeader";
import Pagination from "@/components/Table/Pagination";
import { useGetEmployees } from "@/queries/employee";
import { Employee } from "@/queries/employee/types";
import { useEmployeeStore } from "@/stores/employee";
import { KebabMenuItem } from "@/types/table";
import { Eye, Trash2 } from "lucide-react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ModalCreateEmployee from "../Sales/Modals/CreateEmployee";
import ModalDeleteEmployee from "./modals/DeleteEmployee";

export default function EmployeeScreen() {
  const methods = useForm();
  const navigate = useNavigate();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const { setSelectedEmployee } = useEmployeeStore();

  const [createOpen, setCreateOpen] = useState(false)

  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState("");

  const { data: employeesResponse } = useGetEmployees(page, filter);

  const handleOpenEmployeeDetails = (employee: Employee) => {
    setSelectedEmployee(employee);
    navigate(`/funcionarios/detalhes/${employee.id}`);
  };

  const handleCreateEmployee = () => {
    setCreateOpen(true)
  };

  const handleCloseCreateEmployee = () => {
    setCreateOpen(false)
  }

  const handleDeleteEmployee = (employee: Employee) => {
    setSelectedEmployee(employee)
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteEmployee = () => {
    setSelectedEmployee(undefined)
    setOpenDeleteModal(false)
  }

  const KebabMenuItems: KebabMenuItem[] = [
    {
      id: "details",
      label: "Ver detalhes",
      onClick: (data) => handleOpenEmployeeDetails(data),
      icon: <Eye />,
    },
    {
      id: "delete",
      label: "Deletar",
      onClick: (data) => handleDeleteEmployee(data),
      icon: <Trash2 />,
    },
  ];

  return (
    <div>
      <FormProvider {...methods}>
        <SubHeader
          name="search"
          placeholder="Procurar funcionário"
          text="Funcionário"
          onChange={() => { }}
          onSearch={(input) => {
            setFilter(input)
          }}
          onClick={handleCreateEmployee}
        />
        <div className="flex flex-row flex-wrap gap-2">
          {employeesResponse?.employees?.map((employee) => (
            <div className="m-2" key={employee.id}>
              <CardEmployee
                key={employee.id}
                item={employee}
                kebabMenuItems={KebabMenuItems}
              />
            </div>
          ))}
          {employeesResponse?.employees?.length === 0 && (
            <div className="w-full flex items-center justify-center">
              <NotFound no_create_text={!!filter} />
            </div>
          )}
        </div>

        <div className="mt-16 flex flex-row items-center justify-center">
          {employeesResponse && employeesResponse.total > 0 && <Pagination
            currentPage={page}
            totalPages={employeesResponse ? Math.ceil(employeesResponse.total / employeesResponse.per_page) : 0}
            onPageChange={(page) => setPage(page)}
          />}
        </div>
      </FormProvider>
      {openDeleteModal && (
        <ModalDeleteEmployee
          isOpen={openDeleteModal}
          onClose={handleCloseDeleteEmployee}
        />
      )}
      {createOpen && <ModalCreateEmployee isOpen={createOpen} onClose={handleCloseCreateEmployee} />}
    </div>
  );
}
