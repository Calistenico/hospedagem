import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Clock, ArrowRight, Home } from 'lucide-react';

export function PaymentPending() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const orderId = searchParams.get('order_id');
  const paymentId = searchParams.get('payment_id');

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="bg-yellow-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Clock className="h-12 w-12 text-yellow-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-[#1a237e] mb-4">
          Pagamento Pendente
        </h1>
        
        <p className="text-gray-600 mb-6">
          Seu pagamento está sendo processado. Você receberá uma confirmação por email 
          assim que o pagamento for aprovado.
        </p>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-yellow-800">
            <strong>Importante:</strong> Para pagamentos via boleto ou PIX, 
            o processamento pode levar até 2 dias úteis.
          </p>
        </div>

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