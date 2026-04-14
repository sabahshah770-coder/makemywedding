export type VenueType = "Banquet Hall" | "Lawn" | "Resort" | "Hotel" | "Rooftop" | "Heritage";

export type Venue = {
  id: string;
  name: string;
  locality: string;
  area: string;
  type: VenueType;
  vegPricePerPlate: number;
  nonVegPricePerPlate: number;
  capacityMin: number;
  capacityMax: number;
  rating: number;
  reviews: number;
  imageUrl: string;
  tags: string[];
};

export type Caterer = {
  id: string;
  name: string;
  locality: string;
  pricePerPlateFrom: number;
  specialty: string[];
  rating: number;
  reviews: number;
  phone: string;
};

export type ListResponse<T> = {
  total: number;
  items: T[];
};

