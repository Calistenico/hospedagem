// Serviço para integração com Mercado Pago
export interface PaymentData {
  title: string;
  quantity: number;
  unit_price: number;
  currency_id: string;
  description: string;
}

export interface PreferenceResponse {
  id: string;
  init_point: string;
  sandbox_init_point: string;
}

export class MercadoPagoService {
  private accessToken: string;
  private baseUrl = 'https://api.mercadopago.com';

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  async createPreference(paymentData: PaymentData, orderId: string, userEmail: string): Promise<PreferenceResponse> {
    const preference = {
      items: [
        {
          title: paymentData.title,
          quantity: paymentData.quantity,
          unit_price: paymentData.unit_price,
          currency_id: paymentData.currency_id,
          description: paymentData.description
        }
      ],
      payer: {
        email: userEmail
      },
      back_urls: {
        success: `${window.location.origin}/pagamento/sucesso?order_id=${orderId}`,
        failure: `${window.location.origin}/pagamento/erro?order_id=${orderId}`,
        pending: `${window.location.origin}/pagamento/pendente?order_id=${orderId}`
      },
      auto_return: 'approved',
      external_reference: orderId,
      notification_url: `${window.location.origin}/api/webhook/mercadopago`
    };

    try {
      const response = await fetch(`${this.baseUrl}/checkout/preferences`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(preference)
      });

      if (!response.ok) {
        throw new Error('Erro ao criar preferência de pagamento');
      }

      return await response.json();
    } catch (error) {
      console.error('Erro no Mercado Pago:', error);
      throw error;
    }
  }

  static formatPrice(price: number): number {
    return Math.round(price * 100) / 100;
  }

  static extractPriceFromString(priceString: string): number {
    const match = priceString.match(/R\$\s*([\d,]+\.?\d*)/);
    if (match) {
      return parseFloat(match[1].replace(',', '.'));
    }
    return 0;
  }
}