import { ProductInit, ProductResponse } from "../types";

class CreateProductMapper {
  toPersistence(persistenceCreateProduct: ProductInit) {
    return {
      name: persistenceCreateProduct.name,
      description: persistenceCreateProduct.description,
      price: persistenceCreateProduct.price,
      stock: persistenceCreateProduct.minStock,
      categoryId: persistenceCreateProduct.categoryId,
      size: persistenceCreateProduct.size,
      photos: persistenceCreateProduct.photos.map((photo) => photo),
      capacity: persistenceCreateProduct.capacity,
    };
  }

  toDomain(domainCreateProduct: ProductResponse[]) {
    return domainCreateProduct.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      size: product.size,
      qtd: product.qtd,
      price: product.price,
      categoryId: product.categoryId,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
      category: {
        id: product.category.id,
        name: product.category.name,
        createdAt: product.category.createdAt,
        updatedAt: product.category.updatedAt,
      },
      stock: {
        id: product.stock.id,
        productId: product.stock.productId,
        capacity: product.stock.capacity,
        qtd: product.stock.qtd,
        minStock: product.stock.minStock,
        createdAt: product.stock.createdAt,
        updatedAt: product.stock.updatedAt,
      },
      soldItems: product.soldItems.map((soldItem) => soldItem),
      transactions: product.transactions.map((transaction) => transaction),
      photos: product.photos.map((photo) => ({
        id: photo.id,
        url: photo.url,
        productId: photo.productId,
        createdAt: photo.createdAt,
        updatedAt: photo.updatedAt,
      })),
    }));
  }
}
export default new CreateProductMapper();
