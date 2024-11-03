import { ProductInit, ProductResponse } from "../types";

class CreateProductMapper {
  toPersistence(persistenceCreateProduct: ProductInit) {
    return {
      name: persistenceCreateProduct.name,
      description: persistenceCreateProduct.description,
      price: persistenceCreateProduct.price,
      stock: persistenceCreateProduct.minStock,
      categoryId: persistenceCreateProduct.categoryId,
      // size: persistenceCreateProduct.size,
      photos: persistenceCreateProduct.photos.map((photo) => photo),
      capacity: persistenceCreateProduct.capacity,
      minStock: persistenceCreateProduct.minStock,
      qtd: persistenceCreateProduct.qtd,
    };
  }

  toDomain(domainCreateProduct: ProductResponse[]) {
    return domainCreateProduct.map((product) => ({ ...product }))
  }
}
export default new CreateProductMapper();
