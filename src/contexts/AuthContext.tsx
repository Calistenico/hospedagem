import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  isAdmin?: boolean;
  plan?: string;
  planStatus?: 'active' | 'pending' | 'inactive';
}

interface Order {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  plan: string;
  price: string;
  status: 'pending' | 'completed';
  createdAt: string;
  hostingDetails?: {
    login: string;
    password: string;
    cpanelUrl: string;
  };
}

interface AuthContextType {
  user: User | null;
  users: User[];
  orders: Order[];
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  purchasePlan: (plan: string, price: string) => void;
  completeOrder: (orderId: string, hostingDetails: any) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    const storedUsers = localStorage.getItem('users');
    const storedOrders = localStorage.getItem('orders');
    
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

  const purchasePlan = (plan: string, price: string) => {
    if (!user) return;
    
    const newOrder: Order = {
      id: `order-${Date.now()}`,
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      plan,
      price,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
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

  return (
    <AuthContext.Provider value={{
      user,
      users,
      orders,
      login,
      register,
      logout,
      purchasePlan,
      completeOrder
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