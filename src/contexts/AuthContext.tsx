import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AffiliateService, AffiliateConversion } from '../services/affiliateService';
import { MercadoPagoService } from '../services/mercadoPago';

interface User {
  id: string;
  name: string;
  email: string;
  isAdmin?: boolean;
  plan?: string;
  planStatus?: 'active' | 'pending' | 'inactive';
  affiliateCode?: string;
}

interface Order {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  plan: string;
  price: string;
  status: 'pending' | 'paid' | 'completed';
  createdAt: string;
  affiliateId?: string;
  hostingDetails?: {
    login: string;
    password: string;
    cpanelUrl: string;
  };
}

interface PaymentSettings {
  mercadoPagoAccessToken: string;
}

interface AuthContextType {
  user: User | null;
  users: User[];
  orders: Order[];
  paymentSettings: PaymentSettings;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  purchasePlan: (plan: string, price: string) => Promise<void>;
  completeOrder: (orderId: string, hostingDetails: any) => void;
  updateOrderStatus: (orderId: string, status: 'paid' | 'completed') => void;
  updatePaymentSettings: (settings: PaymentSettings) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [paymentSettings, setPaymentSettings] = useState<PaymentSettings>({
    mercadoPagoAccessToken: ''
  });

  // Verificar parâmetro de afiliado na URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const affiliateRef = urlParams.get('ref');
    
    if (affiliateRef) {
      AffiliateService.setAffiliateCookie(affiliateRef);
      AffiliateService.trackClick(affiliateRef);
    }
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    const storedUsers = localStorage.getItem('users');
    const storedOrders = localStorage.getItem('orders');
    const storedPaymentSettings = localStorage.getItem('paymentSettings');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      // Create admin user if no users exist
      const adminUser = {
        id: 'admin-1',
        name: 'Administrador',
        email: 'admin@vyntrixhost.com',
        isAdmin: true
      };
      setUsers([adminUser]);
      localStorage.setItem('users', JSON.stringify([adminUser]));
    }
    
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }
    
    if (storedPaymentSettings) {
      setPaymentSettings(JSON.parse(storedPaymentSettings));
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    // Simple authentication - in production, this would be server-side
    const foundUser = users.find(u => u.email === email);
    if (foundUser && (password === '123456' || (foundUser.isAdmin && password === 'admin123'))) {
      setUser(foundUser);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const register = (name: string, email: string, password: string): boolean => {
    // Check if user already exists
    if (users.find(u => u.email === email)) {
      return false;
    }
    
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      affiliateCode: AffiliateService.generateAffiliateCode(`user-${Date.now()}`),
      plan: 'none',
      planStatus: 'inactive'
    };
    
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    setUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const purchasePlan = async (plan: string, price: string) => {
    if (!user) return;
    
    // Verificar se há afiliado
    const affiliateRef = AffiliateService.getAffiliateCookie();
    let affiliateId: string | undefined;
    
    if (affiliateRef) {
      // Encontrar o afiliado pelo código
      const affiliate = users.find(u => 
        AffiliateService.generateAffiliateCode(u.id) === affiliateRef
      );
      if (affiliate && affiliate.id !== user.id) {
        affiliateId = affiliate.id;
      }
    }
    
    const newOrder: Order = {
      id: `order-${Date.now()}`,
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      plan,
      price,
      status: 'pending',
      createdAt: new Date().toISOString(),
      affiliateId
    };
    
    // Se há configuração do Mercado Pago, redirecionar para pagamento
    if (paymentSettings.mercadoPagoAccessToken) {
      try {
        const mpService = new MercadoPagoService(paymentSettings.mercadoPagoAccessToken);
        const priceValue = MercadoPagoService.extractPriceFromString(price);
        
        const paymentData = {
          title: `Plano ${plan} - VyntrixHost`,
          quantity: 1,
          unit_price: priceValue,
          currency_id: 'BRL',
          description: `Hospedagem ${plan} - VyntrixHost`
        };
        
        const preference = await mpService.createPreference(paymentData, newOrder.id, user.email);
        
        // Salvar pedido antes de redirecionar
        const updatedOrders = [...orders, newOrder];
        setOrders(updatedOrders);
        localStorage.setItem('orders', JSON.stringify(updatedOrders));
        
        // Redirecionar para o Mercado Pago
        window.location.href = preference.init_point;
        return;
      } catch (error) {
        console.error('Erro ao criar pagamento:', error);
        alert('Erro ao processar pagamento. Tente novamente.');
        return;
      }
    }
    
    // Fluxo normal sem pagamento automático
    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    
    // Update user plan status
    const updatedUser = { ...user, plan, planStatus: 'pending' as const };
    setUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    // Update users list
    const updatedUsers = users.map(u => u.id === user.id ? updatedUser : u);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const updateOrderStatus = (orderId: string, status: 'paid' | 'completed') => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    
    const updatedOrders = orders.map(o => 
      o.id === orderId ? { ...o, status } : o
    );
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    
    // Se o pedido foi pago e há afiliado, criar conversão
    if (status === 'paid' && order.affiliateId) {
      const affiliate = users.find(u => u.id === order.affiliateId);
      if (affiliate) {
        const orderValue = MercadoPagoService.extractPriceFromString(order.price);
        const commission = AffiliateService.calculateCommission(orderValue);
        
        const conversion: AffiliateConversion = {
          id: `conversion-${Date.now()}`,
          affiliateId: order.affiliateId,
          affiliateName: affiliate.name,
          convertedUserId: order.userId,
          convertedUserName: order.userName,
          convertedUserEmail: order.userEmail,
          plan: order.plan,
          orderValue,
          commission,
          conversionDate: new Date().toISOString(),
          status: 'approved'
        };
        
        AffiliateService.saveConversion(conversion);
        AffiliateService.clearAffiliateCookie();
      }
    }
  };

  const completeOrder = (orderId: string, hostingDetails: any) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    
    const updatedOrders = orders.map(o => 
      o.id === orderId 
        ? { ...o, status: 'completed' as const, hostingDetails }
        : o
    );
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    
    // Update user plan status
    const updatedUsers = users.map(u => 
      u.id === order.userId 
        ? { ...u, planStatus: 'active' as const }
        : u
    );
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    // Update current user if it's the same user
    if (user && user.id === order.userId) {
      const updatedUser = { ...user, planStatus: 'active' as const };
      setUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    }
  };

  const updatePaymentSettings = (settings: PaymentSettings) => {
    setPaymentSettings(settings);
    localStorage.setItem('paymentSettings', JSON.stringify(settings));
  };

  return (
    <AuthContext.Provider value={{
      user,
      users,
      orders,
      paymentSettings,
      login,
      register,
      logout,
      purchasePlan,
      completeOrder,
      updateOrderStatus,
      updatePaymentSettings
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}