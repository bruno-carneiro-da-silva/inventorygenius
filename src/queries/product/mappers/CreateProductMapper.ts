import { ProductCreateResponse, ProductInit } from "../types";

class CreateProductMapper {
  toPersistence(persistenceCreateProduct: ProductInit) {
    return {
      name: persistenceCreateProduct.name,
      description: persistenceCreateProduct.description,
      price: persistenceCreateProduct.price,
      stock: persistenceCreateProduct.minStock,
      categoryId: persistenceCreateProduct.categoryId,
      size: persistenceCreateProduct.size,
      photos: persistenceCreateProduct.photos,
      capacity: persistenceCreateProduct.capacity,
    };
  }

  toDomain(domainCreateProduct: ProductCreateResponse) {
    return {
      id: domainCreateProduct.id,
      name: domainCreateProduct.name,
      description: domainCreateProduct.description,
      price: domainCreateProduct.price,
      stock: domainCreateProduct.minStock,
      categoryId: domainCreateProduct.categoryId,
      size: domainCreateProduct.size,
      photos: domainCreateProduct.photos,
      capacity: domainCreateProduct.capacity,
    };
  }
}
export default new CreateProductMapper();
