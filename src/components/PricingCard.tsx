import React from 'react';
import { Check } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface PricingCardProps {
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  isAnnual: boolean;
  maxSites: number;
  features: string[];
  isPopular?: boolean;
  onPurchase: (plan: string, price: string) => void;
}

export function PricingCard({
  name,
  description,
  monthlyPrice,
  annualPrice,
  isAnnual,
  maxSites,
  features,
  isPopular = false,
  onPurchase
}: PricingCardProps) {
  const { user } = useAuth();
  const currentPrice = isAnnual ? annualPrice : monthlyPrice;
  const billing = isAnnual ? 'anual' : 'mensal';

  const handlePurchase = async () => {
    const priceText = `R$ ${currentPrice.toFixed(2).replace('.', ',')}/${billing}`;
    await onPurchase(name, priceText);
  };

  return (
    <div className={`relative bg-white rounded-2xl shadow-xl p-8 ${
      isPopular ? 'ring-2 ring-[#00e676] transform scale-105' : ''
    }`}>
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-[#00e676] text-white px-4 py-2 rounded-full text-sm font-medium">
            Mais Popular
          </span>
        </div>
      )}
      
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-[#1a237e] mb-2">{name}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex items-center justify-center">
          <span className="text-4xl font-bold text-[#1a237e]">
            R$ {currentPrice.toFixed(2).replace('.', ',')}
          </span>
          <span className="text-gray-600 ml-2">/{billing}</span>
        </div>
        {isAnnual && (
          <p className="text-[#00e676] text-sm mt-2">
            Economia de R$ {(monthlyPrice - annualPrice).toFixed(2).replace('.', ',')} por mês
          </p>
        )}
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-center mb-4">
          <span className="text-lg font-semibold text-gray-700">
            Até {maxSites} sites
          </span>
        </div>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <Check className="h-5 w-5 text-[#00e676] mr-3 flex-shrink-0" />
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={handlePurchase}
        className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
          isPopular
            ? 'bg-[#00e676] text-white hover:bg-[#00e676]/90'
            : 'bg-[#1a237e] text-white hover:bg-[#1a237e]/90'
        }`}
      >
        {user ? 'Contratar Agora' : 'Contratar Agora'}
      </button>
    </div>
  );
}