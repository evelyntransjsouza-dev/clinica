import { getSupabaseClient, isSupabaseConfigured } from '../lib/supabase';
import { ProductVariation } from '../types';

export interface OrderData {
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  customerAddress?: {
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
  };
  items: Array<{
    id: string;
    name: string;
    volume: string;
    price: number;
    quantity: number;
  }>;
  subtotal: number;
  discountAmount: number;
  couponUsed?: string;
  total: number;
  paymentMethod: string;
  notes?: string;
  status?: string;
  id?: string;
  created_at?: string;
}

export interface SkinDiagnosticData {
  userName?: string;
  userPhone?: string;
  userEmail?: string;
  skinType: string;
  mainConcern: string;
  sensitivityLevel?: string;
  sunExposure?: string;
  recommendedFormula: string;
  recommendedProtocol: string;
  quizAnswers?: Record<string, any>;
  id?: string;
  created_at?: string;
}

export interface AppointmentData {
  patientName: string;
  patientPhone: string;
  patientEmail?: string;
  procedureName: string;
  preferredDate?: string;
  preferredTime?: string;
  clinicSpace?: string;
  notes?: string;
  status?: string;
  id?: string;
  created_at?: string;
}

// Local storage helper for offline resilience and immediate UI inspection
const getLocalRecords = (key: string): any[] => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveLocalRecord = (key: string, record: any) => {
  try {
    const records = getLocalRecords(key);
    records.unshift({ ...record, savedAt: new Date().toISOString() });
    localStorage.setItem(key, JSON.stringify(records.slice(0, 50)));
  } catch {
    // ignore
  }
};

export const supabaseService = {
  /**
   * Salva um pedido no Supabase (com fallback local resiliente)
   */
  async saveOrder(order: OrderData): Promise<{ success: boolean; id?: string; source: 'supabase' | 'local' }> {
    // 1. Sempre registra localmente para segurança
    saveLocalRecord('LB_STORED_ORDERS', order);

    const client = getSupabaseClient();
    if (!client) {
      return { success: true, source: 'local' };
    }

    try {
      const { data, error } = await client.from('orders').insert({
        order_number: order.orderNumber,
        customer_name: order.customerName,
        customer_phone: order.customerPhone,
        customer_email: order.customerEmail || null,
        customer_address: order.customerAddress || null,
        items: order.items,
        subtotal: order.subtotal,
        discount_amount: order.discountAmount,
        coupon_used: order.couponUsed || null,
        total: order.total,
        payment_method: order.paymentMethod,
        status: 'pending',
        notes: order.notes || null,
      }).select('id').single();

      if (error) {
        console.warn('Erro ao inserir pedido no Supabase:', error.message);
        return { success: true, source: 'local' };
      }

      return { success: true, id: data?.id, source: 'supabase' };
    } catch (err) {
      console.warn('Falha na requisição ao Supabase:', err);
      return { success: true, source: 'local' };
    }
  },

  /**
   * Salva o diagnóstico de pele e recomendações personalizadas
   */
  async saveSkinDiagnostic(diagnostic: SkinDiagnosticData): Promise<{ success: boolean; id?: string; source: 'supabase' | 'local' }> {
    saveLocalRecord('LB_STORED_DIAGNOSTICS', diagnostic);

    const client = getSupabaseClient();
    if (!client) {
      return { success: true, source: 'local' };
    }

    try {
      const { data, error } = await client.from('skin_diagnostics').insert({
        user_name: diagnostic.userName || null,
        user_phone: diagnostic.userPhone || null,
        user_email: diagnostic.userEmail || null,
        skin_type: diagnostic.skinType,
        main_concern: diagnostic.mainConcern,
        sensitivity_level: diagnostic.sensitivityLevel || null,
        sun_exposure: diagnostic.sunExposure || null,
        recommended_formula: diagnostic.recommendedFormula,
        recommended_protocol: diagnostic.recommendedProtocol,
        quiz_answers: diagnostic.quizAnswers || null,
      }).select('id').single();

      if (error) {
        console.warn('Erro ao inserir diagnóstico no Supabase:', error.message);
        return { success: true, source: 'local' };
      }

      return { success: true, id: data?.id, source: 'supabase' };
    } catch (err) {
      console.warn('Falha ao gravar diagnóstico no Supabase:', err);
      return { success: true, source: 'local' };
    }
  },

  /**
   * Salva uma solicitação de agendamento na clínica
   */
  async saveAppointment(appointment: AppointmentData): Promise<{ success: boolean; id?: string; source: 'supabase' | 'local' }> {
    saveLocalRecord('LB_STORED_APPOINTMENTS', appointment);

    const client = getSupabaseClient();
    if (!client) {
      return { success: true, source: 'local' };
    }

    try {
      const { data, error } = await client.from('appointments').insert({
        patient_name: appointment.patientName,
        patient_phone: appointment.patientPhone,
        patient_email: appointment.patientEmail || null,
        procedure_name: appointment.procedureName,
        preferred_date: appointment.preferredDate || null,
        preferred_time: appointment.preferredTime || null,
        clinic_space: appointment.clinicSpace || null,
        notes: appointment.notes || null,
        status: 'requested',
      }).select('id').single();

      if (error) {
        console.warn('Erro ao inserir agendamento no Supabase:', error.message);
        return { success: true, source: 'local' };
      }

      return { success: true, id: data?.id, source: 'supabase' };
    } catch (err) {
      console.warn('Falha ao agendar no Supabase:', err);
      return { success: true, source: 'local' };
    }
  },

  /**
   * Salva um novo produto no catálogo
   */
  async saveProduct(product: Partial<ProductVariation>): Promise<{ success: boolean; source: 'supabase' | 'local' }> {
    saveLocalRecord('LB_STORED_PRODUCTS', product);

    const client = getSupabaseClient();
    if (!client) {
      return { success: true, source: 'local' };
    }

    try {
      const { error } = await client.from('products').upsert({
        code: product.id || `prod-${Date.now()}`,
        title: product.name,
        subtitle: product.subtitle || null,
        description: product.description || null,
        price: product.price,
        original_price: product.originalPrice || null,
        discount: product.discount || null,
        volume: product.volume || '30ml',
        rating: product.rating || 5.0,
        reviews_count: product.reviewsCount || 0,
        image_url: product.image || null,
        in_stock: product.inStock !== false,
        key_actives: product.features || [],
      });

      if (error) {
        console.warn('Erro ao salvar produto no Supabase:', error.message);
        return { success: true, source: 'local' };
      }

      return { success: true, source: 'supabase' };
    } catch (err) {
      console.warn('Erro ao salvar produto no Supabase:', err);
      return { success: true, source: 'local' };
    }
  },

  /**
   * Retorna os registros armazenados no sistema
   */
  getStoredRecords() {
    const orders = getLocalRecords('LB_STORED_ORDERS');
    const diagnostics = getLocalRecords('LB_STORED_DIAGNOSTICS');
    const appointments = getLocalRecords('LB_STORED_APPOINTMENTS');
    const products = getLocalRecords('LB_STORED_PRODUCTS');

    return {
      orders,
      diagnostics,
      appointments,
      products,
      totalCount: orders.length + diagnostics.length + appointments.length + products.length,
    };
  },

  /**
   * Sincroniza registros pendentes locais para o Supabase
   */
  async syncLocalToSupabase(): Promise<{ synced: number; failed: number }> {
    const client = getSupabaseClient();
    if (!client) {
      return { synced: 0, failed: 0 };
    }

    let synced = 0;
    let failed = 0;

    const orders = getLocalRecords('LB_STORED_ORDERS');
    for (const order of orders) {
      if (!order.syncedToSupabase) {
        try {
          const { error } = await client.from('orders').insert({
            order_number: order.orderNumber,
            customer_name: order.customerName,
            customer_phone: order.customerPhone,
            customer_email: order.customerEmail || null,
            items: order.items,
            subtotal: order.subtotal,
            discount_amount: order.discountAmount || 0,
            total: order.total,
            payment_method: order.paymentMethod,
            status: 'pending',
          });
          if (!error) {
            order.syncedToSupabase = true;
            synced++;
          } else {
            failed++;
          }
        } catch {
          failed++;
        }
      }
    }

    try {
      localStorage.setItem('LB_STORED_ORDERS', JSON.stringify(orders));
    } catch {
      // ignore
    }

    return { synced, failed };
  },

  /**
   * Atualiza o status de um pedido (usado pelo Proprietário)
   */
  async updateOrderStatus(orderNumber: string, status: string): Promise<boolean> {
    const orders = getLocalRecords('LB_STORED_ORDERS');
    const orderIndex = orders.findIndex(o => o.orderNumber === orderNumber);
    if (orderIndex >= 0) {
      orders[orderIndex].status = status;
      orders[orderIndex].updatedAt = new Date().toISOString();
      try {
        localStorage.setItem('LB_STORED_ORDERS', JSON.stringify(orders));
      } catch (e) {
        // ignore
      }
    }

    const client = getSupabaseClient();
    if (client) {
      try {
        await client.from('orders').update({ status }).eq('order_number', orderNumber);
      } catch (err) {
        console.warn('Erro ao atualizar status do pedido no Supabase:', err);
      }
    }
    return true;
  },

  /**
   * Atualiza status de agendamento na clínica
   */
  async updateAppointmentStatus(patientName: string, status: string): Promise<boolean> {
    const appointments = getLocalRecords('LB_STORED_APPOINTMENTS');
    const idx = appointments.findIndex(a => a.patientName === patientName);
    if (idx >= 0) {
      appointments[idx].status = status;
      try {
        localStorage.setItem('LB_STORED_APPOINTMENTS', JSON.stringify(appointments));
      } catch (e) {
        // ignore
      }
    }

    const client = getSupabaseClient();
    if (client) {
      try {
        await client.from('appointments').update({ status }).eq('patient_name', patientName);
      } catch (err) {
        console.warn('Erro ao atualizar agendamento no Supabase:', err);
      }
    }
    return true;
  },

  /**
   * Busca os pedidos associados a um cliente específico
   */
  getClientOrders(email: string, phone?: string): OrderData[] {
    const orders = getLocalRecords('LB_STORED_ORDERS');
    const cleanEmail = email.toLowerCase().trim();
    const cleanPhone = phone ? phone.replace(/\D/g, '') : '';

    const matched = orders.filter(o => {
      const matchEmail = o.customerEmail && o.customerEmail.toLowerCase().trim() === cleanEmail;
      const orderPhoneClean = o.customerPhone ? o.customerPhone.replace(/\D/g, '') : '';
      const matchPhone = cleanPhone && orderPhoneClean && (orderPhoneClean === cleanPhone || orderPhoneClean.includes(cleanPhone));
      return matchEmail || matchPhone;
    });

    // Se não tiver pedidos para este cliente novo, mas houver pedidos na loja, retorna os pedidos ou lista vazia
    return matched;
  },

  /**
   * Busca o histórico de diagnóstico de pele de um cliente
   */
  getClientDiagnostics(email: string, phone?: string): SkinDiagnosticData[] {
    const list = getLocalRecords('LB_STORED_DIAGNOSTICS');
    const cleanEmail = email.toLowerCase().trim();
    const cleanPhone = phone ? phone.replace(/\D/g, '') : '';

    return list.filter(d => {
      const matchEmail = d.userEmail && d.userEmail.toLowerCase().trim() === cleanEmail;
      const diagPhoneClean = d.userPhone ? d.userPhone.replace(/\D/g, '') : '';
      const matchPhone = cleanPhone && diagPhoneClean && (diagPhoneClean === cleanPhone || diagPhoneClean.includes(cleanPhone));
      return matchEmail || matchPhone;
    });
  },

  /**
   * Busca agendamentos de um cliente
   */
  getClientAppointments(email: string, phone?: string): AppointmentData[] {
    const list = getLocalRecords('LB_STORED_APPOINTMENTS');
    const cleanEmail = email.toLowerCase().trim();
    const cleanPhone = phone ? phone.replace(/\D/g, '') : '';

    return list.filter(a => {
      const matchEmail = a.patientEmail && a.patientEmail.toLowerCase().trim() === cleanEmail;
      const appPhoneClean = a.patientPhone ? a.patientPhone.replace(/\D/g, '') : '';
      const matchPhone = cleanPhone && appPhoneClean && (appPhoneClean === cleanPhone || appPhoneClean.includes(cleanPhone));
      return matchEmail || matchPhone;
    });
  },

  /**
   * Garante dados demonstrativos elegantes para o primeiro acesso
   */
  ensureSampleData() {
    const orders = getLocalRecords('LB_STORED_ORDERS');
    if (orders.length === 0) {
      saveLocalRecord('LB_STORED_ORDERS', {
        orderNumber: 'LB-8921',
        customerName: 'Dra. Carolina Mendes',
        customerPhone: '(11) 98765-4321',
        customerEmail: 'carolina.mendes@gmail.com',
        customerAddress: {
          street: 'Av. Paulista, 1800 - Apto 142',
          city: 'São Paulo',
          state: 'SP',
          zip: '01310-200'
        },
        items: [
          {
            id: 'serum-signature-30ml',
            name: 'Sérum Facial Lopes Beautiflyur 30ml',
            volume: '30ml',
            price: 289.00,
            quantity: 1
          }
        ],
        subtotal: 289.00,
        discountAmount: 43.35,
        couponUsed: 'BEAUTIFLYUR15',
        total: 245.65,
        paymentMethod: 'Pix Instantâneo',
        status: 'paid',
        notes: 'Cliente VIP - Solicitar amostra da loção tônica na entrega.'
      });

      saveLocalRecord('LB_STORED_ORDERS', {
        orderNumber: 'LB-8922',
        customerName: 'Juliana Vasconcelos',
        customerPhone: '(11) 99123-8877',
        customerEmail: 'juliana.vasc@gmail.com',
        customerAddress: {
          street: 'Rua Oscar Freire, 920',
          city: 'São Paulo',
          state: 'SP',
          zip: '01426-000'
        },
        items: [
          {
            id: 'serum-duo-kit',
            name: 'Kit Protocolo Dia & Noite (2 Frascos)',
            volume: '60ml',
            price: 520.00,
            quantity: 1
          }
        ],
        subtotal: 520.00,
        discountAmount: 0.00,
        total: 520.00,
        paymentMethod: 'Cartão de Crédito (3x)',
        status: 'shipped',
        notes: 'Código de Rastreio dos Correios: QB829103982BR'
      });
    }

    const diagnostics = getLocalRecords('LB_STORED_DIAGNOSTICS');
    if (diagnostics.length === 0) {
      saveLocalRecord('LB_STORED_DIAGNOSTICS', {
        userName: 'Dra. Carolina Mendes',
        userPhone: '(11) 98765-4321',
        userEmail: 'carolina.mendes@gmail.com',
        skinType: 'Mista a Seca com linhas finas',
        mainConcern: 'Rejuvenescimento e Luminosidade',
        sensitivityLevel: 'Leve',
        sunExposure: 'Moderada',
        recommendedFormula: 'Sérum Signature Ouro 24K + Ácido Hialurônico 5D',
        recommendedProtocol: 'Protocolo Infusão Ouro Glow + Microcorrentes'
      });
    }

    const appointments = getLocalRecords('LB_STORED_APPOINTMENTS');
    if (appointments.length === 0) {
      saveLocalRecord('LB_STORED_APPOINTMENTS', {
        patientName: 'Camila F. Nogueira',
        patientPhone: '(11) 97654-1234',
        patientEmail: 'camila.nogueira@gmail.com',
        procedureName: 'Protocolo Bio-Lifting & Laser Fototerapia',
        preferredDate: '2026-09-25',
        preferredTime: '15:30',
        clinicSpace: 'Suíte Laser & Tecnologias Fotônicas',
        notes: 'Primeira consulta de avaliação na clínica.',
        status: 'confirmed'
      });
    }
  }
};
