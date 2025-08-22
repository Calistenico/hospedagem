import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Server, Shield, Clock, Headphones, ArrowRight, Zap, Globe, Lock } from 'lucide-react';
import { PricingCard } from '../components/PricingCard';
import { useAuth } from '../contexts/AuthContext';

export function Home() {
  const [isAnnual, setIsAnnual] = useState(false);
  const { user, purchasePlan } = useAuth();
  const navigate = useNavigate();

  const plans = [
    {
      name: 'Bronze',
      description: 'Ideal para começar',
      monthlyPrice: 20.00,
      annualPrice: 15.00,
      maxSites: 10,
      features: [
        'Até 10 sites',
        'SSL grátis',
        'Backups diários',
        'Suporte por email',
        '10GB de armazenamento',
        'Largura de banda ilimitada'
      ]
    },
    {
      name: 'Prata',
      description: 'Perfeito para crescer',
      monthlyPrice: 30.00,
      annualPrice: 25.00,
      maxSites: 50,
      features: [
        'Até 50 sites',
        'SSL grátis',
        'Backups diários',
        'Suporte prioritário',
        '50GB de armazenamento',
        'Largura de banda ilimitada',
        'CDN grátis'
      ],
      isPopular: true
    },
    {
      name: 'Ouro',
      description: 'Para projetos robustos',
      monthlyPrice: 39.90,
      annualPrice: 34.90,
      maxSites: 100,
      features: [
        'Até 100 sites',
        'SSL grátis',
        'Backups diários',
        'Suporte 24/7',
        '100GB de armazenamento',
        'Largura de banda ilimitada',
        'CDN grátis',
        'Staging grátis'
      ]
    }
  ];

  const handlePurchase = (plan: string, price: string) => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    purchasePlan(plan, price);
    navigate('/cliente');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#1a237e] to-[#1a237e]/90 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Hospedagem de Sites Rápida e 
            <span className="text-[#00e676]"> Confiável</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Planos flexíveis com a velocidade que você precisa e o suporte que você merece
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="#planos"
              className="inline-flex items-center px-8 py-4 bg-[#00e676] text-white rounded-lg hover:bg-[#00e676]/90 transition-colors font-semibold"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Ver Planos <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/sobre"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-[#1a237e] transition-colors font-semibold"
            >
              Saiba Mais
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a237e] mb-4">
              Por que escolher a VyntrixHost?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Oferecemos a melhor infraestrutura e suporte para garantir que seu site esteja sempre online
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-[#00e676]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="h-8 w-8 text-[#00e676]" />
              </div>
              <h3 className="text-xl font-semibold text-[#1a237e] mb-2">Suporte 24/7</h3>
              <p className="text-gray-600">
                Nossa equipe especializada está sempre disponível para ajudar você
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-[#00e676]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="h-8 w-8 text-[#00e676]" />
              </div>
              <h3 className="text-xl font-semibold text-[#1a237e] mb-2">SSL Grátis</h3>
              <p className="text-gray-600">
                Certificados SSL inclusos para manter seu site seguro
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-[#00e676]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-[#00e676]" />
              </div>
              <h3 className="text-xl font-semibold text-[#1a237e] mb-2">Backups Diários</h3>
              <p className="text-gray-600">
                Seus dados protegidos com backups automáticos todos os dias
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-[#00e676]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-[#00e676]" />
              </div>
              <h3 className="text-xl font-semibold text-[#1a237e] mb-2">Instalador com 1 Clique</h3>
              <p className="text-gray-600">
                Instale WordPress, Joomla e outros sistemas facilmente
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="planos" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a237e] mb-4">
              Escolha o Plano Ideal
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Planos flexíveis para todos os tipos de projetos
            </p>
            
            {/* Billing Toggle */}
            <div className="flex items-center justify-center space-x-4 mb-12">
              <span className={`font-medium ${!isAnnual ? 'text-[#1a237e]' : 'text-gray-500'}`}>
                Mensal
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isAnnual ? 'bg-[#00e676]' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isAnnual ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`font-medium ${isAnnual ? 'text-[#1a237e]' : 'text-gray-500'}`}>
                Anual
                <span className="ml-2 text-sm bg-[#00e676] text-white px-2 py-1 rounded-full">
                  Economize até R$ 5
                </span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <PricingCard
                key={index}
                name={plan.name}
                description={plan.description}
                monthlyPrice={plan.monthlyPrice}
                annualPrice={plan.annualPrice}
                isAnnual={isAnnual}
                maxSites={plan.maxSites}
                features={plan.features}
                isPopular={plan.isPopular}
                onPurchase={handlePurchase}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#1a237e] text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Pronto para começar?
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            Junte-se a milhares de clientes que confiam na VyntrixHost
          </p>
          <Link
            to={user ? '/cliente' : '/cadastro'}
            className="inline-flex items-center px-8 py-4 bg-[#00e676] text-white rounded-lg hover:bg-[#00e676]/90 transition-colors font-semibold text-lg"
          >
            {user ? 'Acessar Painel' : 'Começar Agora'}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}