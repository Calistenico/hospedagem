import React, { useState, useEffect } from 'react';
import { Copy, Users, DollarSign, TrendingUp, Eye, CheckCircle, Clock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { AffiliateService, AffiliateConversion, WithdrawalRequest } from '../services/affiliateService';

export function AffiliateSection() {
  const { user } = useAuth();
  const [affiliateCode, setAffiliateCode] = useState('');
  const [affiliateLink, setAffiliateLink] = useState('');
  const [stats, setStats] = useState({
    totalClicks: 0,
    conversions: 0,
    totalCommissions: 0,
    pendingCommissions: 0
  });
  const [conversions, setConversions] = useState<AffiliateConversion[]>([]);
  const [withdrawalRequests, setWithdrawalRequests] = useState<WithdrawalRequest[]>([]);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    if (user) {
      const code = AffiliateService.generateAffiliateCode(user.id);
      const link = AffiliateService.generateAffiliateLink(code);
      
      setAffiliateCode(code);
      setAffiliateLink(link);
      
      // Carregar estatísticas
      loadAffiliateStats();
    }
  }, [user]);

  const loadAffiliateStats = () => {
    if (!user) return;

    const clicks = AffiliateService.getStoredClicks().filter(click => 
      click.affiliateId === user.id
    );
    
    const userConversions = AffiliateService.getStoredConversions().filter(conversion => 
      conversion.affiliateId === user.id
    );
    
    const userWithdrawals = AffiliateService.getStoredWithdrawals().filter(withdrawal => 
      withdrawal.affiliateId === user.id
    );

    const totalCommissions = userConversions
      .filter(c => c.status === 'approved')
      .reduce((sum, c) => sum + c.commission, 0);
    
    const pendingCommissions = userConversions
      .filter(c => c.status === 'pending')
      .reduce((sum, c) => sum + c.commission, 0);

    // Subtrair saques já pagos
    const paidWithdrawals = userWithdrawals
      .filter(w => w.status === 'paid')
      .reduce((sum, w) => sum + w.amount, 0);

    setStats({
      totalClicks: clicks.length,
      conversions: userConversions.length,
      totalCommissions: Math.max(0, totalCommissions - paidWithdrawals),
      pendingCommissions
    });

    setConversions(userConversions);
    setWithdrawalRequests(userWithdrawals);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(affiliateLink);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Erro ao copiar:', err);
    }
  };

  const requestWithdrawal = () => {
    if (!user || !AffiliateService.canRequestWithdrawal(stats.totalCommissions)) {
      return;
    }

    const withdrawal: WithdrawalRequest = {
      id: `withdrawal-${Date.now()}`,
      affiliateId: user.id,
      affiliateName: user.name,
      affiliateEmail: user.email,
      amount: stats.totalCommissions,
      requestDate: new Date().toISOString(),
      status: 'pending'
    };

    AffiliateService.saveWithdrawal(withdrawal);
    loadAffiliateStats();
  };

  const canRequestWithdrawal = AffiliateService.canRequestWithdrawal(stats.totalCommissions);
  const hasRequestedWithdrawal = withdrawalRequests.some(w => w.status === 'pending');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1a237e] to-[#1a237e]/90 rounded-2xl p-8 text-white">
        <div className="flex items-center space-x-4 mb-4">
          <div className="bg-[#00e676] p-3 rounded-full">
            <Users className="h-8 w-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Programa de Afiliados</h2>
            <p className="text-gray-200">Ganhe 25% de comissão por cada indicação</p>
          </div>
        </div>
        
        <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
          <p className="text-sm text-gray-200 mb-2">Seu código de afiliado:</p>
          <p className="text-xl font-bold text-[#00e676] mb-3">{affiliateCode}</p>
          <p className="text-sm text-gray-200">
            Compartilhe seu link e ganhe comissão por cada cliente que contratar um plano!
          </p>
        </div>
      </div>

      {/* Link de Afiliado */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-[#1a237e] mb-4">Seu Link de Indicação</h3>
        <div className="flex items-center space-x-3">
          <input
            type="text"
            value={affiliateLink}
            readOnly
            className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm"
          />
          <button
            onClick={copyToClipboard}
            className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
              copySuccess 
                ? 'bg-green-100 text-green-700' 
                : 'bg-[#00e676] text-white hover:bg-[#00e676]/90'
            }`}
          >
            {copySuccess ? (
              <>
                <CheckCircle className="h-4 w-4" />
                <span>Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span>Copiar</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Eye className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#1a237e]">{stats.totalClicks}</p>
          <p className="text-gray-600 text-sm">Total de Cliques</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-100 p-3 rounded-full">
              <Users className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#1a237e]">{stats.conversions}</p>
          <p className="text-gray-600 text-sm">Conversões</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-yellow-100 p-3 rounded-full">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#1a237e]">
            R$ {stats.pendingCommissions.toFixed(2).replace('.', ',')}
          </p>
          <p className="text-gray-600 text-sm">Comissões Pendentes</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-[#00e676]/10 p-3 rounded-full">
              <DollarSign className="h-6 w-6 text-[#00e676]" />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#1a237e]">
            R$ {stats.totalCommissions.toFixed(2).replace('.', ',')}
          </p>
          <p className="text-gray-600 text-sm">Saldo Disponível</p>
        </div>
      </div>

      {/* Saque */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-[#1a237e] mb-4">Solicitação de Saque</h3>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-600 mb-2">
            <strong>Valor mínimo para saque:</strong> R$ 50,00
          </p>
          <p className="text-sm text-gray-600">
            <strong>Seu saldo atual:</strong> R$ {stats.totalCommissions.toFixed(2).replace('.', ',')}
          </p>
        </div>

        {hasRequestedWithdrawal ? (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-yellow-600" />
              <p className="text-yellow-800 font-medium">Solicitação de saque pendente</p>
            </div>
            <p className="text-yellow-700 text-sm mt-2">
              Sua solicitação está sendo processada. Você receberá o pagamento em breve.
            </p>
          </div>
        ) : (
          <button
            onClick={requestWithdrawal}
            disabled={!canRequestWithdrawal}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              canRequestWithdrawal
                ? 'bg-[#00e676] text-white hover:bg-[#00e676]/90'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            {canRequestWithdrawal ? 'Solicitar Saque' : 'Valor mínimo não atingido'}
          </button>
        )}
      </div>

      {/* Histórico de Conversões */}
      {conversions.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-[#1a237e] mb-6">Histórico de Indicações</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Cliente</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Plano</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Comissão</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Data</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {conversions.map((conversion) => (
                  <tr key={conversion.id} className="border-t border-gray-100">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{conversion.convertedUserName}</p>
                        <p className="text-sm text-gray-500">{conversion.convertedUserEmail}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-700">{conversion.plan}</td>
                    <td className="py-3 px-4 font-medium text-[#00e676]">
                      R$ {conversion.commission.toFixed(2).replace('.', ',')}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {new Date(conversion.conversionDate).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
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
        </div>
      )}
    </div>
  );
}