import Modal from "@/components/Modal"
import ModalHeader from "@/components/ModalHeader"
import { useProductStore } from "@/stores/product"
import CreateProduct from "../CreateProduct"

interface Props {
    isOpen: boolean
    onClose: () => void
}

export const ModalEditProduct = ({ isOpen, onClose }: Props) => {
    const editProduct = useProductStore().product

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalHeader
                title="Editar produto"
                onClose={onClose}
            />
            <CreateProduct editProduct={editProduct} onClose={onClose} />
        </Modal>
    )
}