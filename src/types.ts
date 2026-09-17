export interface ProductVariation {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  originalPrice: number;
  volume: string;
  idealFor: string;
  tag?: string;
  features: string[];
  description?: string;
  discount?: string;
  rating?: number;
  reviewsCount?: number;
  image?: string;
  inStock?: boolean;
}

export interface ClinicSpace {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  features: string[];
  techHighlight: string;
}

export interface TestimonialResult {
  id: string;
  name: string;
  age: number;
  treatment: string;
  serumUsage: string;
  timeframe: string;
  quote: string;
  rating: number;
  beforeAfterDescription: string;
  metrics: { label: string; value: string };
  image: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  description: string;
  options: {
    id: string;
    label: string;
    description: string;
    icon?: string;
  }[];
}

export interface QuizRecommendation {
  skinType: string;
  recommendedSerum: string;
  serumKeyActives: string[];
  clinicProtocol: string;
  protocolDescription: string;
  estimatedResults: string;
  discountCoupon: string;
}

export interface ClientUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  isVip?: boolean;
  memberSince: string;
}

export interface LimitedEditionProduct {
  id: string;
  name: string;
  subtitle: string;
  editionBadge: string;
  unitsRemaining: number;
  totalBatch: number;
  batchCode: string;
  price: number;
  originalPrice: number;
  volume: string;
  image: string;
  keyBenefits: string[];
  exclusiveGift: string;
  stripePaymentUrl: string;
  description: string;
}

export interface SpecialCatalogPackage {
  id: string;
  name: string;
  subtitle: string;
  badge: string;
  batchCode: string;
  unitsRemaining: number;
  totalBatch: number;
  price: number;
  originalPrice: number;
  stripePaymentUrl: string;
  description: string;
  image: string;
  includedProducts: {
    id: string;
    name: string;
    role: string;
    volume: string;
    actives: string;
    benefit: string;
    image: string;
  }[];
  exclusiveGifts: string[];
}
