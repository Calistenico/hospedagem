import React from 'react';
import { Link } from 'react-router-dom';
import { Server, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#1a237e] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative">
                <Server className="h-8 w-8 text-white" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#00e676] rounded-full"></div>
              </div>
              <span className="text-2xl font-bold">VyntrixHost</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Hospedagem de sites rápida e confiável que impulsiona seu negócio. 
              Oferecemos soluções completas com suporte 24/7 e a melhor tecnologia do mercado.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-[#00e676] transition-colors">
                <span className="sr-only">Facebook</span>
                <div className="w-6 h-6 bg-gray-300 hover:bg-[#00e676] rounded transition-colors"></div>
              </a>
              <a href="#" className="text-gray-300 hover:text-[#00e676] transition-colors">
                <span className="sr-only">Twitter</span>
                <div className="w-6 h-6 bg-gray-300 hover:bg-[#00e676] rounded transition-colors"></div>
              </a>
              <a href="#" className="text-gray-300 hover:text-[#00e676] transition-colors">
                <span className="sr-only">Instagram</span>
                <div className="w-6 h-6 bg-gray-300 hover:bg-[#00e676] rounded transition-colors"></div>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-[#00e676] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/planos" className="text-gray-300 hover:text-[#00e676] transition-colors">
                  Planos
                </Link>
              </li>
              <li>
                <Link to="/sobre" className="text-gray-300 hover:text-[#00e676] transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link to="/contato" className="text-gray-300 hover:text-[#00e676] transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-[#00e676]" />
                <span className="text-gray-300">suporte@vyntrixhost.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-[#00e676]" />
                <span className="text-gray-300">(11) 9999-9999</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-[#00e676]" />
                <span className="text-gray-300">São Paulo, SP</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-300">
            © 2025 VyntrixHost. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}