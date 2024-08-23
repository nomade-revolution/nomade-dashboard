import { CategoryRepository } from "../domain/CategoryRepository";
import { Category } from "../domain";
import { HttpResponseInterface } from "@core";

export const categoriesGetAll = (
  categoryRepo: CategoryRepository,
): Promise<HttpResponseInterface<Category[]>> => {
  return categoryRepo.getCategories();
};
