import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import React from "react";
import CreateProduct from "./CreateProduct";
import { useNavigate } from "react-router-dom";

export const CreateProductPage = () => {
    const navigate = useNavigate()

    const onClose = () => {
        navigate(-1)
    }

    return (
        <React.Fragment>
            <DashboardLayout />
            <CreateProduct onClose={onClose} />
        </React.Fragment>
    )
}