// Serviço para gerenciamento do sistema de afiliados
export interface AffiliateClick {
  id: string;
  affiliateId: string;
  timestamp: string;
  ipAddress?: string;
  userAgent?: string;
}

export interface AffiliateConversion {
  id: string;
  affiliateId: string;
  affiliateName: string;
  convertedUserId: string;
  convertedUserName: string;
  convertedUserEmail: string;
  plan: string;
  orderValue: number;
  commission: number;
  conversionDate: string;
  status: 'pending' | 'approved' | 'paid';
}

export interface WithdrawalRequest {
  id: string;
  affiliateId: string;
  affiliateName: string;
  affiliateEmail: string;
  amount: number;
  requestDate: string;
  status: 'pending' | 'paid';
  paidDate?: string;
}

export class AffiliateService {
  private static readonly COMMISSION_RATE = 0.25; // 25%
  private static readonly MIN_WITHDRAWAL = 50.00; // R$ 50,00
  private static readonly COOKIE_DURATION = 30; // 30 dias

  static generateAffiliateCode(userId: string): string {
    return `VH${userId.substring(0, 8).toUpperCase()}`;
  }

  static generateAffiliateLink(affiliateCode: string): string {
    return `${window.location.origin}/?ref=${affiliateCode}`;
  }

  static setAffiliateCookie(affiliateCode: string): void {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + this.COOKIE_DURATION);
    
    document.cookie = `affiliate_ref=${affiliateCode}; expires=${expirationDate.toUTCString()}; path=/`;
  }

  static getAffiliateCookie(): string | null {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === 'affiliate_ref') {
        return value;
      }
    }
    return null;
  }

  static clearAffiliateCookie(): void {
    document.cookie = 'affiliate_ref=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }

  static calculateCommission(orderValue: number): number {
    return Math.round(orderValue * this.COMMISSION_RATE * 100) / 100;
  }

  static canRequestWithdrawal(totalCommissions: number): boolean {
    return totalCommissions >= this.MIN_WITHDRAWAL;
  }

  static trackClick(affiliateId: string): AffiliateClick {
    const click: AffiliateClick = {
      id: `click-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      affiliateId,
      timestamp: new Date().toISOString()
    };

    // Salvar no localStorage para simulação
    const clicks = this.getStoredClicks();
    clicks.push(click);
    localStorage.setItem('affiliate_clicks', JSON.stringify(clicks));

    return click;
  }

  static getStoredClicks(): AffiliateClick[] {
    const stored = localStorage.getItem('affiliate_clicks');
    return stored ? JSON.parse(stored) : [];
  }

  static getStoredConversions(): AffiliateConversion[] {
    const stored = localStorage.getItem('affiliate_conversions');
    return stored ? JSON.parse(stored) : [];
  }

  static getStoredWithdrawals(): WithdrawalRequest[] {
    const stored = localStorage.getItem('affiliate_withdrawals');
    return stored ? JSON.parse(stored) : [];
  }

  static saveConversion(conversion: AffiliateConversion): void {
    const conversions = this.getStoredConversions();
    conversions.push(conversion);
    localStorage.setItem('affiliate_conversions', JSON.stringify(conversions));
  }

  static saveWithdrawal(withdrawal: WithdrawalRequest): void {
    const withdrawals = this.getStoredWithdrawals();
    withdrawals.push(withdrawal);
    localStorage.setItem('affiliate_withdrawals', JSON.stringify(withdrawals));
  }

  static updateWithdrawalStatus(withdrawalId: string, status: 'paid'): void {
    const withdrawals = this.getStoredWithdrawals();
    const withdrawal = withdrawals.find(w => w.id === withdrawalId);
    if (withdrawal) {
      withdrawal.status = status;
      withdrawal.paidDate = new Date().toISOString();
      localStorage.setItem('affiliate_withdrawals', JSON.stringify(withdrawals));
    }
  }
}