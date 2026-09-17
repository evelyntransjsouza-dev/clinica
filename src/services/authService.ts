import { getSupabaseClient } from '../lib/supabase';
import { ClientUser } from '../types';

const CLIENT_STORAGE_KEY = 'LB_CURRENT_CLIENT';
const OWNER_AUTH_KEY = 'LB_OWNER_AUTHENTICATED';
export const OWNER_CORRECT_PASSWORD = 'lopes123';

export const authService = {
  // ==========================================
  // ÁREA DO CLIENTE (GMAIL & SENHA)
  // ==========================================
  getCurrentClient(): ClientUser | null {
    try {
      const stored = localStorage.getItem(CLIENT_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  },

  async loginWithGmail(email: string, name?: string): Promise<{ success: boolean; user?: ClientUser; error?: string }> {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      return { success: false, error: 'Por favor, informe um endereço de Gmail/e-mail válido.' };
    }

    const displayName = name || cleanEmail.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

    const client: ClientUser = {
      id: `client_${Date.now()}`,
      name: displayName,
      email: cleanEmail,
      isVip: true,
      memberSince: new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
    };

    // Tenta autenticação nativa do Supabase se o client estiver conectado
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        await supabase.from('leads').insert({
          name: client.name,
          email: client.email,
          channel: 'client_portal_gmail',
          interest: 'serum_skincare_vip'
        });
      } catch (e) {
        console.warn('Registro de login no Supabase (não bloqueante):', e);
      }
    }

    try {
      localStorage.setItem(CLIENT_STORAGE_KEY, JSON.stringify(client));
    } catch {
      // ignore
    }

    return { success: true, user: client };
  },

  async loginWithPassword(email: string, password: string): Promise<{ success: boolean; user?: ClientUser; error?: string }> {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      return { success: false, error: 'E-mail inválido.' };
    }
    if (!password || password.length < 4) {
      return { success: false, error: 'A senha deve conter pelo menos 4 caracteres.' };
    }

    // Procura se o cliente já tinha cadastro salvo localmente
    const registeredClientsRaw = localStorage.getItem('LB_REGISTERED_CLIENTS');
    const registeredClients: Array<ClientUser & { passwordHash?: string }> = registeredClientsRaw 
      ? JSON.parse(registeredClientsRaw) 
      : [];

    const found = registeredClients.find(c => c.email.toLowerCase() === cleanEmail);

    let clientUser: ClientUser;
    if (found) {
      clientUser = {
        id: found.id,
        name: found.name,
        email: found.email,
        phone: found.phone,
        isVip: true,
        memberSince: found.memberSince || 'Recente'
      };
    } else {
      // Cria o perfil para acesso imediato
      clientUser = {
        id: `client_${Date.now()}`,
        name: cleanEmail.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        email: cleanEmail,
        isVip: true,
        memberSince: new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
      };
    }

    try {
      localStorage.setItem(CLIENT_STORAGE_KEY, JSON.stringify(clientUser));
    } catch {
      // ignore
    }

    return { success: true, user: clientUser };
  },

  async registerClient(name: string, email: string, phone: string, password: string): Promise<{ success: boolean; user?: ClientUser; error?: string }> {
    const cleanEmail = email.trim().toLowerCase();
    if (!name.trim()) return { success: false, error: 'Informe seu nome completo.' };
    if (!cleanEmail.includes('@')) return { success: false, error: 'Informe um e-mail válido.' };
    if (password.length < 4) return { success: false, error: 'A senha precisa de no mínimo 4 caracteres.' };

    const newUser: ClientUser = {
      id: `client_${Date.now()}`,
      name: name.trim(),
      email: cleanEmail,
      phone: phone.trim(),
      isVip: true,
      memberSince: new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
    };

    // Salva na lista de clientes registrados
    try {
      const existing = localStorage.getItem('LB_REGISTERED_CLIENTS');
      const list = existing ? JSON.parse(existing) : [];
      list.push(newUser);
      localStorage.setItem('LB_REGISTERED_CLIENTS', JSON.stringify(list));
      localStorage.setItem(CLIENT_STORAGE_KEY, JSON.stringify(newUser));
    } catch {
      // ignore
    }

    // Notifica o Supabase se configurado
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        await supabase.from('leads').insert({
          name: newUser.name,
          email: newUser.email,
          phone: newUser.phone,
          channel: 'cadastro_cliente',
          interest: 'cadastro_portal'
        });
      } catch (e) {
        console.warn('Erro ao registrar lead no Supabase:', e);
      }
    }

    return { success: true, user: newUser };
  },

  logoutClient(): void {
    try {
      localStorage.removeItem(CLIENT_STORAGE_KEY);
    } catch {
      // ignore
    }
  },

  // ==========================================
  // ÁREA DO PROPRIETÁRIO (SENHA: lopes123)
  // ==========================================
  isOwnerAuthenticated(): boolean {
    try {
      return sessionStorage.getItem(OWNER_AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  },

  loginOwner(password: string): { success: boolean; error?: string } {
    if (password.trim() === OWNER_CORRECT_PASSWORD) {
      try {
        sessionStorage.setItem(OWNER_AUTH_KEY, 'true');
      } catch {
        // ignore
      }
      return { success: true };
    }
    return { 
      success: false, 
      error: 'Senha incorreta. O acesso com cadeado é exclusivo do proprietário da clínica.' 
    };
  },

  logoutOwner(): void {
    try {
      sessionStorage.removeItem(OWNER_AUTH_KEY);
    } catch {
      // ignore
    }
  }
};
