import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Header } from './components/Layout/Header';
import { Footer } from './components/Layout/Footer';
import { Home } from './pages/Home';
import { Plans } from './pages/Plans';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ClientDashboard } from './pages/ClientDashboard';
import { AdminDashboard } from './pages/AdminDashboard';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header 
            isMobileMenuOpen={isMobileMenuOpen} 
            setIsMobileMenuOpen={setIsMobileMenuOpen} 
          />
          
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/planos" element={<Plans />} />
              <Route path="/sobre" element={<About />} />
              <Route path="/contato" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cadastro" element={<Register />} />
              <Route path="/cliente" element={<ClientDashboard />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </main>
          
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;