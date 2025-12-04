
export interface Product {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  sales: number;
  image: string;
  category: string;
  shopName: string;
  tags: string[];
}

export interface User {
  username: string;
  isLoggedIn: boolean;
}

export type Lang = 'zh' | 'en';

export interface Translation {
  login: string;
  loginDesc: string;
  username: string;
  password: string;
  signIn: string;
  home: string;
  aiTryOn: string;
  makeupRec: string;
  searchPlaceholder: string;
  recommeded: string;
  sales: string;
  sold: string;
  buyNow: string;
  addToCart: string;
  uploadImage: string;
  generate: string;
  generating: string;
  tryOnTitle: string;
  tryOnDesc: string;
  selectStyle: string;
  result: string;
  logout: string;
  priceSymbol: string;
  currency: string;
  filters: string;
  all: string;
  welcomeBack: string;
  noAccount: string;
  signUp: string;
  forgotPassword: string;
  otherLogin: string;
  selectFeatures: string;
  eyebrowShape: string;
  lipShape: string;
  noseShape: string;
  recommendedForYou: string;
  matchScore: string;
  analyze: string;
  analyzing: string;
  yourProfile: string;
  basedOnProfile: string;
  beautyConsultant: string;
  consultantDesc: string;
  startAnalysis: string;
  reanalyze: string;
}
