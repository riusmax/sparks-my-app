export type SaleOrRental = 'sale' | 'rental';
export type PropertyType = 'villa' | 'apartment' | 'house';
export type View = 'Sea view' | 'Garden view' | 'Mountain view';
export type Ownership = 'Freehold' | 'Leasehold';
 
export interface Property {
  id: number;
  documentId: string;
  name: string;
  description: string;
  descriptionShort: string;
  slug: string;
  type: PropertyType;
  category: string[];
  saleOrRental: SaleOrRental;
  salePrice: number | null;
  salePriceCurrency: string | null;
  basePrice: number | null;
  cleaningFee: number | null;
  size: number | null;
  outdoorSize: number | null;
  bedrooms: number;
  bathrooms: number;
  guests: number;
  floors: number | null;
  buildings: number | null;
  buildYear: number | null;
  view: View[];
  ownership: Ownership | null;
  titleDeed: string | null;
  furnishure: string | null;
  decoration: string[] | null;
  positionAdvantages: string[] | null;
  wifi: boolean;
  privatePool: boolean | null;
  equippedKitchen: boolean | null;
  dishWasher: boolean | null;
  washingMachine: boolean | null;
  airConditioning: string | null;
  distanceFromAirport: number | null;
  propertyLocation: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  sold: boolean | null;
  exclusive: boolean | null;
  highlighted: boolean | null;
}
 
export interface PropertiesRestResponse {
  data: Property[];
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
 
export interface PropertiesQueryParams {
  page?: number;
  pageSize?: number;
  saleOrRental?: SaleOrRental;
  minBedrooms?: number;
  maxPrice?: number;
  sort?: string;
}
 