export interface Contact {
  name: string;
  surname: string;
  email: string;
  phone: string;
  type_id: number;
  type: string;
}

export interface ContactType {
  id: number;
  name: string;
  description: string | null;
}
