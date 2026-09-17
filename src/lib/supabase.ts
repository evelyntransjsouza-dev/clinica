import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Get credentials from environment variables or custom runtime storage
const getEnvCredentials = () => {
  const metaEnv = (import.meta as any).env || {};
  const envUrl = metaEnv.VITE_SUPABASE_URL || '';
  const envKey = metaEnv.VITE_SUPABASE_ANON_KEY || '';

  // Check if user set credentials via the in-app Supabase Connection Panel
  let localUrl = '';
  let localKey = '';
  try {
    localUrl = localStorage.getItem('LB_SUPABASE_URL') || '';
    localKey = localStorage.getItem('LB_SUPABASE_KEY') || '';
  } catch {
    // ignore
  }

  const url = (localUrl || envUrl).trim();
  const key = (localKey || envKey).trim();

  return { url, key, isCustom: !!localUrl };
};

let supabaseInstance: SupabaseClient | null = null;
let lastUsedUrl = '';
let lastUsedKey = '';

export const getSupabaseClient = (): SupabaseClient | null => {
  const { url, key } = getEnvCredentials();

  if (!url || !key) {
    return null;
  }

  // Re-instantiate if keys changed
  if (!supabaseInstance || lastUsedUrl !== url || lastUsedKey !== key) {
    try {
      supabaseInstance = createClient(url, key, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
        },
      });
      lastUsedUrl = url;
      lastUsedKey = key;
    } catch (err) {
      console.warn('Falha ao inicializar o cliente Supabase:', err);
      return null;
    }
  }

  return supabaseInstance;
};

export const isSupabaseConfigured = (): boolean => {
  const { url, key } = getEnvCredentials();
  return Boolean(url && key && url.startsWith('http'));
};

export const getSupabaseConfig = () => {
  return getEnvCredentials();
};

export const saveCustomSupabaseConfig = (url: string, key: string) => {
  try {
    if (url && key) {
      localStorage.setItem('LB_SUPABASE_URL', url.trim());
      localStorage.setItem('LB_SUPABASE_KEY', key.trim());
    } else {
      localStorage.removeItem('LB_SUPABASE_URL');
      localStorage.removeItem('LB_SUPABASE_KEY');
    }
    // Reset instance so next call reloads
    supabaseInstance = null;
    lastUsedUrl = '';
    lastUsedKey = '';
    return true;
  } catch {
    return false;
  }
};

export const testSupabaseConnection = async (): Promise<{ success: boolean; message: string }> => {
  const client = getSupabaseClient();
  if (!client) {
    return {
      success: false,
      message: 'Credenciais ausentes. Forneça a URL do Projeto e a Anon Key do Supabase.',
    };
  }

  try {
    // Try to query public.products or test basic REST endpoint
    const { data, error } = await client.from('products').select('count', { count: 'exact', head: true });
    
    if (error) {
      // If table doesn't exist yet, but credentials are valid, Supabase returns 404 or specific code
      if (error.code === '42P01' || error.message?.includes('relation "public.products" does not exist')) {
        return {
          success: true,
          message: 'Conectado ao Supabase com sucesso! Apenas execute o script SQL para criar as tabelas.',
        };
      }
      return {
        success: false,
        message: `Erro na resposta do Supabase: ${error.message} (Código: ${error.code || 'N/A'})`,
      };
    }

    return {
      success: true,
      message: 'Conectado e sincronizado com o Supabase com sucesso! Todas as tabelas prontas.',
    };
  } catch (err: any) {
    return {
      success: false,
      message: `Erro ao testar conexão: ${err.message || 'Verifique sua conexão e chave.'}`,
    };
  }
};
