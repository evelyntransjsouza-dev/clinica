import React, { useState, useEffect } from 'react';
import { 
  X, User, Mail, Lock, Eye, EyeOff, Sparkles, ShoppingBag, 
  Calendar, CheckCircle2, Clock, Truck, ShieldCheck, 
  ArrowRight, LogOut, Phone, Gift, Heart, AlertCircle, RefreshCw
} from 'lucide-react';
import { authService } from '../services/authService';
import { supabaseService, OrderData, SkinDiagnosticData, AppointmentData } from '../services/supabaseService';
import { ClientUser } from '../types';
import { BRAND_CONFIG } from '../data/content';

interface ClientPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenQuiz: () => void;
  onOpenCart: () => void;
}

export const ClientPortalModal: React.FC<ClientPortalModalProps> = ({
  isOpen,
  onClose,
  onOpenQuiz,
  onOpenCart
}) => {
  const [currentUser, setCurrentUser] = useState<ClientUser | null>(null);
  const [activeTab, setActiveTab] = useState<'orders' | 'diagnostic' | 'appointments' | 'vip'>('orders');
  
  // Auth Form states
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedCoupon, setCopiedCoupon] = useState(false);

  // Client data states
  const [clientOrders, setClientOrders] = useState<OrderData[]>([]);
  const [clientDiagnostics, setClientDiagnostics] = useState<SkinDiagnosticData[]>([]);
  const [clientAppointments, setClientAppointments] = useState<AppointmentData[]>([]);

  useEffect(() => {
    supabaseService.ensureSampleData();
    const user = authService.getCurrentClient();
    setCurrentUser(user);
    if (user) {
      loadUserData(user);
    }
  }, [isOpen]);

  const loadUserData = (user: ClientUser) => {
    const orders = supabaseService.getClientOrders(user.email, user.phone);
    const diags = supabaseService.getClientDiagnostics(user.email, user.phone);
    const appts = supabaseService.getClientAppointments(user.email, user.phone);

    // Se a cliente não tem pedidos próprios ainda, traz a lista geral para demonstração de experiência
    if (orders.length === 0) {
      const all = supabaseService.getStoredRecords();
      setClientOrders(all.orders.slice(0, 3));
    } else {
      setClientOrders(orders);
    }

    if (diags.length === 0) {
      const all = supabaseService.getStoredRecords();
      setClientDiagnostics(all.diagnostics.slice(0, 2));
    } else {
      setClientDiagnostics(diags);
    }

    if (appts.length === 0) {
      const all = supabaseService.getStoredRecords();
      setClientAppointments(all.appointments.slice(0, 2));
    } else {
      setClientAppointments(appts);
    }
  };

  if (!isOpen) return null;

  // Login com Gmail / Google
  const handleGmailLogin = async (customEmail?: string) => {
    setIsLoading(true);
    setErrorMessage('');
    const targetEmail = customEmail || email || 'cliente.vip@gmail.com';
    const res = await authService.loginWithGmail(targetEmail);
    setIsLoading(false);
    if (res.success && res.user) {
      setCurrentUser(res.user);
      loadUserData(res.user);
    } else {
      setErrorMessage(res.error || 'Erro ao conectar com Gmail.');
    }
  };

  // Login com E-mail e Senha
  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    const res = await authService.loginWithPassword(email, password);
    setIsLoading(false);
    if (res.success && res.user) {
      setCurrentUser(res.user);
      loadUserData(res.user);
    } else {
      setErrorMessage(res.error || 'Falha ao autenticar.');
    }
  };

  // Cadastro de Novo Cliente
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    const res = await authService.registerClient(name, email, phone, password);
    setIsLoading(false);
    if (res.success && res.user) {
      setCurrentUser(res.user);
      loadUserData(res.user);
    } else {
      setErrorMessage(res.error || 'Erro ao criar conta.');
    }
  };

  const handleLogout = () => {
    authService.logoutClient();
    setCurrentUser(null);
    setEmail('');
    setPassword('');
  };

  const copyVipCoupon = () => {
    navigator.clipboard.writeText('BEAUTIFLYUR15');
    setCopiedCoupon(true);
    setTimeout(() => setCopiedCoupon(false), 2500);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#E8F5E9] text-[#2E7D32] border border-[#C8E6C9] flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Pago & Confirmado
          </span>
        );
      case 'shipped':
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#E3F2FD] text-[#1565C0] border border-[#BBDEFB] flex items-center gap-1">
            <Truck className="w-3 h-3" /> Em Trânsito / Enviado
          </span>
        );
      case 'delivered':
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#F3E5F5] text-[#7B1FA2] border border-[#E1BEE7] flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" /> Entregue com Sucesso
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#FFF8E1] text-[#B8860B] border border-[#FFE082] flex items-center gap-1">
            <Clock className="w-3 h-3" /> Processando Pedido
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-2xl bg-[#FFFFFF] rounded-3xl shadow-2xl border border-[#E2C799]/40 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-[#1A1816] px-6 py-5 flex items-center justify-between text-[#FAF7F2] border-b border-[#3A332B] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#8C6B1B] flex items-center justify-center text-white shadow-md">
              <User className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-luxury text-xl font-bold text-[#E8D39E]">
                  Área Exclusiva do Cliente
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#332A1F] text-[#DFC28A] border border-[#5C4A28]">
                  Lopes VIP
                </span>
              </div>
              <p className="text-xs text-[#A89D8E]">
                {currentUser ? `Bem-vinda de volta, ${currentUser.name}` : 'Acesse seus pedidos, diagnóstico de pele e benefícios'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-[#C4B7A5] hover:text-white transition-colors cursor-pointer"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-[#FCFBF9]">
          {!currentUser ? (
            /* ============================================================ */
            /* TELA DE AUTENTICAÇÃO DO CLIENTE (GMAIL & SENHA) */
            /* ============================================================ */
            <div className="max-w-md mx-auto space-y-6 py-2">
              <div className="text-center space-y-1">
                <h4 className="font-luxury text-2xl font-bold text-[#1A1816]">
                  Acesse sua Conta
                </h4>
                <p className="text-xs text-[#7A7165]">
                  Acompanhe seus envios de Sérum Facial e consulte suas fórmulas
                </p>
              </div>

              {/* Botão de Acesso Rápido com Gmail */}
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => handleGmailLogin()}
                  disabled={isLoading}
                  className="w-full py-3.5 px-4 bg-white hover:bg-[#F7F4EE] border-2 border-[#E2C799]/70 rounded-2xl text-xs sm:text-sm font-bold text-[#1A1816] flex items-center justify-center gap-3 transition-all shadow-xs hover:shadow-md cursor-pointer group"
                >
                  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Continuar com Gmail / Google</span>
                </button>

                <div className="flex items-center gap-3 my-4">
                  <div className="h-px bg-[#E2D9CC] flex-1" />
                  <span className="text-[11px] uppercase tracking-wider text-[#9E9282] font-semibold">
                    ou use seu e-mail e senha
                  </span>
                  <div className="h-px bg-[#E2D9CC] flex-1" />
                </div>
              </div>

              {/* Seletor Login / Cadastro */}
              <div className="grid grid-cols-2 p-1 bg-[#F0EBE1] rounded-2xl">
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className={`py-2 rounded-xl text-xs font-bold transition-all ${authMode === 'login' ? 'bg-white text-[#1A1816] shadow-xs' : 'text-[#70665A]'}`}
                >
                  Já sou Cliente
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMode('register')}
                  className={`py-2 rounded-xl text-xs font-bold transition-all ${authMode === 'register' ? 'bg-white text-[#1A1816] shadow-xs' : 'text-[#70665A]'}`}
                >
                  Criar Cadastro VIP
                </button>
              </div>

              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-[#FDEDED] border border-[#F5C2C7] text-xs text-[#D32F2F] flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {authMode === 'login' ? (
                /* Formulário de Login */
                <form onSubmit={handlePasswordLogin} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#3B342B] flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-[#B8860B]" />
                      Seu Gmail ou E-mail
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ex: seu.nome@gmail.com"
                      className="w-full px-4 py-3 rounded-xl border border-[#D9CEBF] focus:border-[#B8860B] focus:ring-2 focus:ring-[#B8860B]/20 outline-none text-xs sm:text-sm bg-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-[#3B342B] flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-[#B8860B]" />
                        Sua Senha
                      </label>
                      <button
                        type="button"
                        onClick={() => alert('Para redefinir sua senha, solicite um link com o suporte da clínica no WhatsApp.')}
                        className="text-[11px] text-[#8C6B1B] hover:underline"
                      >
                        Esqueceu?
                      </button>
                    </div>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Digite sua senha de acesso"
                        className="w-full px-4 py-3 pr-10 rounded-xl border border-[#D9CEBF] focus:border-[#B8860B] focus:ring-2 focus:ring-[#B8860B]/20 outline-none text-xs sm:text-sm bg-white"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C8276] hover:text-[#1A1816]"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 px-4 bg-[#1A1816] hover:bg-black text-[#FAF7F2] font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isLoading ? <RefreshCw className="w-4 h-4 animate-spin text-[#D4AF37]" /> : 'Entrar na Minha Conta'}
                  </button>

                  <div className="p-3 rounded-xl bg-[#FAF8F3] border border-[#EAE2D5] text-[11px] text-[#70665A] flex items-center justify-between">
                    <span>Acesso de Teste Rápido:</span>
                    <button
                      type="button"
                      onClick={() => {
                        setEmail('carolina.mendes@gmail.com');
                        setPassword('cliente123');
                      }}
                      className="font-bold text-[#8A6317] hover:underline"
                    >
                      Preencher Exemplo &rarr;
                    </button>
                  </div>
                </form>
              ) : (
                /* Formulário de Cadastro */
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#3B342B]">Nome Completo</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="ex: Maria Eduarda Silva"
                      className="w-full px-4 py-3 rounded-xl border border-[#D9CEBF] focus:border-[#B8860B] outline-none text-xs sm:text-sm bg-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#3B342B]">Gmail / E-mail</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ex: maria@gmail.com"
                      className="w-full px-4 py-3 rounded-xl border border-[#D9CEBF] focus:border-[#B8860B] outline-none text-xs sm:text-sm bg-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#3B342B]">WhatsApp / Celular</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(11) 99999-9999"
                      className="w-full px-4 py-3 rounded-xl border border-[#D9CEBF] focus:border-[#B8860B] outline-none text-xs sm:text-sm bg-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#3B342B]">Definir Senha</label>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Mínimo 4 dígitos"
                      className="w-full px-4 py-3 rounded-xl border border-[#D9CEBF] focus:border-[#B8860B] outline-none text-xs sm:text-sm bg-white"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 px-4 bg-[#8C6B1B] hover:bg-[#735513] text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md cursor-pointer"
                  >
                    {isLoading ? 'Cadastrando...' : 'Criar Conta e Ativar Benefícios VIP'}
                  </button>
                </form>
              )}
            </div>
          ) : (
            /* ============================================================ */
            /* PAINEL DO CLIENTE LOGADO (PEDIDOS, DIAGNÓSTICOS, AGENDAMENTOS) */
            /* ============================================================ */
            <div className="space-y-6">
              {/* Profile Bar */}
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8DFC9] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#1A1816] text-[#E8D39E] flex items-center justify-center font-bold text-lg font-luxury shadow-xs">
                    {currentUser.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#1A1816]">{currentUser.name}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E8F5E9] text-[#2E7D32]">
                        VIP Ativo
                      </span>
                    </div>
                    <span className="text-xs text-[#7A7165]">{currentUser.email}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <button
                    onClick={handleLogout}
                    className="px-3 py-1.5 rounded-xl border border-[#D9CEBF] hover:bg-white text-xs font-semibold text-[#7A7165] hover:text-[#D32F2F] flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Sair
                  </button>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="flex items-center gap-2 border-b border-[#E2D9CC] pb-2 overflow-x-auto">
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
                    activeTab === 'orders' ? 'bg-[#1A1816] text-white shadow-xs' : 'text-[#70665A] hover:bg-[#F2ECE1]'
                  }`}
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-[#E8D39E]" />
                  Meus Pedidos ({clientOrders.length})
                </button>
                <button
                  onClick={() => setActiveTab('diagnostic')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
                    activeTab === 'diagnostic' ? 'bg-[#1A1816] text-white shadow-xs' : 'text-[#70665A] hover:bg-[#F2ECE1]'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#E8D39E]" />
                  Meu Diagnóstico de Pele
                </button>
                <button
                  onClick={() => setActiveTab('appointments')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
                    activeTab === 'appointments' ? 'bg-[#1A1816] text-white shadow-xs' : 'text-[#70665A] hover:bg-[#F2ECE1]'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5 text-[#E8D39E]" />
                  Meus Agendamentos
                </button>
                <button
                  onClick={() => setActiveTab('vip')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
                    activeTab === 'vip' ? 'bg-[#1A1816] text-white shadow-xs' : 'text-[#70665A] hover:bg-[#F2ECE1]'
                  }`}
                >
                  <Gift className="w-3.5 h-3.5 text-[#E8D39E]" />
                  Benefícios VIP
                </button>
              </div>

              {/* ABA: MEUS PEDIDOS */}
              {activeTab === 'orders' && (
                <div className="space-y-4">
                  {clientOrders.length === 0 ? (
                    <div className="text-center py-10 space-y-3 bg-white rounded-2xl border border-dashed border-[#D9CEBF]">
                      <ShoppingBag className="w-10 h-10 text-[#C4B7A5] mx-auto" />
                      <div>
                        <p className="font-bold text-sm text-[#1A1816]">Nenhum pedido recente localizado</p>
                        <p className="text-xs text-[#7A7165]">Seus frascos de Sérum Facial comprados aparecerão aqui com rastreio em tempo real.</p>
                      </div>
                      <button
                        onClick={() => {
                          onClose();
                          onOpenCart();
                        }}
                        className="px-4 py-2 bg-[#8C6B1B] hover:bg-[#735513] text-white rounded-xl text-xs font-bold"
                      >
                        Ir para a Sacola de Compras
                      </button>
                    </div>
                  ) : (
                    clientOrders.map((order, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-white border border-[#E2D9CC] shadow-xs space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F0EBE1] pb-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm text-[#1A1816]">Pedido #{order.orderNumber}</span>
                              {getStatusBadge(order.status || 'pending')}
                            </div>
                            <span className="text-[11px] text-[#7A7165]">
                              Pagamento: {order.paymentMethod}
                            </span>
                          </div>
                          <div className="text-left sm:text-right">
                            <span className="text-xs text-[#7A7165] block">Total</span>
                            <span className="text-base font-bold text-[#8C6B1B]">
                              R$ {order.total.toFixed(2).replace('.', ',')}
                            </span>
                          </div>
                        </div>

                        {/* Itens do Pedido */}
                        <div className="space-y-2">
                          {order.items.map((item, itemIdx) => (
                            <div key={itemIdx} className="flex items-center justify-between text-xs py-1">
                              <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-[#B8860B]" />
                                <span className="font-medium text-[#2C2926]">{item.name} ({item.volume})</span>
                                <span className="text-[#8C8276]">x{item.quantity}</span>
                              </div>
                              <span className="font-bold text-[#1A1816]">
                                R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                              </span>
                            </div>
                          ))}
                        </div>

                        {order.notes && (
                          <div className="p-2.5 rounded-xl bg-[#FAF8F5] text-[11px] text-[#7A7165] border border-[#EAE3D4]">
                            <strong>Observações / Rastreio:</strong> {order.notes}
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-2 text-xs">
                          <a
                            href={`https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${encodeURIComponent(`Olá, gostaria de informações sobre meu pedido #${order.orderNumber}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#2E7D32] font-semibold hover:underline flex items-center gap-1"
                          >
                            <Phone className="w-3.5 h-3.5" /> Falar com Concierge sobre este pedido
                          </a>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* ABA: MEU DIAGNÓSTICO DE PELE */}
              {activeTab === 'diagnostic' && (
                <div className="space-y-4">
                  {clientDiagnostics.length === 0 ? (
                    <div className="text-center py-10 space-y-3 bg-white rounded-2xl border border-dashed border-[#D9CEBF]">
                      <Sparkles className="w-10 h-10 text-[#C4B7A5] mx-auto" />
                      <div>
                        <p className="font-bold text-sm text-[#1A1816]">Você ainda não realizou sua avaliação</p>
                        <p className="text-xs text-[#7A7165]">Responda ao Quiz de Pele da clínica para descobrir a combinação ideal de bio-ativos.</p>
                      </div>
                      <button
                        onClick={() => {
                          onClose();
                          onOpenQuiz();
                        }}
                        className="px-4 py-2 bg-[#1A1816] text-[#E8D39E] rounded-xl text-xs font-bold"
                      >
                        Iniciar Diagnóstico de Pele Agora &rarr;
                      </button>
                    </div>
                  ) : (
                    clientDiagnostics.map((diag, idx) => (
                      <div key={idx} className="p-5 rounded-2xl bg-white border border-[#E2D9CC] shadow-xs space-y-3">
                        <div className="flex items-center justify-between border-b border-[#F0EBE1] pb-2.5">
                          <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-[#B8860B]" />
                            <span className="font-bold text-sm text-[#1A1816]">Perfil de Pele Registrado</span>
                          </div>
                          <span className="text-[11px] text-[#8C6B1B] font-bold">Fórmula Recomendada</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#EAE3D4]">
                            <span className="text-[10px] text-[#7A7165] uppercase block font-semibold">Tipo de Pele</span>
                            <span className="font-bold text-[#1A1816] text-sm">{diag.skinType}</span>
                          </div>
                          <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#EAE3D4]">
                            <span className="text-[10px] text-[#7A7165] uppercase block font-semibold">Preocupação Principal</span>
                            <span className="font-bold text-[#1A1816] text-sm">{diag.mainConcern}</span>
                          </div>
                        </div>

                        <div className="p-3.5 rounded-xl bg-[#FFFBF2] border border-[#F0E0BF] space-y-1">
                          <span className="text-xs font-bold text-[#8A6317] block">Sérum Facial Prescrito:</span>
                          <p className="text-xs text-[#332A1F] font-semibold">{diag.recommendedFormula}</p>
                          <p className="text-[11px] text-[#6E5C38] pt-1">
                            <strong>Protocolo na Clínica:</strong> {diag.recommendedProtocol}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-1">
                          <button
                            onClick={() => {
                              onClose();
                              onOpenQuiz();
                            }}
                            className="text-xs font-bold text-[#8C6B1B] hover:underline"
                          >
                            Refazer Avaliação de Pele &rarr;
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* ABA: MEUS AGENDAMENTOS */}
              {activeTab === 'appointments' && (
                <div className="space-y-4">
                  {clientAppointments.length === 0 ? (
                    <div className="text-center py-10 space-y-3 bg-white rounded-2xl border border-dashed border-[#D9CEBF]">
                      <Calendar className="w-10 h-10 text-[#C4B7A5] mx-auto" />
                      <div>
                        <p className="font-bold text-sm text-[#1A1816]">Nenhum agendamento ativo</p>
                        <p className="text-xs text-[#7A7165]">Agende uma sessão do Protocolo Infusão Ouro Glow ou Laser na clínica.</p>
                      </div>
                      <a
                        href={`https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${encodeURIComponent('Olá! Gostaria de agendar um procedimento na clínica Lopes Beautiflyur.')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-4 py-2 bg-[#2E7D32] hover:bg-[#256327] text-white rounded-xl text-xs font-bold"
                      >
                        Agendar via WhatsApp Concierge
                      </a>
                    </div>
                  ) : (
                    clientAppointments.map((appt, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-white border border-[#E2D9CC] shadow-xs space-y-3">
                        <div className="flex items-center justify-between border-b border-[#F0EBE1] pb-2.5">
                          <span className="font-bold text-sm text-[#1A1816]">{appt.procedureName}</span>
                          <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#E8F5E9] text-[#2E7D32]">
                            {appt.preferredDate ? `Data: ${appt.preferredDate}` : 'Solicitado'}
                          </span>
                        </div>
                        <div className="text-xs text-[#7A7165] space-y-1">
                          {appt.preferredTime && <p>Horário Preferencial: <strong>{appt.preferredTime}</strong></p>}
                          {appt.clinicSpace && <p>Espaço Clínico: <strong>{appt.clinicSpace}</strong></p>}
                        </div>
                        <div className="pt-1">
                          <a
                            href={`https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${encodeURIComponent(`Olá, gostaria de confirmar meu agendamento de ${appt.procedureName}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-[#2E7D32] font-semibold hover:underline flex items-center gap-1"
                          >
                            <Phone className="w-3.5 h-3.5" /> Confirmar detalhes no WhatsApp
                          </a>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* ABA: BENEFÍCIOS VIP */}
              {activeTab === 'vip' && (
                <div className="space-y-4">
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-[#211E1A] to-[#121110] text-[#FAF7F2] border border-[#42392E] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#E8D39E] uppercase tracking-widest flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-[#D4AF37]" /> Cupom Exclusivo de Membro
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-[#D4AF37] text-black font-bold text-[10px]">
                        15% OFF
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-[#4A3F31]">
                      <span className="font-mono text-base font-bold text-[#DFC28A] tracking-wider">
                        BEAUTIFLYUR15
                      </span>
                      <button
                        onClick={copyVipCoupon}
                        className="px-3 py-1 bg-[#D4AF37] hover:bg-[#b89528] text-black text-xs font-bold rounded-lg transition-colors cursor-pointer"
                      >
                        {copiedCoupon ? 'Copiado!' : 'Copiar Cupom'}
                      </button>
                    </div>

                    <p className="text-[11px] text-[#A69C90]">
                      Válido para compra do Sérum Facial Lopes Beautiflyur 30ml e Kits de Tratamento.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-4 rounded-2xl bg-white border border-[#E2D9CC] space-y-1.5">
                      <div className="flex items-center gap-2 text-[#8C6B1B] font-bold">
                        <Heart className="w-4 h-4" />
                        <span>Acompanhamento Pessoal</span>
                      </div>
                      <p className="text-[#70665A] text-[11px] leading-relaxed">
                        Acesso direto à equipe cosmetológica para ajustes na sua rotina diurna e noturna.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white border border-[#E2D9CC] space-y-1.5">
                      <div className="flex items-center gap-2 text-[#2E7D32] font-bold">
                        <Truck className="w-4 h-4" />
                        <span>Frete Prioritário</span>
                      </div>
                      <p className="text-[#70665A] text-[11px] leading-relaxed">
                        Envios expressos despachados no mesmo dia útil para pacientes cadastradas.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
