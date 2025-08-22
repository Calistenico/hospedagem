import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PricingCard } from '../components/PricingCard';
import { useAuth } from '../contexts/AuthContext';
import { Check, X } from 'lucide-react';

export function Plans() {
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
      features: {
        storage: '10GB',
        bandwidth: 'Ilimitada',
        domains: '1 domínio',
        ssl: true,
        backups: true,
        support: 'Email',
        installer: true,
        cdn: false,
        staging: false
      }
    },
    {
      name: 'Prata',
      description: 'Perfeito para crescer',
      monthlyPrice: 30.00,
      annualPrice: 25.00,
      maxSites: 50,
      features: {
        storage: '50GB',
        bandwidth: 'Ilimitada',
        domains: '5 domínios',
        ssl: true,
        backups: true,
        support: 'Prioritário',
        installer: true,
        cdn: true,
        staging: false
      },
      isPopular: true
    },
    {
      name: 'Ouro',
      description: 'Para projetos robustos',
      monthlyPrice: 39.90,
      annualPrice: 34.90,
      maxSites: 100,
      features: {
        storage: '100GB',
        bandwidth: 'Ilimitada',
        domains: 'Ilimitados',
        ssl: true,
        backups: true,
        support: '24/7',
        installer: true,
        cdn: true,
        staging: true
      }
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

  const allFeatures = [
    { key: 'sites', name: 'Sites inclusos' },
    { key: 'storage', name: 'Armazenamento SSD' },
    { key: 'bandwidth', name: 'Largura de banda' },
    { key: 'domains', name: 'Domínios inclusos' },
    { key: 'ssl', name: 'Certificado SSL' },
    { key: 'backups', name: 'Backups diários' },
    { key: 'support', name: 'Suporte técnico' },
    { key: 'installer', name: 'Instalador 1-clique' },
    { key: 'cdn', name: 'CDN global' },
    { key: 'staging', name: 'Ambiente de teste' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-[#1a237e] to-[#1a237e]/90 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Planos de <span className="text-[#00e676]">Hospedagem</span>
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Escolha o plano ideal para seu projeto. Todos incluem recursos essenciais 
            para manter seu site online com máxima performance.
          </p>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-16">
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, index) => (
              <PricingCard
                key={index}
                name={plan.name}
                description={plan.description}
                monthlyPrice={plan.monthlyPrice}
                annualPrice={plan.annualPrice}
                isAnnual={isAnnual}
                maxSites={plan.maxSites}
                features={[
                  `Até ${plan.maxSites} sites`,
                  `${plan.features.storage} de armazenamento`,
                  `Largura de banda ${plan.features.bandwidth.toLowerCase()}`,
                  plan.features.domains,
                  'SSL grátis',
                  'Backups diários',
                  `Suporte ${plan.features.support.toLowerCase()}`,
                  'Instalador com 1 clique'
                ]}
                isPopular={plan.isPopular}
                onPurchase={handlePurchase}
              />
            ))}
          </div>

          {/* Feature Comparison */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-[#1a237e] text-white py-6 px-8">
              <h3 className="text-2xl font-bold">Comparação Detalhada dos Planos</h3>
              <p className="text-gray-200 mt-2">
                Veja todos os recursos inclusos em cada plano
              </p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-4 px-8 font-semibold text-[#1a237e]">Recursos</th>
                    {plans.map((plan) => (
                      <th key={plan.name} className="text-center py-4 px-6 font-semibold text-[#1a237e]">
                        {plan.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {allFeatures.map((feature, index) => (
                    <tr key={feature.key} className={index % 2 === 0 ? 'bg-gray-25' : 'bg-white'}>
                      <td className="py-4 px-8 font-medium text-gray-900">
                        {feature.name}
                      </td>
                      {plans.map((plan) => (
                        <td key={plan.name} className="text-center py-4 px-6">
                          {feature.key === 'sites' ? (
                            <span className="text-[#1a237e] font-semibold">
                              {plan.maxSites}
                            </span>
                          ) : typeof plan.features[feature.key as keyof typeof plan.features] === 'boolean' ? (
                            plan.features[feature.key as keyof typeof plan.features] ? (
                              <Check className="h-5 w-5 text-[#00e676] mx-auto" />
                            ) : (
                              <X className="h-5 w-5 text-gray-400 mx-auto" />
                            )
                          ) : (
                            <span className="text-gray-700">
                              {plan.features[feature.key as keyof typeof plan.features]}
                            </span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}