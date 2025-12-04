
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { PRODUCTS } from '../constants';
import { Link } from 'react-router-dom';
import { Search, Filter, Sparkles, ScanFace } from 'lucide-react';

const Shop = () => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState('All');
  
  const categories = ['All', ...Array.from(new Set(PRODUCTS.map(p => p.category)))];
  
  const filteredProducts = filter === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === filter);

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="bg-white p-3 rounded-full shadow-sm flex items-center border-2 border-taobao-primary">
        <Search className="w-5 h-5 text-gray-400 ml-2" />
        <input 
          type="text" 
          placeholder={t.searchPlaceholder} 
          className="flex-1 ml-3 outline-none text-gray-700 bg-transparent"
        />
        <button className="bg-taobao-primary text-white px-6 py-1.5 rounded-full font-medium text-sm">
          {t.home}
        </button>
      </div>

      {/* Hero Banners Scroll */}
      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 snap-x">
        {/* AI Try On Banner */}
        <div className="snap-center shrink-0 w-[90%] md:w-[48%] relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg text-white p-6 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold flex items-center">
              <Sparkles className="mr-2 w-5 h-5" />
              {t.tryOnTitle}
            </h2>
            <p className="mt-1 opacity-90 text-xs">{t.tryOnDesc}</p>
            <Link to="/try-on" className="mt-3 inline-block bg-white/20 backdrop-blur-sm border border-white/50 text-white px-4 py-1.5 rounded-full font-bold text-xs hover:bg-white hover:text-purple-600 transition">
              Try Now
            </Link>
          </div>
          <div className="text-6xl opacity-20 transform rotate-12">
            AI
          </div>
        </div>

        {/* Makeup Rec Banner */}
        <div className="snap-center shrink-0 w-[90%] md:w-[48%] relative overflow-hidden rounded-2xl bg-gradient-to-r from-pink-500 to-orange-400 shadow-lg text-white p-6 flex justify-between items-center">
          <div className="relative z-10">
            <h2 className="text-xl font-bold flex items-center">
              <ScanFace className="mr-2 w-5 h-5" />
              {t.beautyConsultant}
            </h2>
            <p className="mt-1 opacity-90 text-xs">{t.consultantDesc}</p>
            <Link to="/recommendation" className="mt-3 inline-block bg-white text-orange-500 px-4 py-1.5 rounded-full font-bold text-xs hover:bg-orange-50 transition shadow-sm">
              Start Analysis
            </Link>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-white/10 skew-x-12 transform translate-x-8"></div>
        </div>
      </div>

      {/* Categories / Filter */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-800 text-lg">{t.recommeded}</h3>
          <span className="text-xs text-gray-500 flex items-center">
            <Filter className="w-3 h-3 mr-1" /> {t.filters}
          </span>
        </div>
        <div className="flex space-x-2 overflow-x-auto no-scrollbar pb-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
                filter === cat 
                  ? 'bg-taobao-primary text-white font-medium shadow-md shadow-orange-200' 
                  : 'bg-white text-gray-600 border border-gray-200'
              }`}
            >
              {cat === 'All' ? t.all : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.map(product => (
          <Link key={product.id} to={`/product/${product.id}`} className="block bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="aspect-square w-full relative">
              <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
              {product.tags.includes('Hot') && (
                 <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded">HOT</span>
              )}
            </div>
            <div className="p-3">
              <h4 className="text-sm text-gray-800 line-clamp-2 leading-tight h-9 mb-1">
                {product.title}
              </h4>
              <div className="flex items-center justify-between mt-2">
                <div className="text-taobao-primary font-bold">
                  <span className="text-xs">{t.priceSymbol}</span>
                  <span className="text-lg">{product.price}</span>
                </div>
                <div className="text-xs text-gray-400">
                  {product.sales} {t.sold}
                </div>
              </div>
              <div className="mt-2 flex items-center">
                 <span className="text-[10px] text-gray-400 bg-gray-100 px-1 rounded">{product.shopName}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Shop;
