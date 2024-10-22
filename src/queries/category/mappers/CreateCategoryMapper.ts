import { CategoryDetails, CategoryMapperInit } from "../types";

class CreateCategoryMapper {
  toPersistence(domainCreateCategory: CategoryMapperInit) {
    return {
      name: domainCreateCategory.name,
    };
  }
  toDomain(persistenceCreateCategory: CategoryDetails[]) {
    return persistenceCreateCategory.map((category) => {
      id: category.id;
      name: category.name;
      createdAt: category.createdAt;
      updatedAt: category.updatedAt;
    });
  }
}

export default new CreateCategoryMapper();
