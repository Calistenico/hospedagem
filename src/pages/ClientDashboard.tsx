import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Server, User, CreditCard, Settings, AlertCircle, CheckCircle, Clock, Package } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { PricingCard } from '../components/PricingCard';
import { AffiliateSection } from '../components/AffiliateSection';

export function ClientDashboard() {
  const { user, purchasePlan } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  if (!user) {
    navigate('/login');
    return null;
  }

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

  const handlePurchase = async (plan: string, price: string) => {
    await purchasePlan(plan, price);
    window.location.reload(); // Refresh to show updated status
  };

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            <CheckCircle className="h-4 w-4 mr-1" />
            Ativo
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
            <Clock className="h-4 w-4 mr-1" />
            Pendente
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
            <AlertCircle className="h-4 w-4 mr-1" />
            Nenhum plano
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-[#00e676]/10 p-3 rounded-full">
                <User className="h-8 w-8 text-[#00e676]" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#1a237e]">
                  Bem-vindo, {user.name}!
                </h1>
                <p className="text-gray-600">Gerencie sua hospedagem e serviços</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Status do Plano</p>
              {getStatusBadge(user.planStatus)}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-[#00e676] text-[#00e676]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Visão Geral
              </button>
              <button
                onClick={() => setActiveTab('affiliate')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'affiliate'
                    ? 'border-[#00e676] text-[#00e676]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Programa de Afiliados
              </button>
            </nav>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Account Overview */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-[#1a237e] mb-6">Visão Geral da Conta</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-gray-900">Informações Pessoais</h3>
                    <Settings className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Nome:</span> {user.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Email:</span> {user.email}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">ID do Cliente:</span> {user.id}
                    </p>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-gray-900">Plano Atual</h3>
                    <Package className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Plano:</span> {user.plan && user.plan !== 'none' ? user.plan : 'Nenhum plano ativo'}
                    </p>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600 font-medium">Status:</span>
                      {getStatusBadge(user.planStatus)}
                    </div>
                    {user.planStatus === 'pending' && (
                      <p className="text-sm text-yellow-600">
                        Seu pedido está sendo processado. Você receberá os dados de acesso em breve.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Current Plan Status */}
            {user.planStatus === 'active' && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold text-[#1a237e] mb-6">Meus Serviços</h2>
                
                <div className="border border-green-200 bg-green-50 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="bg-green-100 p-2 rounded-full">
                        <Server className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-green-800">
                          Plano {user.plan} - Ativo
                        </h3>
                        <p className="text-green-600">Seu serviço está funcionando perfeitamente</p>
                      </div>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-800">100%</p>
                      <p className="text-sm text-green-600">Uptime</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-800">24/7</p>
                      <p className="text-sm text-green-600">Suporte</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-800">SSL</p>
                      <p className="text-sm text-green-600">Certificado</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* If no active plan, show available plans */}
            {(!user.plan || user.plan === 'none' || user.planStatus === 'inactive') && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold text-[#1a237e] mb-6">Escolha seu Plano</h2>
                <p className="text-gray-600 mb-8">
                  Selecione o plano ideal para suas necessidades e comece a hospedar seus sites hoje mesmo.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {plans.map((plan, index) => (
                    <PricingCard
                      key={index}
                      name={plan.name}
                      description={plan.description}
                      monthlyPrice={plan.monthlyPrice}
                      annualPrice={plan.annualPrice}
                      isAnnual={false}
                      maxSites={plan.maxSites}
                      features={plan.features}
                      isPopular={plan.isPopular}
                      onPurchase={handlePurchase}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-[#1a237e] mb-4">Ações Rápidas</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 px-4 py-3 bg-[#00e676]/10 text-[#00e676] rounded-lg hover:bg-[#00e676]/20 transition-colors">
                  <CreditCard className="h-5 w-5" />
                  <span>Ver Faturas</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-4 py-3 bg-[#1a237e]/10 text-[#1a237e] rounded-lg hover:bg-[#1a237e]/20 transition-colors">
                  <Settings className="h-5 w-5" />
                  <span>Configurações</span>
                </button>
              </div>
            </div>

            {/* Support */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-[#1a237e] mb-4">Precisa de Ajuda?</h3>
              <p className="text-gray-600 text-sm mb-4">
                Nossa equipe de suporte está sempre disponível para ajudar você.
              </p>
              <button 
                onClick={() => navigate('/contato')}
                className="w-full px-4 py-2 bg-[#00e676] text-white rounded-lg hover:bg-[#00e676]/90 transition-colors"
              >
                Entrar em Contato
              </button>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-[#1a237e] mb-4">Atividade Recente</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">Conta criada com sucesso</span>
                </div>
                {user.plan && user.plan !== 'none' && (
                  <div className="flex items-center space-x-3 text-sm">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-600">Plano {user.plan} solicitado</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        )}

        {activeTab === 'affiliate' && (
          <div className="max-w-6xl mx-auto">
            <AffiliateSection />
          </div>
        )}
      </div>
    </div>
  );
}