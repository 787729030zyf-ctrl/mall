
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Globe, Home, Camera, Sparkles } from 'lucide-react';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { t, toggleLang, lang } = useLanguage();
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col bg-taobao-bg pb-16 md:pb-0">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-14 items-center">
            {/* Logo */}
            <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
              <div className="bg-taobao-primary text-white p-1 rounded font-bold mr-2">Tao</div>
              <span className="font-bold text-xl text-taobao-primary">AI Mall</span>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={toggleLang} 
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-full flex items-center text-sm"
              >
                <Globe className="w-4 h-4 mr-1" />
                {lang === 'zh' ? 'EN' : '中文'}
              </button>
              
              {user ? (
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-700 hidden md:block">{t.username}: {user.username}</span>
                  <button onClick={logout} className="text-sm text-gray-500 hover:text-taobao-primary">
                    {t.logout}
                  </button>
                </div>
              ) : (
                <Link to="/login" className="text-sm text-taobao-primary font-medium">
                  {t.signIn}
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4">
        {children}
      </main>

      {/* Mobile Bottom Tab Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2 pb-safe z-50">
        <Link to="/" className={`flex flex-col items-center p-2 ${isActive('/') ? 'text-taobao-primary' : 'text-gray-500'}`}>
          <Home className="w-6 h-6" />
          <span className="text-xs mt-1">{t.home}</span>
        </Link>
        <Link to="/recommendation" className={`flex flex-col items-center p-2 ${isActive('/recommendation') ? 'text-taobao-primary' : 'text-gray-500'}`}>
          <Sparkles className="w-6 h-6" />
          <span className="text-xs mt-1">{t.makeupRec}</span>
        </Link>
        <Link to="/try-on" className={`flex flex-col items-center p-2 ${isActive('/try-on') ? 'text-taobao-primary' : 'text-gray-500'}`}>
          <Camera className="w-6 h-6" />
          <span className="text-xs mt-1">{t.aiTryOn}</span>
        </Link>
        <div className="flex flex-col items-center p-2 text-gray-500">
          <User className="w-6 h-6" />
          <span className="text-xs mt-1">Me</span>
        </div>
      </div>
    </div>
  );
};
