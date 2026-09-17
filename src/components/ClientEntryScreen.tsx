import React, { useState } from 'react';
import { 
  Sparkles, Mail, Lock, User, Phone, Eye, EyeOff, 
  ArrowRight, ShieldCheck, CheckCircle2, Gift, RefreshCw, AlertCircle,
  ShoppingBag, PackageCheck, CreditCard, ArrowUpRight
} from 'lucide-react';
import { authService } from '../services/authService';
import { ClientUser } from '../types';
import { BRAND_CONFIG, STRIPE_DIRECT_PAYMENT_URL } from '../data/content';

interface ClientEntryScreenProps {
  onEnter: (user?: ClientUser | null) => void;
}

export const ClientEntryScreen: React.FC<ClientEntryScreenProps> = ({ onEnter }) => {
  const [tab, setTab] = useState<'register' | 'login'>('register');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Cadastro de Novo Cliente
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const res = await authService.registerClient(name, email, phone, password);
      setIsLoading(false);
      if (res.success && res.user) {
        onEnter(res.user);
      } else {
        setErrorMessage(res.error || 'Erro ao realizar cadastro.');
      }
    } catch {
      setIsLoading(false);
      setErrorMessage('Ocorreu uma falha ao cadastrar. Tente novamente.');
    }
  };

  // Login com E-mail e Senha
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const res = await authService.loginWithPassword(email, password);
      setIsLoading(false);
      if (res.success && res.user) {
        onEnter(res.user);
      } else {
        setErrorMessage(res.error || 'Falha ao autenticar.');
      }
    } catch {
      setIsLoading(false);
      setErrorMessage('Erro ao autenticar. Verifique seus dados.');
    }
  };

  // Acesso direto com Gmail / Google
  const handleGmailConnect = async () => {
    setIsLoading(true);
    setErrorMessage('');
    const targetEmail = email && email.includes('@') ? email : 'cliente.lopes@gmail.com';
    const targetName = name || undefined;

    try {
      const res = await authService.loginWithGmail(targetEmail, targetName);
      setIsLoading(false);
      if (res.success && res.user) {
        onEnter(res.user);
      } else {
        setErrorMessage(res.error || 'Erro ao conectar via Gmail.');
      }
    } catch {
      setIsLoading(false);
      setErrorMessage('Não foi possível conectar com o Gmail no momento.');
    }
  };

  // Continuar como visitante/convidado
  const handleGuestEntry = () => {
    onEnter(null);
  };

  return (
    <div className="min-h-screen bg-[#141210] text-[#FAF7F2] flex flex-col justify-between relative overflow-hidden selection:bg-[#D4AF37] selection:text-black">
      {/* Background Ambience / Glow Elements */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#8C6B1B]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Brand Bar */}
      <header className="relative z-10 w-full max-w-5xl mx-auto px-6 pt-8 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E8D39E] via-[#D4AF37] to-[#8C6B1B] p-0.5 flex items-center justify-center shadow-lg">
            <div className="w-full h-full rounded-full bg-[#141210] flex items-center justify-center">
              <span className="font-luxury font-bold text-base text-[#E8D39E] tracking-tighter">LB</span>
            </div>
          </div>
          <div>
            <h1 className="font-luxury text-lg font-bold tracking-wide text-[#E8D39E]">
              {BRAND_CONFIG.name}
            </h1>
            <p className="text-[10px] tracking-widest uppercase text-[#A89D8E]">
              Cosmecêuticos & Estética Facial Avançada
            </p>
          </div>
        </div>

        <button
          onClick={handleGuestEntry}
          className="text-xs font-semibold text-[#C4B7A5] hover:text-[#E8D39E] flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <span>Pular & Explorar Loja</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </header>

      {/* Main Registration & Access Gate */}
      <main className="relative z-10 w-full max-w-md mx-auto px-4 sm:px-6 py-6 flex-1 flex flex-col justify-center">
        <div className="bg-[#1E1B17]/90 backdrop-blur-md rounded-3xl border border-[#D4AF37]/35 p-6 sm:p-8 shadow-2xl space-y-6">
          
          {/* Welcome Intro */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#E8D39E] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Acesso Exclusivo à Boutique & Clínica</span>
            </div>
            <h2 className="font-luxury text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {tab === 'register' ? 'Cadastre-se para Entrar' : 'Bem-vinda de Volta'}
            </h2>
            <p className="text-xs text-[#A89D8E] leading-relaxed">
              {tab === 'register' 
                ? 'Crie seu cadastro para liberar 15% OFF de boas-vindas, diagnóstico de pele e acompanhamento de pedidos.'
                : 'Acesse seus pedidos de Sérum Facial e histórico de diagnóstico.'}
            </p>
          </div>

          {/* Quick Gmail Button */}
          <div className="space-y-3">
            <button
              type="button"
              onClick={handleGmailConnect}
              disabled={isLoading}
              className="w-full py-3.5 px-4 bg-white hover:bg-[#F7F4EE] text-[#1A1816] font-bold text-xs sm:text-sm rounded-2xl flex items-center justify-center gap-3 transition-all shadow-md hover:shadow-lg cursor-pointer group"
            >
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Continuar com Gmail / Google</span>
            </button>

            <div className="flex items-center gap-3 my-2">
              <div className="h-px bg-[#3E3831] flex-1" />
              <span className="text-[10px] uppercase tracking-wider text-[#8A7F71] font-semibold">
                ou preencha os dados
              </span>
              <div className="h-px bg-[#3E3831] flex-1" />
            </div>
          </div>

          {/* Tab Switcher: Cadastro vs Já sou Cliente */}
          <div className="grid grid-cols-2 p-1 bg-[#141210] rounded-2xl border border-[#3E3831]">
            <button
              type="button"
              onClick={() => {
                setTab('register');
                setErrorMessage('');
              }}
              className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                tab === 'register' 
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#AA8423] text-black shadow-md' 
                  : 'text-[#A89D8E] hover:text-white'
              }`}
            >
              Criar Cadastro
            </button>
            <button
              type="button"
              onClick={() => {
                setTab('login');
                setErrorMessage('');
              }}
              className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                tab === 'login' 
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#AA8423] text-black shadow-md' 
                  : 'text-[#A89D8E] hover:text-white'
              }`}
            >
              Já sou Cadastrada
            </button>
          </div>

          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-[#3B1717] border border-[#7A2B2B] text-xs text-[#FF8E8E] flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {tab === 'register' ? (
            /* FORMULÁRIO DE CADASTRO */
            <form onSubmit={handleRegister} className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#DFC28A] flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Nome Completo
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="ex: Rafaela Oliveira"
                  className="w-full px-4 py-3 rounded-xl bg-[#141210] border border-[#453D32] focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] text-white text-xs sm:text-sm outline-none placeholder-[#6B6154]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#DFC28A] flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                  E-mail ou Gmail
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ex: seu.email@gmail.com"
                  className="w-full px-4 py-3 rounded-xl bg-[#141210] border border-[#453D32] focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] text-white text-xs sm:text-sm outline-none placeholder-[#6B6154]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#DFC28A] flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                  WhatsApp / Celular
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(11) 99999-9999"
                  className="w-full px-4 py-3 rounded-xl bg-[#141210] border border-[#453D32] focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] text-white text-xs sm:text-sm outline-none placeholder-[#6B6154]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#DFC28A] flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Crie sua Senha
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mínimo 4 caracteres"
                    className="w-full px-4 py-3 pr-10 rounded-xl bg-[#141210] border border-[#453D32] focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] text-white text-xs sm:text-sm outline-none placeholder-[#6B6154]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A7F71] hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Benefício em destaque */}
              <div className="p-3 rounded-xl bg-[#282218] border border-[#52442E] flex items-center gap-2.5 text-xs text-[#E8D39E]">
                <Gift className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Cadastre-se agora e ganhe <strong>15% OFF</strong> no seu primeiro frasco de Sérum Facial!</span>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-[#E8D39E] via-[#D4AF37] to-[#AA8423] text-black font-bold text-xs sm:text-sm rounded-2xl shadow-lg hover:opacity-95 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <RefreshCw className="w-4 h-4 animate-spin text-black" />
                ) : (
                  <>
                    <span>Cadastrar e Entrar na Boutique</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            /* FORMULÁRIO DE LOGIN */
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#DFC28A] flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                  E-mail ou Gmail Cadastrado
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ex: seu.email@gmail.com"
                  className="w-full px-4 py-3 rounded-xl bg-[#141210] border border-[#453D32] focus:border-[#D4AF37] text-white text-xs sm:text-sm outline-none placeholder-[#6B6154]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#DFC28A] flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Sua Senha
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Digite sua senha"
                    className="w-full px-4 py-3 pr-10 rounded-xl bg-[#141210] border border-[#453D32] focus:border-[#D4AF37] text-white text-xs sm:text-sm outline-none placeholder-[#6B6154]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A7F71] hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-[#E8D39E] via-[#D4AF37] to-[#AA8423] text-black font-bold text-xs sm:text-sm rounded-2xl shadow-lg hover:opacity-95 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <RefreshCw className="w-4 h-4 animate-spin text-black" />
                ) : (
                  <>
                    <span>Entrar na Minha Conta</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Guest Entry Alternative & Direct Marketplace Links */}
          <div className="pt-3 text-center border-t border-[#3E3831]/70 space-y-3">
            <button
              type="button"
              onClick={handleGuestEntry}
              className="text-xs text-[#A89D8E] hover:text-[#E8D39E] transition-colors font-medium hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Prefiro navegar primeiro e cadastrar depois</span>
              <ArrowRight className="w-3 h-3" />
            </button>

            <div className="pt-2">
              <p className="text-[11px] text-[#A89D8E] mb-2 font-medium">Ou compre direto nas nossas lojas oficiais:</p>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={BRAND_CONFIG.mercadoLivreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-xl bg-[#2A2418] hover:bg-[#382F1D] border border-[#FFE785]/40 text-[#FFE785] text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all"
                >
                  <PackageCheck className="w-3.5 h-3.5 text-[#FFE785]" />
                  <span>Mercado Livre</span>
                </a>
                <a
                  href={BRAND_CONFIG.shopeeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-xl bg-[#2C1917] hover:bg-[#3D211E] border border-[#FF8C6B]/40 text-[#FF9E85] text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-[#FF7A59]" />
                  <span>Shopee Oficial</span>
                </a>
              </div>

              <a
                href={STRIPE_DIRECT_PAYMENT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#2A2318] via-[#382F1D] to-[#2A2318] hover:border-[#DFC28A] border border-[#DFC28A]/40 text-[#DFC28A] text-[11px] font-bold flex items-center justify-center gap-2 transition-all mt-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#DFC28A]" />
                <span>1 Catálogo Especial • 2 Produtos Inclusos (Stripe)</span>
                <ArrowUpRight className="w-3 h-3 text-[#DFC28A]" />
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Security Badges */}
      <footer className="relative z-10 py-6 text-center text-[11px] text-[#786F63] flex flex-wrap items-center justify-center gap-4 px-4">
        <span className="flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-[#2E7D32]" />
          Ambiente Seguro LGPD
        </span>
        <span>•</span>
        <span>Cosmecêuticos Registrados na Anvisa</span>
        <span>•</span>
        <span>Clínica Lopes Beautiflyur</span>
      </footer>
    </div>
  );
};
