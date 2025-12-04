import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { AI_STYLES } from '../constants';
import { Upload, Wand2, RefreshCw, ArrowRight } from 'lucide-react';

const AITryOn = () => {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
        setResultImage(null); // Reset result when new image loaded
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleGenerate = () => {
    if (!selectedImage || !selectedStyle) return;

    setIsGenerating(true);
    // Mock AI Processing Time
    setTimeout(() => {
      setIsGenerating(false);
      // In a real app, this would be the response from Gemini
      setResultImage(`https://picsum.photos/500/500?random=${Date.now()}`);
    }, 2500);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg min-h-[80vh] flex flex-col md:flex-row overflow-hidden">
      
      {/* Control Panel */}
      <div className="w-full md:w-1/3 bg-gray-50 p-6 border-r border-gray-100 flex flex-col">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <Wand2 className="mr-2 text-purple-600" /> 
          {t.aiTryOn}
        </h2>

        {/* 1. Upload */}
        <div className="mb-8">
          <label className="block text-sm font-bold text-gray-700 mb-2">1. {t.uploadImage}</label>
          <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 hover:bg-gray-100 transition-colors text-center cursor-pointer">
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileChange} 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="flex flex-col items-center">
              <Upload className="w-8 h-8 text-gray-400 mb-2" />
              <span className="text-sm text-gray-500">{selectedImage ? 'Change Photo' : 'Click to upload'}</span>
            </div>
          </div>
        </div>

        {/* 2. Select Style */}
        <div className="mb-8 flex-1">
          <label className="block text-sm font-bold text-gray-700 mb-2">2. {t.selectStyle}</label>
          <div className="space-y-2">
            {AI_STYLES.map((style) => (
              <button
                key={style.id}
                onClick={() => setSelectedStyle(style.id)}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center justify-between border transition-all ${
                  selectedStyle === style.id 
                    ? 'border-purple-500 bg-purple-50 ring-1 ring-purple-500' 
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="flex items-center">
                   <div className={`w-6 h-6 rounded-full mr-3 ${style.color}`}></div>
                   <span className="text-sm font-medium">{style.name}</span>
                </div>
                {selectedStyle === style.id && <div className="w-2 h-2 rounded-full bg-purple-500"></div>}
              </button>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={!selectedImage || !selectedStyle || isGenerating}
          className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all flex items-center justify-center ${
            !selectedImage || !selectedStyle || isGenerating
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-[1.02]'
          }`}
        >
          {isGenerating ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin mr-2" />
              {t.generating}
            </>
          ) : (
            <>
              <Wand2 className="w-5 h-5 mr-2" />
              {t.generate}
            </>
          )}
        </button>
      </div>

      {/* Preview Area */}
      <div className="w-full md:w-2/3 bg-gray-900 p-6 flex flex-col items-center justify-center relative min-h-[400px]">
         
         {!selectedImage && !resultImage && (
           <div className="text-gray-500 flex flex-col items-center">
             <Wand2 className="w-16 h-16 opacity-20 mb-4" />
             <p>{t.tryOnDesc}</p>
           </div>
         )}

         {/* Display logic */}
         <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full h-full max-w-4xl">
            {/* Original */}
            {selectedImage && (
              <div className={`relative rounded-lg overflow-hidden border-4 border-white/10 shadow-2xl transition-all duration-500 ${resultImage ? 'w-1/2' : 'w-full max-w-md'}`}>
                 <img src={selectedImage} alt="Original" className="w-full h-full object-cover" />
                 <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-2 text-center backdrop-blur-sm">Original</div>
              </div>
            )}

            {/* Arrow */}
            {resultImage && selectedImage && (
               <ArrowRight className="text-white/50 w-8 h-8 hidden md:block" />
            )}

            {/* Result */}
            {resultImage && (
               <div className="relative rounded-lg overflow-hidden border-4 border-purple-500/50 shadow-2xl shadow-purple-900/50 w-1/2 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <img src={resultImage} alt="Result" className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2 bg-purple-600 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                    AI Generated
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-purple-900/90 to-transparent text-white text-xs p-2 pt-6 text-center">
                    {t.result}
                  </div>
               </div>
            )}
         </div>

         {/* Loading Overlay inside preview */}
         {isGenerating && (
           <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10 flex flex-col items-center justify-center text-white">
             <div className="relative">
               <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
               <div className="absolute inset-0 flex items-center justify-center">
                 <Wand2 className="w-6 h-6 text-purple-300" />
               </div>
             </div>
             <p className="mt-4 font-light tracking-widest animate-pulse">{t.generating}</p>
           </div>
         )}
      </div>
    </div>
  );
};

export default AITryOn;