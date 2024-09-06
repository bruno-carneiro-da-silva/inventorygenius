import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSupplierStore } from "@/stores/supplier";
import { Locate, Mail, Phone } from "lucide-react";

export default function SupplierDetails() {
  const { id } = useParams();
  const { selectedSupplier } = useSupplierStore();

  useEffect(() => {
    // Lógica para buscar os detalhes do fornecedor usando o ID
    console.log("Supplier ID:", id);
    console.log("Selected Supplier:", selectedSupplier);
  }, [id, selectedSupplier]);

  if (!selectedSupplier) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      <div className="flex items-center space-x-6">
        <img
          src={selectedSupplier.url || "/default-profile.png"}
          alt={selectedSupplier.name}
          className="w-24 h-24 rounded-full object-cover border-2 border-white"
        />
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {selectedSupplier.name}
          </h1>
          <p className="text-sm text-gray-500">{selectedSupplier.role}</p>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center text-gray-600 space-x-4">
          <div className="flex items-center">
            <span>
              <Locate className="w-5 h-5 text-orange-500" />
            </span>
            <span className="ml-2">{selectedSupplier.address}</span>
          </div>
          <div className="flex items-center">
            <span className="text-orange-500">
              <Phone className="w-5 h-5" />
            </span>
            <span className="ml-2">{selectedSupplier.phone}</span>
          </div>
          <div className="flex items-center">
            <span className="text-orange-500">
              <Mail className="w-5 h-5" />
            </span>
            <span className="ml-2">{selectedSupplier.email}</span>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-800">Sobre:</h2>
        <p className="text-gray-600 mt-2">{selectedSupplier.description}</p>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-800">Cadastro:</h2>
        <p className="text-gray-600 mt-2">{selectedSupplier.createdAt}</p>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-800">Categorias:</h2>
        {/* <p className="text-gray-600 mt-2">{selectedSupplier.category.join(", ")}</p> */}
      </div>
    </div>
  );
}
