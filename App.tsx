
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { Layout } from './components/Layout';
import Login from './pages/Login';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import AITryOn from './pages/AITryOn';
import MakeupRecommendation from './pages/MakeupRecommendation';

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const AppContent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/" element={
          <ProtectedRoute>
            <Layout>
              <Shop />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/product/:id" element={
          <ProtectedRoute>
             <ProductDetail />
          </ProtectedRoute>
        } />

        <Route path="/try-on" element={
          <ProtectedRoute>
            <Layout>
              <AITryOn />
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="/recommendation" element={
          <ProtectedRoute>
            <Layout>
              <MakeupRecommendation />
            </Layout>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
};

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
