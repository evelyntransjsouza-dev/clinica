import React, { useState, useEffect } from 'react';
import { 
  X, Lock, Unlock, ShieldCheck, Eye, EyeOff, AlertCircle, 
  TrendingUp, ShoppingBag, Sparkles, Calendar, Users, 
  Phone, CheckCircle2, Clock, Truck, FileText, Database, 
  RefreshCw, LogOut, ArrowUpRight
} from 'lucide-react';
import { authService, OWNER_CORRECT_PASSWORD } from '../services/authService';
import { supabaseService, OrderData, SkinDiagnosticData, AppointmentData } from '../services/supabaseService';
import { BRAND_CONFIG } from '../data/content';

interface OwnerDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSupabase?: () => void;
}

export const OwnerDashboardModal: React.FC<OwnerDashboardModalProps> = ({
  isOpen,
  onClose,
  onOpenSupabase
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'orders' | 'diagnostics' | 'appointments' | 'privacy'>('orders');

  // Dashboard Data
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [diagnostics, setDiagnostics] = useState<SkinDiagnosticData[]>([]);
  const [appointments, setAppointments] = useState<AppointmentData[]>([]);
  const [successToast, setSuccessToast] = useState('');

  useEffect(() => {
    supabaseService.ensureSampleData();
    const isAuth = authService.isOwnerAuthenticated();
    setIsAuthenticated(isAuth);
    if (isAuth) {
      loadData();
    }
  }, [isOpen]);

  const loadData = () => {
    const data = supabaseService.getStoredRecords();
    setOrders(data.orders);
    setDiagnostics(data.diagnostics);
    setAppointments(data.appointments);
  };

  if (!isOpen) return null;

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    const res = authService.loginOwner(passwordInput);
    if (res.success) {
      setIsAuthenticated(true);
      setPasswordInput('');
      loadData();
    } else {
      setErrorMessage(res.error || 'Senha incorreta.');
    }
  };

  const handleLock = () => {
    authService.logoutOwner();
    setIsAuthenticated(false);
    setPasswordInput('');
  };

  const handleStatusChange = async (orderNumber: string, newStatus: string) => {
    await supabaseService.updateOrderStatus(orderNumber, newStatus);
    loadData();
    showToast(`Status do pedido #${orderNumber} atualizado para ${newStatus}!`);
  };

  const handleAppointmentStatusChange = async (patientName: string, newStatus: string) => {
    await supabaseService.updateAppointmentStatus(patientName, newStatus);
    loadData();
    showToast(`Status do agendamento de ${patientName} atualizado!`);
  };

  const showToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(''), 3000);
  };

  // Cálculos financeiros do proprietário
  const totalRevenue = orders.reduce((acc, curr) => acc + (curr.total || 0), 0);
  const totalOrdersCount = orders.length;
  const totalDiagnosticsCount = diagnostics.length;
  const totalAppointmentsCount = appointments.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-4xl bg-[#FFFFFF] rounded-3xl shadow-2xl border border-[#D4AF37]/50 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-[#141210] px-6 py-4 flex items-center justify-between text-[#FAF7F2] border-b border-[#3A332B] shrink-0">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-md ${isAuthenticated ? 'bg-[#2E7D32]' : 'bg-[#B8860B]'}`}>
              {isAuthenticated ? <Unlock className="w-5 h-5 text-white" /> : <Lock className="w-5 h-5 text-white" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-luxury text-xl font-bold text-[#E8D39E]">
                  Área do Proprietário & Gestão Clínica
                </h3>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase border ${
                  isAuthenticated 
                    ? 'bg-[#1B5E20]/50 text-[#81C784] border-[#2E7D32]' 
                    : 'bg-[#3E2723]/50 text-[#FFCC80] border-[#8D6E63]'
                }`}>
                  {isAuthenticated ? 'Desbloqueado' : 'Acesso Protegido'}
                </span>
              </div>
              <p className="text-xs text-[#A89D8E]">
                {isAuthenticated 
                  ? 'Painel confidencial de faturamento, pedidos e prontuários' 
                  : 'Cadeado de segurança ativo. Insira sua senha de proprietário'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={handleLock}
                className="px-3 py-1.5 rounded-xl bg-[#2A231C] hover:bg-[#3D3328] text-xs font-semibold text-[#E8D39E] border border-[#524434] flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Trancar painel imediatamente"
              >
                <Lock className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Trancar Cadeado</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 text-[#C4B7A5] hover:text-white transition-colors cursor-pointer"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Toast Notifier */}
        {successToast && (
          <div className="bg-[#2E7D32] text-white text-xs py-2 px-4 text-center font-bold animate-fade-in flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{successToast}</span>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-[#FBF9F6]">
          {!isAuthenticated ? (
            /* ============================================================ */
            /* TELA DE DESBLOQUEIO COM CADEADO (SENHA: lopes123) */
            /* ============================================================ */
            <div className="max-w-md mx-auto py-8 space-y-6 text-center">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-[#D4AF37] to-[#8C6B1B] text-white mx-auto flex items-center justify-center shadow-lg">
                <Lock className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h4 className="font-luxury text-2xl font-bold text-[#1A1816]">
                  Acesso Restrito ao Proprietário
                </h4>
                <p className="text-xs text-[#7A7165] leading-relaxed max-w-sm mx-auto">
                  Este painel contém dados sigilosos de pacientes, faturamento financeiro e gestão de vendas da clínica Lopes Beautiflyur.
                </p>
              </div>

              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-[#FDEDED] border border-[#F5C2C7] text-xs text-[#D32F2F] flex items-center justify-center gap-2 text-left">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleUnlock} className="space-y-4 text-left">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-[#3B342B] flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-[#B8860B]" />
                      Senha do Proprietário
                    </label>
                    <span className="text-[11px] text-[#8C6B1B] font-mono">
                      (Senha: lopes123)
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      placeholder="Digite a senha lopes123..."
                      className="w-full px-4 py-3.5 pr-10 rounded-2xl border-2 border-[#D9CEBF] focus:border-[#B8860B] focus:ring-2 focus:ring-[#B8860B]/20 outline-none text-sm bg-white font-mono"
                      autoFocus
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
                  className="w-full py-3.5 px-4 bg-[#1A1816] hover:bg-black text-[#FAF7F2] font-bold text-sm rounded-2xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 group"
                >
                  <Unlock className="w-4 h-4 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                  <span>Desbloquear Painel Executivo</span>
                </button>

                <div className="p-3 rounded-xl bg-[#FAF6EE] border border-[#E8DFC9] flex items-center justify-between text-xs text-[#70665A]">
                  <span>Senha de Gestão Configurada:</span>
                  <button
                    type="button"
                    onClick={() => setPasswordInput(OWNER_CORRECT_PASSWORD)}
                    className="font-bold text-[#8A6317] hover:underline"
                  >
                    Preencher "lopes123"
                  </button>
                </div>
              </form>

              <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-[#948A7C]">
                <ShieldCheck className="w-4 h-4 text-[#2E7D32]" />
                <span>Criptografia de sessão & conformidade LGPD</span>
              </div>
            </div>
          ) : (
            /* ============================================================ */
            /* PAINEL DO PROPRIETÁRIO DESBLOQUEADO */
            /* ============================================================ */
            <div className="space-y-6">
              {/* Cards de Métricas Principais */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="p-4 rounded-2xl bg-white border border-[#E2D9CC] shadow-xs space-y-1">
                  <div className="flex items-center justify-between text-[#8A6317]">
                    <span className="text-[11px] font-bold uppercase tracking-wider">Faturamento Total</span>
                    <TrendingUp className="w-4 h-4 text-[#2E7D32]" />
                  </div>
                  <div className="text-xl font-bold text-[#1A1816]">
                    R$ {totalRevenue.toFixed(2).replace('.', ',')}
                  </div>
                  <span className="text-[10px] text-[#2E7D32] font-semibold">
                    {totalOrdersCount} pedidos processados
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#E2D9CC] shadow-xs space-y-1">
                  <div className="flex items-center justify-between text-[#8A6317]">
                    <span className="text-[11px] font-bold uppercase tracking-wider">Pedidos de Sérum</span>
                    <ShoppingBag className="w-4 h-4 text-[#B8860B]" />
                  </div>
                  <div className="text-xl font-bold text-[#1A1816]">
                    {totalOrdersCount}
                  </div>
                  <span className="text-[10px] text-[#7A7165]">
                    Loja online & WhatsApp
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#E2D9CC] shadow-xs space-y-1">
                  <div className="flex items-center justify-between text-[#8A6317]">
                    <span className="text-[11px] font-bold uppercase tracking-wider">Diagnósticos Quiz</span>
                    <Sparkles className="w-4 h-4 text-[#B8860B]" />
                  </div>
                  <div className="text-xl font-bold text-[#1A1816]">
                    {totalDiagnosticsCount}
                  </div>
                  <span className="text-[10px] text-[#7A7165]">
                    Prontuários registrados
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#E2D9CC] shadow-xs space-y-1">
                  <div className="flex items-center justify-between text-[#8A6317]">
                    <span className="text-[11px] font-bold uppercase tracking-wider">Procedimentos</span>
                    <Calendar className="w-4 h-4 text-[#2E7D32]" />
                  </div>
                  <div className="text-xl font-bold text-[#1A1816]">
                    {totalAppointmentsCount}
                  </div>
                  <span className="text-[10px] text-[#7A7165]">
                    Agendamentos na clínica
                  </span>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="flex items-center justify-between border-b border-[#E2D9CC] pb-2 gap-2 flex-wrap">
                <div className="flex items-center gap-2 overflow-x-auto">
                  <button
                    onClick={() => setActiveTab('orders')}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
                      activeTab === 'orders' ? 'bg-[#1A1816] text-white shadow-xs' : 'text-[#70665A] hover:bg-[#F2ECE1]'
                    }`}
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-[#E8D39E]" />
                    Pedidos de Clientes ({orders.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('diagnostics')}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
                      activeTab === 'diagnostics' ? 'bg-[#1A1816] text-white shadow-xs' : 'text-[#70665A] hover:bg-[#F2ECE1]'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#E8D39E]" />
                    Prontuários de Pele ({diagnostics.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('appointments')}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
                      activeTab === 'appointments' ? 'bg-[#1A1816] text-white shadow-xs' : 'text-[#70665A] hover:bg-[#F2ECE1]'
                    }`}
                  >
                    <Calendar className="w-3.5 h-3.5 text-[#E8D39E]" />
                    Agenda Clínica ({appointments.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('privacy')}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
                      activeTab === 'privacy' ? 'bg-[#1A1816] text-white shadow-xs' : 'text-[#70665A] hover:bg-[#F2ECE1]'
                    }`}
                  >
                    <Lock className="w-3.5 h-3.5 text-[#E8D39E]" />
                    Privacidade & Cadeado
                  </button>
                </div>

                {onOpenSupabase && (
                  <button
                    onClick={onOpenSupabase}
                    className="px-3 py-1.5 rounded-xl border border-[#D9CEBF] bg-white hover:bg-[#FAF8F5] text-xs font-semibold text-[#5A5144] flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <Database className="w-3.5 h-3.5 text-[#2E7D32]" />
                    <span>Conexão Supabase</span>
                  </button>
                )}
              </div>

              {/* ABA: PEDIDOS DE CLIENTES */}
              {activeTab === 'orders' && (
                <div className="space-y-4">
                  {orders.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-[#D9CEBF]">
                      <p className="text-sm font-bold text-[#1A1816]">Nenhum pedido registrado ainda</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {orders.map((order, idx) => {
                        const cleanPhone = (order.customerPhone || '').replace(/\D/g, '');
                        const waLink = cleanPhone ? `https://wa.me/55${cleanPhone}?text=${encodeURIComponent(`Olá ${order.customerName}, aqui é da Lopes Beautiflyur referente ao seu pedido #${order.orderNumber}.`)}` : null;

                        return (
                          <div key={idx} className="p-4 rounded-2xl bg-white border border-[#E2D9CC] shadow-xs space-y-3">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F0EBE1] pb-3">
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-sm text-[#1A1816]">Pedido #{order.orderNumber}</span>
                                  <span className="text-xs text-[#7A7165]">• {order.customerName}</span>
                                </div>
                                <div className="flex items-center gap-3 text-xs text-[#7A7165] pt-0.5">
                                  <span>Tel: {order.customerPhone}</span>
                                  {order.customerEmail && <span>Email: {order.customerEmail}</span>}
                                </div>
                              </div>

                              <div className="flex items-center gap-3">
                                {/* Seletor de Status em tempo real */}
                                <div className="space-y-0.5 text-right">
                                  <span className="text-[10px] text-[#7A7165] block uppercase font-semibold">Alterar Status</span>
                                  <select
                                    value={order.status || 'pending'}
                                    onChange={(e) => handleStatusChange(order.orderNumber, e.target.value)}
                                    className="px-2.5 py-1 rounded-xl text-xs font-bold border border-[#D9CEBF] bg-white focus:border-[#B8860B] outline-none cursor-pointer"
                                  >
                                    <option value="pending">⏳ Pendente</option>
                                    <option value="paid">✅ Pago & Confirmado</option>
                                    <option value="preparing">🧪 Em Preparação</option>
                                    <option value="shipped">🚚 Enviado com Rastreio</option>
                                    <option value="delivered">📦 Entregue</option>
                                  </select>
                                </div>

                                <div className="text-right pl-2">
                                  <span className="text-[10px] text-[#7A7165] block uppercase font-semibold">Total</span>
                                  <span className="text-base font-bold text-[#8C6B1B]">
                                    R$ {order.total.toFixed(2).replace('.', ',')}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Itens comprados */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-[#FAF8F5] p-3 rounded-xl border border-[#EAE3D4]">
                              <div>
                                <span className="text-[10px] text-[#7A7165] block uppercase font-bold">Itens da Compra</span>
                                <ul className="space-y-1 pt-1">
                                  {order.items.map((item, i) => (
                                    <li key={i} className="font-medium text-[#2C2926]">
                                      • {item.name} ({item.volume}) - Qtd: {item.quantity}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <span className="text-[10px] text-[#7A7165] block uppercase font-bold">Endereço & Pagamento</span>
                                <p className="pt-1 text-[#332A1F]">
                                  {order.customerAddress?.street || 'Retirada na Clínica / Entrega Expressa'}
                                </p>
                                <p className="text-[11px] text-[#70665A]">
                                  Método: <strong>{order.paymentMethod}</strong>
                                </p>
                              </div>
                            </div>

                            {/* Ações Rápidas de Atendimento */}
                            <div className="flex items-center justify-between pt-1">
                              {waLink && (
                                <a
                                  href={waLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs font-bold text-[#2E7D32] hover:underline flex items-center gap-1.5"
                                >
                                  <Phone className="w-3.5 h-3.5" /> Falar com Cliente no WhatsApp
                                </a>
                              )}
                              {order.notes && (
                                <span className="text-[11px] text-[#70665A] italic">
                                  Obs: {order.notes}
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* ABA: PRONTUÁRIOS DE PELE (QUIZ) */}
              {activeTab === 'diagnostics' && (
                <div className="space-y-4">
                  {diagnostics.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-[#D9CEBF]">
                      <p className="text-sm font-bold text-[#1A1816]">Nenhum diagnóstico registrado ainda</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {diagnostics.map((diag, idx) => {
                        const cleanPhone = (diag.userPhone || '').replace(/\D/g, '');
                        const waLink = cleanPhone ? `https://wa.me/55${cleanPhone}?text=${encodeURIComponent(`Olá ${diag.userName || 'Paciente'}, aqui é da Lopes Beautiflyur. Analisamos seu diagnóstico de pele e preparamos a orientação da fórmula ideal.`)}` : null;

                        return (
                          <div key={idx} className="p-4 rounded-2xl bg-white border border-[#E2D9CC] shadow-xs space-y-3">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F0EBE1] pb-2.5">
                              <div>
                                <span className="font-bold text-sm text-[#1A1816]">{diag.userName || 'Paciente Quiz'}</span>
                                <div className="text-xs text-[#7A7165]">
                                  Tel: {diag.userPhone || 'Não informado'} {diag.userEmail ? `• ${diag.userEmail}` : ''}
                                </div>
                              </div>
                              {waLink && (
                                <a
                                  href={waLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-3 py-1.5 bg-[#E8F5E9] text-[#2E7D32] border border-[#C8E6C9] rounded-xl text-xs font-bold flex items-center gap-1 hover:bg-[#C8E6C9] transition-colors"
                                >
                                  <Phone className="w-3.5 h-3.5" /> Chamar no WhatsApp
                                </a>
                              )}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                              <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#EAE3D4]">
                                <span className="text-[10px] text-[#7A7165] uppercase font-bold block">Perfil Clínico</span>
                                <p className="font-bold text-[#1A1816]">{diag.skinType}</p>
                                <p className="text-[#6E5C38] pt-0.5">Preocupação: {diag.mainConcern}</p>
                              </div>
                              <div className="p-3 rounded-xl bg-[#FFFBF2] border border-[#F0E0BF]">
                                <span className="text-[10px] text-[#8A6317] uppercase font-bold block">Fórmula & Tratamento</span>
                                <p className="font-bold text-[#1A1816]">{diag.recommendedFormula}</p>
                                <p className="text-[#6E5C38] pt-0.5">Protocolo: {diag.recommendedProtocol}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* ABA: AGENDA CLÍNICA */}
              {activeTab === 'appointments' && (
                <div className="space-y-4">
                  {appointments.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-[#D9CEBF]">
                      <p className="text-sm font-bold text-[#1A1816]">Nenhum agendamento pendente</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {appointments.map((appt, idx) => {
                        const cleanPhone = (appt.patientPhone || '').replace(/\D/g, '');
                        const waLink = cleanPhone ? `https://wa.me/55${cleanPhone}?text=${encodeURIComponent(`Olá ${appt.patientName}, aqui é da Lopes Beautiflyur confirmando sua consulta de ${appt.procedureName}.`)}` : null;

                        return (
                          <div key={idx} className="p-4 rounded-2xl bg-white border border-[#E2D9CC] shadow-xs space-y-3">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F0EBE1] pb-2.5">
                              <div>
                                <span className="font-bold text-sm text-[#1A1816]">{appt.patientName}</span>
                                <span className="text-xs text-[#7A7165] block">Tel: {appt.patientPhone}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleAppointmentStatusChange(appt.patientName, appt.status === 'confirmed' ? 'requested' : 'confirmed')}
                                  className={`px-3 py-1 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                                    appt.status === 'confirmed'
                                      ? 'bg-[#E8F5E9] text-[#2E7D32] border-[#C8E6C9]'
                                      : 'bg-[#FFF8E1] text-[#B8860B] border-[#FFE082]'
                                  }`}
                                >
                                  {appt.status === 'confirmed' ? '✅ Confirmado' : '⏳ Solicitado'}
                                </button>
                                {waLink && (
                                  <a
                                    href={waLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-1.5 rounded-xl bg-[#E8F5E9] text-[#2E7D32] hover:bg-[#C8E6C9]"
                                    title="WhatsApp do paciente"
                                  >
                                    <Phone className="w-4 h-4" />
                                  </a>
                                )}
                              </div>
                            </div>
                            <div className="text-xs text-[#7A7165] flex flex-wrap gap-4">
                              <span>Procedimento: <strong className="text-[#1A1816]">{appt.procedureName}</strong></span>
                              {appt.preferredDate && <span>Data: <strong>{appt.preferredDate}</strong></span>}
                              {appt.preferredTime && <span>Horário: <strong>{appt.preferredTime}</strong></span>}
                              {appt.clinicSpace && <span>Sala: <strong>{appt.clinicSpace}</strong></span>}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* ABA: PRIVACIDADE & CADEADO */}
              {activeTab === 'privacy' && (
                <div className="space-y-4">
                  <div className="p-5 rounded-2xl bg-white border border-[#E2D9CC] space-y-3">
                    <div className="flex items-center gap-2 text-[#8C6B1B] font-bold text-sm">
                      <ShieldCheck className="w-5 h-5 text-[#2E7D32]" />
                      <span>Proteção de Privacidade & LGPD Clínica</span>
                    </div>
                    <p className="text-xs text-[#70665A] leading-relaxed">
                      O acesso a prontuários estéticos e diagnósticos de pele é resguardado pelo sigilo biomédico/estético e pela Lei Geral de Proteção de Dados (LGPD). A visualização é restrita exclusivamente ao proprietário autorizado com o cadeado configurado.
                    </p>
                    <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EAE3D4] text-xs text-[#332A1F] space-y-1">
                      <div className="flex items-center justify-between font-bold">
                        <span>Chave de Acesso do Proprietário:</span>
                        <span className="font-mono text-[#8C6B1B] bg-white px-2 py-0.5 rounded border border-[#D9CEBF]">
                          {OWNER_CORRECT_PASSWORD}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#7A7165]">
                        Para trancar a visualização quando se afastar da tela, clique no botão "Trancar Cadeado" no canto superior direito.
                      </p>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={handleLock}
                        className="px-4 py-2 rounded-xl bg-[#1A1816] text-[#E8D39E] text-xs font-bold flex items-center gap-1.5 cursor-pointer hover:bg-black"
                      >
                        <Lock className="w-3.5 h-3.5" /> Trancar Painel Agora
                      </button>
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
