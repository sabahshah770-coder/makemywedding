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

export const LOCALITIES = [
  "Andheri West",
  "Andheri East",
  "Bandra West",
  "Bandra Kurla Complex",
  "Juhu",
  "Powai",
  "Goregaon",
  "Malad",
  "Borivali",
  "Dadar",
  "Lower Parel",
  "Worli",
  "Chembur",
  "Thane West",
  "Navi Mumbai"
] as const;

export const VENUES: Venue[] = [
  {
    id: "v_001",
    name: "Sea Breeze Banquets",
    locality: "Bandra West",
    area: "Bandra",
    type: "Banquet Hall",
    vegPricePerPlate: 1200,
    nonVegPricePerPlate: 1500,
    capacityMin: 150,
    capacityMax: 550,
    rating: 4.6,
    reviews: 214,
    imageUrl:
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1400&q=80",
    tags: ["Near station", "Valet", "AC Hall"]
  },
  {
    id: "v_002",
    name: "Palm Courtyard Lawns",
    locality: "Andheri West",
    area: "Andheri",
    type: "Lawn",
    vegPricePerPlate: 900,
    nonVegPricePerPlate: 1200,
    capacityMin: 200,
    capacityMax: 900,
    rating: 4.4,
    reviews: 188,
    imageUrl:
      "https://images.unsplash.com/photo-1504805572947-34fad45aed93?auto=format&fit=crop&w=1400&q=80",
    tags: ["Open air", "Big gatherings", "DJ allowed"]
  },
  {
    id: "v_003",
    name: "Juhu Pearl Hotel",
    locality: "Juhu",
    area: "Juhu",
    type: "Hotel",
    vegPricePerPlate: 1600,
    nonVegPricePerPlate: 2000,
    capacityMin: 100,
    capacityMax: 450,
    rating: 4.7,
    reviews: 301,
    imageUrl:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=80",
    tags: ["Beachside", "Premium", "Rooms available"]
  },
  {
    id: "v_004",
    name: "Skyline Rooftop by Parel",
    locality: "Lower Parel",
    area: "Lower Parel",
    type: "Rooftop",
    vegPricePerPlate: 1100,
    nonVegPricePerPlate: 1400,
    capacityMin: 80,
    capacityMax: 250,
    rating: 4.3,
    reviews: 97,
    imageUrl:
      "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=1400&q=80",
    tags: ["City view", "Cocktail friendly", "Compact"]
  },
  {
    id: "v_005",
    name: "Powai Grand Resort",
    locality: "Powai",
    area: "Powai",
    type: "Resort",
    vegPricePerPlate: 1350,
    nonVegPricePerPlate: 1700,
    capacityMin: 120,
    capacityMax: 700,
    rating: 4.5,
    reviews: 165,
    imageUrl:
      "https://images.unsplash.com/photo-1519824145371-296894a0daa9?auto=format&fit=crop&w=1400&q=80",
    tags: ["Poolside", "Family friendly", "Parking"]
  },
  {
    id: "v_006",
    name: "Heritage Courtyard, Dadar",
    locality: "Dadar",
    area: "Dadar",
    type: "Heritage",
    vegPricePerPlate: 1000,
    nonVegPricePerPlate: 1300,
    capacityMin: 120,
    capacityMax: 500,
    rating: 4.2,
    reviews: 74,
    imageUrl:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1400&q=80",
    tags: ["Traditional", "Great photos", "Central"]
  }
];

export const CATERERS: Caterer[] = [
  {
    id: "c_001",
    name: "Royal Tastes Catering",
    locality: "Bandra West",
    pricePerPlateFrom: 650,
    specialty: ["North Indian", "Italian counters", "Live chaat"],
    rating: 4.6,
    reviews: 129,
    phone: "+91 90000 11111"
  },
  {
    id: "c_002",
    name: "Mumbai Spice & Smoke",
    locality: "Andheri West",
    pricePerPlateFrom: 550,
    specialty: ["BBQ", "Kebab station", "Fusion mains"],
    rating: 4.4,
    reviews: 88,
    phone: "+91 90000 22222"
  },
  {
    id: "c_003",
    name: "Pure Veg Celebrations",
    locality: "Goregaon",
    pricePerPlateFrom: 500,
    specialty: ["Jain menu", "Rajasthani", "Dessert bar"],
    rating: 4.5,
    reviews: 103,
    phone: "+91 90000 33333"
  },
  {
    id: "c_004",
    name: "Coastal Classics Caterers",
    locality: "Chembur",
    pricePerPlateFrom: 600,
    specialty: ["Konkan", "Seafood (non-veg)", "South Indian breakfast"],
    rating: 4.3,
    reviews: 61,
    phone: "+91 90000 44444"
  }
];

