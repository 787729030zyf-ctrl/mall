import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';
import { ChevronLeft, ShoppingCart, ShoppingBag, Star, Share2 } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const product = PRODUCTS.find(p => p.id === Number(id));

  if (!product) return <div className="p-10 text-center">Product not found</div>;

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 h-14 bg-white/80 backdrop-blur-md flex items-center justify-between px-4 z-40 border-b">
        <button onClick={() => navigate(-1)} className="p-2">
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>
        <div className="flex space-x-4">
           <button className="p-2">
             <Share2 className="w-5 h-5 text-gray-700" />
           </button>
        </div>
      </div>

      {/* Image */}
      <div className="mt-14 aspect-square w-full bg-gray-200">
        <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
      </div>

      {/* Price & Title */}
      <div className="bg-white p-4 mb-2">
        <div className="flex items-baseline text-taobao-primary font-bold">
           <span className="text-sm">{t.priceSymbol}</span>
           <span className="text-3xl ml-1">{product.price}</span>
           {product.originalPrice && (
             <span className="ml-2 text-gray-400 text-sm font-normal line-through">
               {t.priceSymbol}{product.originalPrice}
             </span>
           )}
        </div>
        <div className="flex justify-between items-center mt-1">
          <span className="bg-red-100 text-taobao-primary text-xs px-2 py-0.5 rounded-full">
            Limited Offer
          </span>
          <span className="text-xs text-gray-500">{product.sales}+ {t.sold}</span>
        </div>
        <h1 className="mt-3 text-lg font-medium text-gray-900 leading-snug">
          {product.title}
        </h1>
      </div>

      {/* Info Blocks */}
      <div className="bg-white p-4 space-y-4 mb-2">
         <div className="flex justify-between items-center">
            <span className="text-sm font-bold text-gray-700">Reviews (99+)</span>
            <div className="flex text-yellow-400 text-xs">
              <Star className="w-3 h-3 fill-current" />
              <Star className="w-3 h-3 fill-current" />
              <Star className="w-3 h-3 fill-current" />
              <Star className="w-3 h-3 fill-current" />
              <Star className="w-3 h-3 fill-current" />
            </div>
         </div>
      </div>

      <div className="bg-white p-4">
        <h3 className="text-sm font-bold mb-2">Details</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          High quality material, perfect for daily use. This {product.category} item is one of our best sellers from {product.shopName}. 
          Includes standard shipping protection.
        </p>
        <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-gray-500">
           <div className="bg-gray-50 p-2 rounded">Fast Delivery</div>
           <div className="bg-gray-50 p-2 rounded">7 Days Return</div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t flex items-center px-2 z-50">
         <div className="flex-1 flex justify-around px-2">
             <div className="flex flex-col items-center justify-center text-gray-500 text-xs">
                <span className="font-bold">{product.shopName}</span>
                <span>Shop</span>
             </div>
             <div className="flex flex-col items-center justify-center text-gray-500 text-xs">
                <ShoppingCart className="w-5 h-5 mb-0.5" />
                <span>Cart</span>
             </div>
         </div>
         <div className="flex flex-1 space-x-2">
           <button className="flex-1 bg-yellow-400 text-white font-bold rounded-full py-2 text-sm shadow-md">
             {t.addToCart}
           </button>
           <button className="flex-1 bg-gradient-to-r from-taobao-secondary to-taobao-primary text-white font-bold rounded-full py-2 text-sm shadow-md">
             {t.buyNow}
           </button>
         </div>
      </div>
    </div>
  );
};

export default ProductDetail;