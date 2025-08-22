import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { XCircle, ArrowLeft, RefreshCw } from 'lucide-react';

export function PaymentError() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const orderId = searchParams.get('order_id');

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle className="h-12 w-12 text-red-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-[#1a237e] mb-4">
          Pagamento Não Aprovado
        </h1>
        
        <p className="text-gray-600 mb-6">
          Houve um problema com seu pagamento. Isso pode acontecer por diversos motivos, 
          como dados incorretos ou limite insuficiente.
        </p>

        {orderId && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600">
              <strong>ID do Pedido:</strong> {orderId}
            </p>
          </div>
        )}

        <div className="space-y-3">
          <button
            onClick={() => navigate('/planos')}
            className="w-full flex items-center justify-center px-6 py-3 bg-[#00e676] text-white rounded-lg hover:bg-[#00e676]/90 transition-colors font-semibold"
          >
            <RefreshCw className="mr-2 h-5 w-5" />
            Tentar Novamente
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Voltar ao Início
          </button>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Precisa de ajuda? Entre em contato conosco através do{' '}
            <button
              onClick={() => navigate('/contato')}
              className="text-[#00e676] hover:underline"
            >
              formulário de contato
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}