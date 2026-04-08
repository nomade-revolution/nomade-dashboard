export interface ImageStructure {
  id: number;
  url: string;
  alt: string;
}

export interface OfferImageItem {
  clientId: string;
  id?: number;
  url?: string;
  file?: File;
  preview?: string;
  isNew: boolean;
}
