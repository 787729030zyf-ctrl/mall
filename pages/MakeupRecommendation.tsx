
import React, { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { SHAPE_OPTIONS, PRODUCTS } from '../constants';
import { Link } from 'react-router-dom';
import { Check, Sparkles, ShoppingBag, ScanLine, RefreshCcw, ArrowRight } from 'lucide-react';

const MakeupRecommendation = () => {
  const { t, lang } = useLanguage();
  
  const [selections, setSelections] = useState({
    eyebrow: '',
    lip: '',
    nose: ''
  });
  
  const [step, setStep] = useState<'input' | 'analyzing' | 'result'>('input');

  const handleSelect = (category: keyof typeof selections, value: string) => {
    setSelections(prev => ({ ...prev, [category]: value }));
  };

  const isFormComplete = selections.eyebrow && selections.lip && selections.nose;

  const startAnalysis = () => {
    if (!isFormComplete) return;
    setStep('analyzing');
    // Simulate AI processing
    setTimeout(() => {
      setStep('result');
      window.scrollTo(0, 0);
    }, 2000);
  };

  const reset = () => {
    setStep('input');
    setSelections({ eyebrow: '', lip: '', nose: '' });
  };

  // Logic to determine recommendations
  const recommendedProducts = useMemo(() => {
    if (step !== 'result') return [];

    const recs = [];
    
    // Eyebrow Logic
    if (selections.eyebrow === 'straight') {
      recs.push({ ...PRODUCTS.find(p => p.id === 7)!, reason: lang === 'zh' ? '适合平眉的精细描绘' : 'Precision for straight brows' }); 
    } else if (selections.eyebrow === 'arched') {
      recs.push({ ...PRODUCTS.find(p => p.id === 11)!, reason: lang === 'zh' ? '挑眉搭配上扬眼线' : 'Winged liner suits arched brows' });
    } else {
      recs.push({ ...PRODUCTS.find(p => p.id === 7)!, reason: lang === 'zh' ? '打造自然标准眉形' : 'For natural brow definition' });
    }

    // Lip Logic
    if (selections.lip === 'thin') {
      recs.push({ ...PRODUCTS.find(p => p.id === 9)!, reason: lang === 'zh' ? '丰唇效果增加立体感' : 'Volume for thinner lips' });
    } else if (selections.lip === 'full') {
      recs.push({ ...PRODUCTS.find(p => p.id === 3)!, reason: lang === 'zh' ? '哑光质地凸显唇形' : 'Matte finish highlights full lips' });
      recs.push({ ...PRODUCTS.find(p => p.id === 12)!, reason: lang === 'zh' ? '定妆喷雾保持完美唇妆' : 'Keep that bold lip perfect' });
    } else {
      recs.push({ ...PRODUCTS.find(p => p.id === 3)!, reason: lang === 'zh' ? '经典红唇提升气色' : 'Classic red for standard lips' });
    }

    // Nose Logic
    if (selections.nose === 'wide' || selections.nose === 'flat') {
      recs.push({ ...PRODUCTS.find(p => p.id === 8)!, reason: lang === 'zh' ? '修容棒修饰鼻翼' : 'Contour to refine nose shape' });
      recs.push({ ...PRODUCTS.find(p => p.id === 10)!, reason: lang === 'zh' ? '高光提亮鼻梁' : 'Highlight to lift the bridge' });
    } else {
       recs.push({ ...PRODUCTS.find(p => p.id === 8)!, reason: lang === 'zh' ? '轻微修容增加立体度' : 'Subtle contour for depth' });
    }
    
    // Deduplicate by ID
    return recs.filter((v,i,a)=>a.findIndex(v2=>(v2.id===v.id))===i);
  }, [selections, step, lang]);

  if (step === 'analyzing') {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gray-50">
        <div className="relative mb-8">
           <div className="w-24 h-24 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-full animate-pulse flex items-center justify-center shadow-xl shadow-purple-200">
             <ScanLine className="w-10 h-10 text-white animate-bounce" />
           </div>
           <div className="absolute inset-0 border-4 border-purple-200 rounded-full animate-ping"></div>
        </div>
        <h2 className="text-xl font-bold text-gray-800">{t.analyzing}</h2>
        <p className="text-gray-500 mt-2 text-sm">AI engine is matching products...</p>
      </div>
    );
  }

  if (step === 'result') {
    return (
      <div className="pb-20 bg-gray-50 min-h-screen">
        <div className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white p-6 pb-12 rounded-b-[40px] shadow-lg">
          <div className="flex justify-between items-start mb-4">
             <button onClick={reset} className="text-white/80 hover:text-white flex items-center text-sm bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
               <RefreshCcw className="w-3 h-3 mr-1" /> {t.reanalyze}
             </button>
             <Sparkles className="w-6 h-6 text-yellow-300" />
          </div>
          <h1 className="text-2xl font-bold mb-2">{t.yourProfile}</h1>
          <div className="flex space-x-4 mt-4">
             <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 flex-1 text-center border border-white/20">
               <div className="text-2xl mb-1">{SHAPE_OPTIONS.eyebrow.find(o => o.id === selections.eyebrow)?.icon}</div>
               <div className="text-xs opacity-80">{t.eyebrowShape}</div>
             </div>
             <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 flex-1 text-center border border-white/20">
               <div className="text-2xl mb-1">{SHAPE_OPTIONS.lip.find(o => o.id === selections.lip)?.icon}</div>
               <div className="text-xs opacity-80">{t.lipShape}</div>
             </div>
             <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 flex-1 text-center border border-white/20">
               <div className="text-2xl mb-1">{SHAPE_OPTIONS.nose.find(o => o.id === selections.nose)?.icon}</div>
               <div className="text-xs opacity-80">{t.noseShape}</div>
             </div>
          </div>
        </div>

        <div className="px-4 -mt-6">
           <div className="bg-white rounded-2xl shadow-lg p-5 mb-6">
              <h3 className="font-bold text-gray-800 mb-2">{t.beautyConsultant} says:</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {t.basedOnProfile}. We focused on balancing your features to create a harmonious look.
              </p>
           </div>
        
           <h3 className="font-bold text-lg text-gray-800 mb-4 px-1">{t.recommendedForYou}</h3>
           
           <div className="space-y-4">
              {recommendedProducts.map((item) => (
                <Link key={item.id} to={`/product/${item.id}`} className="block bg-white rounded-xl shadow-sm overflow-hidden group hover:shadow-md transition-all">
                  <div className="flex">
                    <div className="w-32 h-32 flex-shrink-0 relative">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      <div className="absolute top-0 left-0 bg-purple-600 text-white text-[10px] px-2 py-0.5 rounded-br-lg font-bold">
                        98% Match
                      </div>
                    </div>
                    <div className="p-3 flex flex-col justify-between flex-1">
                      <div>
                        <h4 className="text-sm font-bold text-gray-900 line-clamp-1">{item.title}</h4>
                        <p className="text-xs text-purple-600 mt-1 flex items-center bg-purple-50 self-start px-2 py-1 rounded">
                           <Sparkles className="w-3 h-3 mr-1" />
                           {item.reason}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                         <span className="text-lg font-bold text-gray-900">{t.priceSymbol}{item.price}</span>
                         <span className="bg-gray-900 text-white text-xs px-3 py-1.5 rounded-full flex items-center group-hover:bg-purple-600 transition-colors">
                           {t.buyNow} <ArrowRight className="w-3 h-3 ml-1" />
                         </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="bg-white p-6 shadow-sm mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{t.beautyConsultant}</h1>
        <p className="text-gray-500 text-sm mt-1">{t.consultantDesc}</p>
      </div>

      <div className="px-4 space-y-8">
        {/* Eyebrow Selection */}
        <section>
          <div className="flex items-center mb-4">
             <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-900 text-white text-xs font-bold mr-2">1</span>
             <h3 className="font-bold text-gray-800">{t.eyebrowShape}</h3>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {SHAPE_OPTIONS.eyebrow.map(opt => (
              <button
                key={opt.id}
                onClick={() => handleSelect('eyebrow', opt.id)}
                className={`p-4 rounded-xl border transition-all flex flex-col items-center justify-center aspect-square ${
                  selections.eyebrow === opt.id
                    ? 'border-purple-600 bg-purple-50 text-purple-700 ring-2 ring-purple-600 ring-offset-1'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-purple-200 hover:bg-gray-50 shadow-sm'
                }`}
              >
                <span className="text-3xl mb-2">{opt.icon}</span>
                <span className="text-xs font-medium">{opt.name[lang]}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Lip Selection */}
        <section>
          <div className="flex items-center mb-4">
             <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-900 text-white text-xs font-bold mr-2">2</span>
             <h3 className="font-bold text-gray-800">{t.lipShape}</h3>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {SHAPE_OPTIONS.lip.map(opt => (
              <button
                key={opt.id}
                onClick={() => handleSelect('lip', opt.id)}
                className={`p-4 rounded-xl border transition-all flex flex-col items-center justify-center aspect-square ${
                  selections.lip === opt.id
                    ? 'border-purple-600 bg-purple-50 text-purple-700 ring-2 ring-purple-600 ring-offset-1'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-purple-200 hover:bg-gray-50 shadow-sm'
                }`}
              >
                <span className="text-3xl mb-2">{opt.icon}</span>
                <span className="text-xs font-medium">{opt.name[lang]}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Nose Selection */}
        <section>
          <div className="flex items-center mb-4">
             <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-900 text-white text-xs font-bold mr-2">3</span>
             <h3 className="font-bold text-gray-800">{t.noseShape}</h3>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {SHAPE_OPTIONS.nose.map(opt => (
              <button
                key={opt.id}
                onClick={() => handleSelect('nose', opt.id)}
                className={`p-4 rounded-xl border transition-all flex flex-col items-center justify-center aspect-square ${
                  selections.nose === opt.id
                    ? 'border-purple-600 bg-purple-50 text-purple-700 ring-2 ring-purple-600 ring-offset-1'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-purple-200 hover:bg-gray-50 shadow-sm'
                }`}
              >
                <span className="text-3xl mb-2">{opt.icon}</span>
                <span className="text-xs font-medium">{opt.name[lang]}</span>
              </button>
            ))}
          </div>
        </section>

        <button
          onClick={startAnalysis}
          disabled={!isFormComplete}
          className={`w-full py-4 rounded-full font-bold text-white shadow-xl transition-all flex items-center justify-center mb-8 ${
            !isFormComplete
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-gradient-to-r from-gray-900 to-gray-700 hover:scale-[1.02] hover:shadow-2xl'
          }`}
        >
          <Sparkles className="w-5 h-5 mr-2" />
          {t.startAnalysis}
        </button>
      </div>
    </div>
  );
};

export default MakeupRecommendation;
