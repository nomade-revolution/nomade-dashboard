import { HttpResponseInterface } from "@core";
import { Category } from "./Category";

export interface CategoryRepository {
  getCategories(): Promise<HttpResponseInterface<Category[]>>;
}
