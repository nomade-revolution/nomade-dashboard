import React, { createContext, useCallback, useState } from "react";
import { isHttpSuccessResponse } from "../../shared/utils/typeGuards/typeGuardsFunctions";
import { Category } from "modules/categories/domain";
import { categoriesGetAll } from "modules/categories/application/categories";
import { CategoryRepository } from "modules/categories/domain/CategoryRepository";

interface ContextState {
  categories: Category[];
  loading: boolean;
  error: string | null;
  getAllCategories: () => void;
}

export const CategoriesContext = createContext<ContextState>(
  {} as ContextState,
);

export const CategoriesContextProvider = ({
  children,
  repository,
}: React.PropsWithChildren<{ repository: CategoryRepository }>) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getAllCategories = useCallback(async () => {
    setLoading(true);
    setError(null);

    const response = await categoriesGetAll(repository);
    if (isHttpSuccessResponse(response)) {
      setLoading(false);
      setCategories(response.data);
    }
  }, [repository]);

  return (
    <CategoriesContext.Provider
      value={{
        getAllCategories,
        categories,
        loading,
        error,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};
