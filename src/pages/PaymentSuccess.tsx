import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, ArrowRight, Home } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, updateOrderStatus } = useAuth();
  const [isProcessing, setIsProcessing] = useState(true);

  const orderId = searchParams.get('order_id');
  const paymentId = searchParams.get('payment_id');
  const status = searchParams.get('status');

  useEffect(() => {
    if (orderId && status === 'approved') {
      // Atualizar status do pedido para "paid"
      updateOrderStatus(orderId, 'paid');
      setIsProcessing(false);
    } else {
      setIsProcessing(false);
    }
  }, [orderId, status, updateOrderStatus]);

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00e676] mx-auto mb-4"></div>
          <p className="text-gray-600">Processando pagamento...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-[#1a237e] mb-4">
          Pagamento Aprovado!
        </h1>
        
        <p className="text-gray-600 mb-6">
          Seu pagamento foi processado com sucesso. Em breve você receberá os dados 
          de acesso da sua hospedagem por email.
        </p>

        {paymentId && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600">
              <strong>ID do Pagamento:</strong> {paymentId}
            </p>
            {orderId && (
              <p className="text-sm text-gray-600">
                <strong>ID do Pedido:</strong> {orderId}
              </p>
            )}
          </div>
        )}

        <div className="space-y-3">
          <button
            onClick={() => navigate('/cliente')}
            className="w-full flex items-center justify-center px-6 py-3 bg-[#00e676] text-white rounded-lg hover:bg-[#00e676]/90 transition-colors font-semibold"
          >
            Ir para o Painel
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Home className="mr-2 h-5 w-5" />
            Voltar ao Início
          </button>
        </div>
      </div>
    </div>
  );
}