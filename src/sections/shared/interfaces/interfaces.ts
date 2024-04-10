export interface HeaderSection {
  id: number;
  name: string;
  property: string;
  sortTag: string | null;
}

export interface PaginationStucture {
  current_page: number;
  last_page: number;
  per_page: number;
}

export enum SectionTypes {
  customers = "clientes",
  users = "usuarios",
  offers = "ofertas",
}
