import { Product, Translation, Lang } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 1,
    title: "Vintage Floral Summer Dress - Elegant Style 2024",
    price: 199,
    originalPrice: 399,
    sales: 1200,
    image: "https://picsum.photos/400/400?random=1",
    category: "Clothing",
    shopName: "Fashion Direct",
    tags: ["New", "Hot"]
  },
  {
    id: 2,
    title: "Smart Running Sneakers - Lightweight Breathable",
    price: 299,
    originalPrice: 599,
    sales: 850,
    image: "https://picsum.photos/400/400?random=2",
    category: "Shoes",
    shopName: "Sports Hub",
    tags: ["Free Shipping"]
  },
  {
    id: 3,
    title: "Luxury Matte Lipstick - Long Lasting Red",
    price: 128,
    sales: 5000,
    image: "https://picsum.photos/400/400?random=3",
    category: "Beauty",
    shopName: "Beauty Queen",
    tags: ["Best Seller"]
  },
  {
    id: 4,
    title: "Wireless Noise Cancelling Headphones",
    price: 899,
    originalPrice: 1299,
    sales: 300,
    image: "https://picsum.photos/400/400?random=4",
    category: "Electronics",
    shopName: "Tech World",
    tags: ["Official"]
  },
  {
    id: 5,
    title: "Korean Style Oversized Hoodie",
    price: 159,
    sales: 2100,
    image: "https://picsum.photos/400/400?random=5",
    category: "Clothing",
    shopName: "K-Style",
    tags: []
  },
  {
    id: 6,
    title: "Ceramic Coffee Mug Set",
    price: 59,
    sales: 400,
    image: "https://picsum.photos/400/400?random=6",
    category: "Home",
    shopName: "Home Deco",
    tags: ["Fragile"]
  }
];

export const TRANSLATIONS: Record<Lang, Translation> = {
  zh: {
    login: "用户登录",
    loginDesc: "欢迎来到 TaoAI 商城，探索智能购物新体验",
    username: "用户名",
    password: "密码",
    signIn: "立即登录",
    home: "首页",
    aiTryOn: "AI 试妆",
    searchPlaceholder: "搜索宝贝...",
    recommeded: "猜你喜欢",
    sales: "销量",
    sold: "人付款",
    buyNow: "立即购买",
    addToCart: "加入购物车",
    uploadImage: "上传照片",
    generate: "一键生成",
    generating: "AI 正在生成...",
    tryOnTitle: "智能 AI 试妆",
    tryOnDesc: "上传您的照片，体验即时美妆效果",
    selectStyle: "选择妆容风格",
    result: "试妆效果",
    logout: "退出",
    priceSymbol: "¥",
    currency: "CNY",
    filters: "筛选",
    all: "全部",
    welcomeBack: "欢迎回来",
    noAccount: "还没有账号？",
    signUp: "立即注册",
    forgotPassword: "忘记密码？",
    otherLogin: "其他方式登录"
  },
  en: {
    login: "User Login",
    loginDesc: "Welcome to TaoAI Mall, discover smart shopping",
    username: "Username",
    password: "Password",
    signIn: "Sign In",
    home: "Home",
    aiTryOn: "AI Try-on",
    searchPlaceholder: "Search products...",
    recommeded: "Recommended",
    sales: "Sales",
    sold: "sold",
    buyNow: "Buy Now",
    addToCart: "Add to Cart",
    uploadImage: "Upload Photo",
    generate: "Generate",
    generating: "AI Processing...",
    tryOnTitle: "Smart AI Try-on",
    tryOnDesc: "Upload your photo to experience instant makeup",
    selectStyle: "Select Style",
    result: "Result",
    logout: "Logout",
    priceSymbol: "$",
    currency: "USD",
    filters: "Filter",
    all: "All",
    welcomeBack: "Welcome Back",
    noAccount: "No account yet?",
    signUp: "Sign Up",
    forgotPassword: "Forgot password?",
    otherLogin: "Or login with"
  }
};

export const AI_STYLES = [
  { id: 'natural', name: 'Natural / 自然裸妆', color: 'bg-orange-100' },
  { id: 'party', name: 'Party / 派对烟熏', color: 'bg-purple-100' },
  { id: 'vintage', name: 'Vintage / 复古红唇', color: 'bg-red-100' },
  { id: 'summer', name: 'Summer / 夏日橘气', color: 'bg-yellow-100' }
];