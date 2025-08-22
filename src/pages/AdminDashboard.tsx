import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Package, Settings, CheckCircle, Clock, Mail, User, CreditCard, DollarSign, TrendingUp } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { AffiliateService, AffiliateConversion, WithdrawalRequest } from '../services/affiliateService';

export function AdminDashboard() {
  const { user, users, orders, completeOrder, paymentSettings, updatePaymentSettings } = useAuth();
  const [activeTab, setActiveTab] = useState('users');
  const [hostingDetails, setHostingDetails] = useState<{[key: string]: any}>({});
  const [tempPaymentSettings, setTempPaymentSettings] = useState(paymentSettings);
  const [affiliateConversions, setAffiliateConversions] = useState<AffiliateConversion[]>([]);
  const [withdrawalRequests, setWithdrawalRequests] = useState<WithdrawalRequest[]>([]);
  const navigate = useNavigate();

  if (!user?.isAdmin) {
    navigate('/');
    return null;
  }

  React.useEffect(() => {
    // Carregar dados de afiliados
    setAffiliateConversions(AffiliateService.getStoredConversions());
    setWithdrawalRequests(AffiliateService.getStoredWithdrawals());
  }, []);

  React.useEffect(() => {
    setTempPaymentSettings(paymentSettings);
  }, [paymentSettings]);

  const pendingOrders = orders.filter(order => order.status === 'pending');
  const paidOrders = orders.filter(order => order.status === 'paid');
  const completedOrders = orders.filter(order => order.status === 'completed');
  const totalUsers = users.filter(u => !u.isAdmin).length;
  const pendingWithdrawals = withdrawalRequests.filter(w => w.status === 'pending');
  const totalCommissionsPaid = affiliateConversions.reduce((sum, c) => sum + c.commission, 0);

  const handleCompleteOrder = (orderId: string) => {
    const details = hostingDetails[orderId];
    if (details && details.login && details.password && details.cpanelUrl) {
      completeOrder(orderId, details);
      setHostingDetails(prev => {
        const newDetails = { ...prev };
        delete newDetails[orderId];
        return newDetails;
      });
    }
  };

  const handlePayWithdrawal = (withdrawalId: string) => {
    AffiliateService.updateWithdrawalStatus(withdrawalId, 'paid');
    setWithdrawalRequests(AffiliateService.getStoredWithdrawals());
  };

  const handleSavePaymentSettings = () => {
    updatePaymentSettings(tempPaymentSettings);
    alert('Configurações salvas com sucesso!');
  };

  const updateHostingDetails = (orderId: string, field: string, value: string) => {
    setHostingDetails(prev => ({
      ...prev,
      [orderId]: {
        ...prev[orderId],
        [field]: value
      }
    }));
  };

  const tabs = [
    { id: 'users', label: 'Usuários', icon: Users },
    { id: 'orders', label: 'Pedidos', icon: Package },
    { id: 'affiliates', label: 'Afiliados', icon: TrendingUp },
    { id: 'withdrawals', label: 'Saques', icon: DollarSign },
    { id: 'settings', label: 'Configurações', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#1a237e] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-[#00e676] p-3 rounded-full">
                <Settings className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Painel de Administração</h1>
                <p className="text-gray-200">Gerencie usuários, pedidos e configurações</p>
              </div>
            </div>
          </div>
        </div>
      </div>

            <div className="w-20 h-20 bg-[#00e676] rounded-full mx-auto mb-4 flex items-center justify-center">
              <DollarSign className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Saques Pendentes</h3>
            <p className="text-gray-200">
              {pendingWithdrawals.length} solicitações pendentes
            </p>
          </div>
          
          <div className="bg-white/10 rounded-xl p-8 backdrop-blur-sm">
            <div className="w-20 h-20 bg-[#00e676] rounded-full mx-auto mb-4 flex items-center justify-center">
              <TrendingUp className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Total Comissões</h3>
            <p className="text-gray-200">
              R$ {totalCommissionsPaid.toFixed(2).replace('.', ',')}
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Usuários</p>
                <p className="text-3xl font-bold text-[#1a237e]">{totalUsers}</p>
              </div>
              <Users className="h-12 w-12 text-[#00e676]" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pedidos Pendentes</p>
                <p className="text-3xl font-bold text-yellow-600">{pendingOrders.length}</p>
              </div>
              <Clock className="h-12 w-12 text-yellow-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pedidos Pagos</p>
                <p className="text-3xl font-bold text-green-600">{paidOrders.length}</p>
              </div>
              <CreditCard className="h-12 w-12 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pedidos Concluídos</p>
                <p className="text-3xl font-bold text-green-600">{completedOrders.length}</p>
              </div>
              <CheckCircle className="h-12 w-12 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Saques Pendentes</p>
                <p className="text-3xl font-bold text-yellow-600">{pendingWithdrawals.length}</p>
              </div>
              <DollarSign className="h-12 w-12 text-yellow-500" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Pedidos</p>
                <p className="text-3xl font-bold text-[#1a237e]">{orders.length}</p>
              </div>
              <Package className="h-12 w-12 text-[#00e676]" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Comissões Pagas</p>
                <p className="text-3xl font-bold text-[#1a237e]">R$ {totalCommissionsPaid.toFixed(2).replace('.', ',')}</p>
              </div>
              <TrendingUp className="h-12 w-12 text-[#00e676]" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-lg">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-[#00e676] text-[#00e676]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Users Tab */}
            {activeTab === 'users' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-[#1a237e]">Usuários Cadastrados</h2>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Usuário
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Plano
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          ID
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.filter(u => !u.isAdmin).map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="bg-[#00e676]/10 p-2 rounded-full mr-3">
                                <User className="h-5 w-5 text-[#00e676]" />
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{user.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {user.plan && user.plan !== 'none' ? user.plan : 'Nenhum plano'}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              user.planStatus === 'active' 
                                ? 'bg-green-100 text-green-800'
                                : user.planStatus === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {user.planStatus === 'active' ? 'Ativo' : 
                               user.planStatus === 'pending' ? 'Pendente' : 'Inativo'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.id}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-[#1a237e]">Gestão de Pedidos</h2>
                </div>

                {/* Pending Orders */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-[#1a237e] mb-4 flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-yellow-500" />
                    Pedidos Pendentes ({pendingOrders.length})
                  </h3>
                  
                  {pendingOrders.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                      <Package className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>Nenhum pedido pendente</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {pendingOrders.map((order) => (
                        <div key={order.id} className="border border-yellow-200 bg-yellow-50 rounded-lg p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h4 className="text-lg font-semibold text-gray-900">
                                Pedido #{order.id.substring(0, 8)}
                              </h4>
                              <p className="text-gray-600">
                                Cliente: {order.userName} ({order.userEmail})
                              </p>
                              <p className="text-gray-600">
                                Plano: {order.plan} - {order.price}
                              </p>
                              <p className="text-sm text-gray-500">
                                Data: {new Date(order.createdAt).toLocaleDateString('pt-BR')}
                              </p>
                              {order.affiliateId && (
                                <p className="text-sm text-blue-600">
                                  Indicado por afiliado: {users.find(u => u.id === order.affiliateId)?.name}
                                </p>
                              )}
                            </div>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                              <Clock className="h-4 w-4 mr-1" />
                              Pendente
                            </span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Login do cPanel
                              </label>
                              <input
                                type="text"
                                value={hostingDetails[order.id]?.login || ''}
                                onChange={(e) => updateHostingDetails(order.id, 'login', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#00e676] focus:border-[#00e676]"
                                placeholder="username"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Senha do cPanel
                              </label>
                              <input
                                type="text"
                                value={hostingDetails[order.id]?.password || ''}
                                onChange={(e) => updateHostingDetails(order.id, 'password', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#00e676] focus:border-[#00e676]"
                                placeholder="password"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                URL do cPanel
                              </label>
                              <input
                                type="text"
                                value={hostingDetails[order.id]?.cpanelUrl || ''}
                                onChange={(e) => updateHostingDetails(order.id, 'cpanelUrl', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#00e676] focus:border-[#00e676]"
                                placeholder="https://cpanel.exemplo.com"
                              />
                            </div>
                          </div>

                          <button
                            onClick={() => handleCompleteOrder(order.id)}
                            disabled={!hostingDetails[order.id]?.login || !hostingDetails[order.id]?.password || !hostingDetails[order.id]?.cpanelUrl}
                            className="flex items-center px-4 py-2 bg-[#00e676] text-white rounded-lg hover:bg-[#00e676]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Marcar como Concluído
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Paid Orders */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-[#1a237e] mb-4 flex items-center">
                    <CreditCard className="h-5 w-5 mr-2 text-green-500" />
                    Pedidos Pagos - Aguardando Ativação ({paidOrders.length})
                  </h3>
                  
                  {paidOrders.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <p>Nenhum pedido pago aguardando ativação</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {paidOrders.map((order) => (
                        <div key={order.id} className="border border-green-200 bg-green-50 rounded-lg p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h4 className="text-lg font-semibold text-gray-900">
                                Pedido #{order.id.substring(0, 8)}
                              </h4>
                              <p className="text-gray-600">
                                Cliente: {order.userName} ({order.userEmail})
                              </p>
                              <p className="text-gray-600">
                                Plano: {order.plan} - {order.price}
                              </p>
                              <p className="text-sm text-gray-500">
                                Data: {new Date(order.createdAt).toLocaleDateString('pt-BR')}
                              </p>
                              {order.affiliateId && (
                                <p className="text-sm text-blue-600">
                                  Indicado por afiliado: {users.find(u => u.id === order.affiliateId)?.name}
                                </p>
                              )}
                            </div>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                              <CreditCard className="h-4 w-4 mr-1" />
                              Pago
                            </span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Login do cPanel
                              </label>
                              <input
                                type="text"
                                value={hostingDetails[order.id]?.login || ''}
                                onChange={(e) => updateHostingDetails(order.id, 'login', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#00e676] focus:border-[#00e676]"
                                placeholder="username"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Senha do cPanel
                              </label>
                              <input
                                type="text"
                                value={hostingDetails[order.id]?.password || ''}
                                onChange={(e) => updateHostingDetails(order.id, 'password', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#00e676] focus:border-[#00e676]"
                                placeholder="password"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                URL do cPanel
                              </label>
                              <input
                                type="text"
                                value={hostingDetails[order.id]?.cpanelUrl || ''}
                                onChange={(e) => updateHostingDetails(order.id, 'cpanelUrl', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#00e676] focus:border-[#00e676]"
                                placeholder="https://cpanel.exemplo.com"
                              />
                            </div>
                          </div>

                          <button
                            onClick={() => handleCompleteOrder(order.id)}
                            disabled={!hostingDetails[order.id]?.login || !hostingDetails[order.id]?.password || !hostingDetails[order.id]?.cpanelUrl}
                            className="flex items-center px-4 py-2 bg-[#00e676] text-white rounded-lg hover:bg-[#00e676]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Ativar Hospedagem
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Completed Orders */}
                <div>
                    <Clock className="h-5 w-5 mr-2 text-yellow-500" />
                    Pedidos Pendentes ({pendingOrders.length})
                  </h3>
                  
                  {pendingOrders.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                      <Package className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>Nenhum pedido pendente</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {pendingOrders.map((order) => (
                        <div key={order.id} className="border border-yellow-200 bg-yellow-50 rounded-lg p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h4 className="text-lg font-semibold text-gray-900">
                                Pedido #{order.id.substring(0, 8)}
                              </h4>
                              <p className="text-gray-600">
                                Cliente: {order.userName} ({order.userEmail})
                              </p>
                              <p className="text-gray-600">
                                Plano: {order.plan} - {order.price}
                              </p>
                              <p className="text-sm text-gray-500">
                                Data: {new Date(order.createdAt).toLocaleDateString('pt-BR')}
                              </p>
                            </div>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                              <Clock className="h-4 w-4 mr-1" />
                              Pendente
                            </span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Login do cPanel
                              </label>
                              <input
                                type="text"
                                value={hostingDetails[order.id]?.login || ''}
                                onChange={(e) => updateHostingDetails(order.id, 'login', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#00e676] focus:border-[#00e676]"
                                placeholder="username"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Senha do cPanel
                              </label>
                              <input
                                type="text"
                                value={hostingDetails[order.id]?.password || ''}
                                onChange={(e) => updateHostingDetails(order.id, 'password', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#00e676] focus:border-[#00e676]"
                                placeholder="password"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                URL do cPanel
                              </label>
                              <input
                                type="text"
                                value={hostingDetails[order.id]?.cpanelUrl || ''}
                                onChange={(e) => updateHostingDetails(order.id, 'cpanelUrl', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#00e676] focus:border-[#00e676]"
                                placeholder="https://cpanel.exemplo.com"
                              />
                            </div>
                          </div>

                          <button
                            onClick={() => handleCompleteOrder(order.id)}
                            disabled={!hostingDetails[order.id]?.login || !hostingDetails[order.id]?.password || !hostingDetails[order.id]?.cpanelUrl}
                            className="flex items-center px-4 py-2 bg-[#00e676] text-white rounded-lg hover:bg-[#00e676]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Marcar como Concluído
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Completed Orders */}
                <div>
                  <h3 className="text-lg font-medium text-[#1a237e] mb-4 flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                    Pedidos Concluídos ({completedOrders.length})
                  </h3>
                  
                  {completedOrders.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <p>Nenhum pedido concluído ainda</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Cliente
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Plano
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Preço
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Data
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {completedOrders.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div>
                                  <div className="text-sm font-medium text-gray-900">{order.userName}</div>
                                  <div className="text-sm text-gray-500">{order.userEmail}</div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {order.plan}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {order.price}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {new Date(order.createdAt).toLocaleDateString('pt-BR')}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Concluído
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Affiliates Tab */}
            {activeTab === 'affiliates' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-[#1a237e]">Gestão de Afiliados</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-[#1a237e] mb-2">Total de Conversões</h3>
                    <p className="text-3xl font-bold text-[#00e676]">{affiliateConversions.length}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-[#1a237e] mb-2">Comissões Pagas</h3>
                    <p className="text-3xl font-bold text-[#00e676]">
                      R$ {totalCommissionsPaid.toFixed(2).replace('.', ',')}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-[#1a237e] mb-2">Saques Pendentes</h3>
                    <p className="text-3xl font-bold text-yellow-600">{pendingWithdrawals.length}</p>
                  </div>
                </div>

                {affiliateConversions.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <TrendingUp className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>Nenhuma conversão de afiliado ainda</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Afiliado
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Cliente Indicado
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Plano
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Valor do Pedido
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Comissão (25%)
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Data
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {affiliateConversions.map((conversion) => (
                          <tr key={conversion.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div>
                                <div className="text-sm font-medium text-gray-900">{conversion.affiliateName}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div>
                                <div className="text-sm font-medium text-gray-900">{conversion.convertedUserName}</div>
                                <div className="text-sm text-gray-500">{conversion.convertedUserEmail}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {conversion.plan}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              R$ {conversion.orderValue.toFixed(2).replace('.', ',')}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#00e676]">
                              R$ {conversion.commission.toFixed(2).replace('.', ',')}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {new Date(conversion.conversionDate).toLocaleDateString('pt-BR')}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                conversion.status === 'approved' 
                                  ? 'bg-green-100 text-green-800'
                                  : conversion.status === 'pending'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}>
                                {conversion.status === 'approved' ? 'Aprovado' : 
                                 conversion.status === 'pending' ? 'Pendente' : 'Pago'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* Withdrawals Tab */}
            {activeTab === 'withdrawals' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-[#1a237e]">Solicitações de Saque</h2>
                </div>

                {pendingWithdrawals.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <DollarSign className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>Nenhuma solicitação de saque pendente</p>
                  </div>
                ) : (
                  <div className="space-y-4 mb-8">
                    <h3 className="text-lg font-medium text-[#1a237e] mb-4">Pendentes</h3>
                    {pendingWithdrawals.map((withdrawal) => (
                      <div key={withdrawal.id} className="border border-yellow-200 bg-yellow-50 rounded-lg p-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900">
                              {withdrawal.affiliateName}
                            </h4>
                            <p className="text-gray-600">{withdrawal.affiliateEmail}</p>
                            <p className="text-sm text-gray-500">
                              Solicitado em: {new Date(withdrawal.requestDate).toLocaleDateString('pt-BR')}
                            </p>
                            <p className="text-xl font-bold text-[#00e676] mt-2">
                              R$ {withdrawal.amount.toFixed(2).replace('.', ',')}
                            </p>
                          </div>
                          <button
                            onClick={() => handlePayWithdrawal(withdrawal.id)}
                            className="flex items-center px-4 py-2 bg-[#00e676] text-white rounded-lg hover:bg-[#00e676]/90 transition-colors"
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Marcar como Pago
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Paid Withdrawals */}
                <div>
                  <h3 className="text-lg font-medium text-[#1a237e] mb-4">Histórico de Pagamentos</h3>
                  {withdrawalRequests.filter(w => w.status === 'paid').length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <p>Nenhum saque pago ainda</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Afiliado
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Valor
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Data Solicitação
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Data Pagamento
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {withdrawalRequests.filter(w => w.status === 'paid').map((withdrawal) => (
                            <tr key={withdrawal.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div>
                                  <div className="text-sm font-medium text-gray-900">{withdrawal.affiliateName}</div>
                                  <div className="text-sm text-gray-500">{withdrawal.affiliateEmail}</div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#00e676]">
                                R$ {withdrawal.amount.toFixed(2).replace('.', ',')}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {new Date(withdrawal.requestDate).toLocaleDateString('pt-BR')}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {withdrawal.paidDate ? new Date(withdrawal.paidDate).toLocaleDateString('pt-BR') : '-'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-[#1a237e]">Configurações do Sistema</h2>
                </div>

                {/* Payment Integration */}
                <div className="mb-8">
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h3 className="text-lg font-medium text-[#1a237e] mb-4">Integração de Pagamento</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Mercado Pago - Access Token
                        </label>
                        <input
                          type="password"
                          value={tempPaymentSettings.mercadoPagoAccessToken}
                          onChange={(e) => setTempPaymentSettings(prev => ({
                            ...prev,
                            mercadoPagoAccessToken: e.target.value
                          }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#00e676] focus:border-[#00e676]"
                          placeholder="Insira seu Access Token do Mercado Pago"
                        />
                        <p className="text-sm text-gray-500 mt-1">
                          Obtenha seu Access Token no painel do Mercado Pago em Desenvolvedores → Credenciais
                        </p>
                      </div>
                      <button
                        onClick={handleSavePaymentSettings}
                        className="px-4 py-2 bg-[#00e676] text-white rounded-lg hover:bg-[#00e676]/90 transition-colors"
                      >
                        Salvar Configurações
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-[#1a237e] mb-4">Informações do Administrador</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Nome
                        </label>
                        <input
                          type="text"
                          value={user.name}
                          readOnly
                          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          value={user.email}
                          readOnly
                          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-[#1a237e] mb-4">Estatísticas do Sistema</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total de usuários:</span>
                        <span className="font-semibold">{totalUsers}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Pedidos pendentes:</span>
                        <span className="font-semibold text-yellow-600">{pendingOrders.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Pedidos pagos:</span>
                        <span className="font-semibold text-green-600">{paidOrders.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Pedidos concluídos:</span>
                        <span className="font-semibold text-green-600">{completedOrders.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total de pedidos:</span>
                        <span className="font-semibold">{orders.length}</span>
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <h4 className="font-medium text-[#1a237e] mb-3">Webhook do Mercado Pago</h4>
                      <p className="text-sm text-gray-600 mb-2">Configure este URL no seu painel do Mercado Pago:</p>
                      <code className="text-xs bg-gray-100 p-2 rounded block">
                        {window.location.origin}/api/webhook/mercadopago
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}