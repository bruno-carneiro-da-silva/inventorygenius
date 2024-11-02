export interface Supplier {
    name: string
    lastName: string
    phone: string
    email: string
    address: string
    dateOfBirth: string
    photo: string
    document: string
    nationality: string
    niche: string
    contract_start: string
    contract_end: string
    city: string
}

export interface SupplierResponse {
    address: string
    city: string
    cnpj: string
    company: {
        id: string
        firstName: string
        lastName: string
        phoneNumberAdmin: string
    }
    emailAdmin: string
    firstName: string
    companyId: string
    corporateReason: string
    createdAt: string
    dateOfBirth: string
    email: string
    endContractDate: string
    id: string
    lastName: string
    name: string
    nationality: string
    niche: string
    phone: string
    photo_base64: string
    startContractDate: string
    transactions: []
    updatedAt: string
}

export interface GetSuppliersResponse {
    suppliers: SupplierResponse[]
    total: number
    per_page: number
}

export interface SupplierDetailResponse {

}

export interface SaveSupplierResponse {
    data: SupplierResponse
}

export type EditSupplierPayload = Supplier & { id: string }

export interface DeleteSuppliesResponse { }