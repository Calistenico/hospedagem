import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Server, Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export function Header({ isMobileMenuOpen, setIsMobileMenuOpen }: HeaderProps) {
  const location = useLocation();
  const { user, logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/planos', label: 'Planos' },
    { path: '/sobre', label: 'Sobre Nós' },
    { path: '/contato', label: 'Contato' },
  ];

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="relative">
              <Server className="h-8 w-8 text-[#1a237e]" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#00e676] rounded-full"></div>
            </div>
            <span className="text-2xl font-bold text-[#1a237e]">VyntrixHost</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-medium transition-colors ${
                  isActive(item.path)
                    ? 'text-[#00e676] border-b-2 border-[#00e676] pb-1'
                    : 'text-gray-700 hover:text-[#00e676]'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  to={user.isAdmin ? "/admin" : "/cliente"}
                  className="flex items-center space-x-2 px-4 py-2 bg-[#1a237e] text-white rounded-lg hover:bg-[#1a237e]/90 transition-colors"
                >
                  <User className="h-4 w-4" />
                  <span>{user.isAdmin ? 'Admin' : 'Painel'}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sair</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="px-6 py-2 border border-[#1a237e] text-[#1a237e] rounded-lg hover:bg-[#1a237e] hover:text-white transition-colors"
                >
                  Entrar
                </Link>
                <Link
                  to="/cadastro"
                  className="px-6 py-2 bg-[#00e676] text-white rounded-lg hover:bg-[#00e676]/90 transition-colors"
                >
                  Cadastrar
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`font-medium transition-colors ${
                    isActive(item.path)
                      ? 'text-[#00e676]'
                      : 'text-gray-700 hover:text-[#00e676]'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              {user ? (
                <div className="flex flex-col space-y-2 pt-4 border-t">
                  <Link
                    to={user.isAdmin ? "/admin" : "/cliente"}
                    className="flex items-center space-x-2 px-4 py-2 bg-[#1a237e] text-white rounded-lg hover:bg-[#1a237e]/90 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="h-4 w-4" />
                    <span>{user.isAdmin ? 'Admin' : 'Painel'}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sair</span>
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2 pt-4 border-t">
                  <Link
                    to="/login"
                    className="px-4 py-2 border border-[#1a237e] text-[#1a237e] rounded-lg hover:bg-[#1a237e] hover:text-white transition-colors text-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Entrar
                  </Link>
                  <Link
                    to="/cadastro"
                    className="px-4 py-2 bg-[#00e676] text-white rounded-lg hover:bg-[#00e676]/90 transition-colors text-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Cadastrar
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}