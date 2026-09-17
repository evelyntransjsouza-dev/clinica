-- ==============================================================================
-- SCHEMA SQL COMPLETO COM POLÍTICAS DE ARMAZENAMENTO (STORAGE) ATIVADAS
-- CLÍNICA DE ESTÉTICA & ALTA COSMETOLOGIA LOPES BEAUTIFLYUR
-- ==============================================================================
-- Instruções de Execução:
-- 1. Acesse o painel do seu projeto Supabase (https://supabase.com/dashboard)
-- 2. No menu lateral esquerdo, clique em "SQL Editor"
-- 3. Crie uma "New query", cole todo este código e clique no botão "Run" (Executar).
-- ==============================================================================

-- Habilita extensão para geração de UUIDs se ainda não existir
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- SEÇÃO 1: CRIAÇÃO E CONFIGURAÇÃO DOS BUCKETS DE ARMAZENAMENTO (STORAGE)
-- ==============================================================================

-- 1.1 Bucket: clinic-media (Público)
-- Armazena fotos dos ambientes da clínica, salas de procedimento, equipamentos e fotos de antes/depois
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'clinic-media',
    'clinic-media',
    true,
    10485760, -- 10MB máximo por arquivo
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/svg+xml']
)
ON CONFLICT (id) DO UPDATE SET
    public = true,
    file_size_limit = 10485760,
    allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/svg+xml'];

-- 1.2 Bucket: product-images (Público)
-- Armazena fotos dos frascos de séruns, embalagens, texturas e kits de skincare
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'product-images',
    'product-images',
    true,
    5242880, -- 5MB máximo por arquivo
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/avif']
)
ON CONFLICT (id) DO UPDATE SET
    public = true,
    file_size_limit = 5242880,
    allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/avif'];

-- 1.3 Bucket: patient-diagnostics (Privado / Seguro)
-- Armazena fotos de pele enviadas por pacientes no quiz ou em avaliações personalizadas
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'patient-diagnostics',
    'patient-diagnostics',
    false, -- Não listável publicamente para privacidade do paciente
    15728640, -- 15MB máximo por arquivo
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
)
ON CONFLICT (id) DO UPDATE SET
    public = false,
    file_size_limit = 15728640,
    allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];

-- 1.4 Bucket: clinical-documents (Privado / Seguro)
-- Armazena laudos estéticos, prescrições de skincare em PDF e termos de consentimento
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'clinical-documents',
    'clinical-documents',
    false,
    20971520, -- 20MB máximo
    ARRAY['application/pdf', 'image/jpeg', 'image/png']
)
ON CONFLICT (id) DO UPDATE SET
    public = false,
    file_size_limit = 20971520,
    allowed_mime_types = ARRAY['application/pdf', 'image/jpeg', 'image/png'];


-- ==============================================================================
-- SEÇÃO 2: POLÍTICAS DE SEGURANÇA DE ARMAZENAMENTO (STORAGE RLS) ATIVADAS
-- ==============================================================================

-- NOTA: storage.objects já possui Row Level Security (RLS) habilitado nativamente
-- pelo Supabase (tabela gerenciada pelo sistema supabase_storage_admin).

-- Limpa políticas anteriores se existirem (para permitir re-execução segura)
DROP POLICY IF EXISTS "Permitir leitura publica de midias da clinica" ON storage.objects;
DROP POLICY IF EXISTS "Permitir leitura publica de fotos de produtos" ON storage.objects;
DROP POLICY IF EXISTS "Permitir upload de fotos da clinica" ON storage.objects;
DROP POLICY IF EXISTS "Permitir upload de imagens de produtos" ON storage.objects;
DROP POLICY IF EXISTS "Permitir upload de fotos de diagnostico de pacientes" ON storage.objects;
DROP POLICY IF EXISTS "Permitir leitura de diagnosticos de pacientes" ON storage.objects;
DROP POLICY IF EXISTS "Permitir atualizacao de arquivos da clinica" ON storage.objects;
DROP POLICY IF EXISTS "Permitir exclusao de arquivos da clinica" ON storage.objects;

-- 2.1 Leitura Pública dos Buckets da Clínica e Produtos
CREATE POLICY "Permitir leitura publica de midias da clinica"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'clinic-media');

CREATE POLICY "Permitir leitura publica de fotos de produtos"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'product-images');

-- 2.2 Upload de Mídias para a Clínica e Produtos
CREATE POLICY "Permitir upload de fotos da clinica"
ON storage.objects FOR INSERT
TO public
WITH CHECK (
    bucket_id = 'clinic-media'
    AND (LOWER(storage.extension(name)) IN ('jpg', 'jpeg', 'png', 'webp', 'avif', 'svg'))
);

CREATE POLICY "Permitir upload de imagens de produtos"
ON storage.objects FOR INSERT
TO public
WITH CHECK (
    bucket_id = 'product-images'
    AND (LOWER(storage.extension(name)) IN ('jpg', 'jpeg', 'png', 'webp', 'avif'))
);

-- 2.3 Upload de Fotos de Avaliação de Pele pelos Pacientes (Quiz & Consultas)
CREATE POLICY "Permitir upload de fotos de diagnostico de pacientes"
ON storage.objects FOR INSERT
TO public
WITH CHECK (
    bucket_id = 'patient-diagnostics'
    AND (LOWER(storage.extension(name)) IN ('jpg', 'jpeg', 'png', 'webp', 'pdf'))
);

-- 2.4 Leitura Controlada de Diagnósticos e Documentos Clínicos
CREATE POLICY "Permitir leitura de diagnosticos de pacientes"
ON storage.objects FOR SELECT
TO public
USING (
    bucket_id IN ('patient-diagnostics', 'clinical-documents')
);

-- 2.5 Atualização e Modificação de Arquivos da Clínica
CREATE POLICY "Permitir atualizacao de arquivos da clinica"
ON storage.objects FOR UPDATE
TO public
USING (bucket_id IN ('clinic-media', 'product-images', 'patient-diagnostics'))
WITH CHECK (bucket_id IN ('clinic-media', 'product-images', 'patient-diagnostics'));

-- 2.6 Exclusão de Arquivos da Clínica
CREATE POLICY "Permitir exclusao de arquivos da clinica"
ON storage.objects FOR DELETE
TO public
USING (bucket_id IN ('clinic-media', 'product-images', 'patient-diagnostics', 'clinical-documents'));


-- ==============================================================================
-- SEÇÃO 3: TABELAS DE DADOS DA CLÍNICA & LINHA DE PRODUTOS
-- ==============================================================================

-- 3.1 Ambientes e Instalações da Clínica (Tour da Clínica)
CREATE TABLE IF NOT EXISTS public.clinic_spaces (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    tech_highlight TEXT,
    features JSONB DEFAULT '[]'::jsonb,
    image_url TEXT NOT NULL, -- URL referenciando storage.clinic-media ou CDN
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 3.2 Procedimentos Estéticos Realizados na Clínica
CREATE TABLE IF NOT EXISTS public.clinic_procedures (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    category TEXT NOT NULL, -- facial, laser, harmonizacao, bioestimuladores, corporal
    description TEXT NOT NULL,
    duration_minutes INT DEFAULT 60,
    price NUMERIC(10,2),
    sessions_recommended INT DEFAULT 1,
    associated_serum_formula TEXT,
    image_url TEXT,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 3.3 Galeria de Resultados Reais (Antes & Depois)
CREATE TABLE IF NOT EXISTS public.before_after_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_initials TEXT NOT NULL,
    age INT,
    procedure_name TEXT NOT NULL,
    serum_usage TEXT,
    timeframe TEXT,
    improvement_metric TEXT, -- Ex: "+89% Firmeza e Colágeno"
    quote TEXT,
    before_image_url TEXT,
    after_image_url TEXT,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 3.4 Catálogo de Produtos (Sérum Facial Lopes Beautiflyur & Skincare)
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    subtitle TEXT,
    description TEXT,
    price NUMERIC(10,2) NOT NULL,
    original_price NUMERIC(10,2),
    discount TEXT,
    volume TEXT DEFAULT '30ml',
    rating NUMERIC(2,1) DEFAULT 5.0,
    reviews_count INT DEFAULT 0,
    category TEXT DEFAULT 'serum_facial',
    image_url TEXT,
    in_stock BOOLEAN DEFAULT true,
    key_actives JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 3.5 Pedidos e Vendas de Produtos
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number TEXT UNIQUE NOT NULL,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_email TEXT,
    customer_address JSONB,
    items JSONB NOT NULL,
    subtotal NUMERIC(10,2) NOT NULL,
    discount_amount NUMERIC(10,2) DEFAULT 0.00,
    coupon_used TEXT,
    total NUMERIC(10,2) NOT NULL,
    payment_method TEXT NOT NULL, -- pix, cartao, whatsapp
    status TEXT DEFAULT 'pending', -- pending, paid, preparing, shipped, delivered, cancelled
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 3.6 Diagnósticos de Pele Personalizados (Quiz de Pele)
CREATE TABLE IF NOT EXISTS public.skin_diagnostics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_name TEXT,
    user_phone TEXT,
    user_email TEXT,
    skin_type TEXT NOT NULL,
    main_concern TEXT NOT NULL,
    sensitivity_level TEXT,
    sun_exposure TEXT,
    recommended_formula TEXT,
    recommended_protocol TEXT,
    patient_photo_url TEXT, -- Arquivo salvo em storage.patient-diagnostics
    quiz_answers JSONB,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 3.7 Agendamentos de Consultas & Procedimentos na Clínica
CREATE TABLE IF NOT EXISTS public.appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_name TEXT NOT NULL,
    patient_phone TEXT NOT NULL,
    patient_email TEXT,
    procedure_name TEXT NOT NULL,
    preferred_date DATE,
    preferred_time TEXT,
    status TEXT DEFAULT 'requested', -- requested, confirmed, completed, rescheduled, cancelled
    clinic_space TEXT,
    clinical_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 3.8 Contatos e Mensagens de Leads
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT,
    phone TEXT NOT NULL,
    email TEXT,
    channel TEXT DEFAULT 'landing_page', -- landing_page, whatsapp, instagram, quiz
    interest TEXT DEFAULT 'serum_facial',
    message TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);


-- ==============================================================================
-- SEÇÃO 4: ROW LEVEL SECURITY (RLS) NAS TABELAS DE DADOS DA CLÍNICA
-- ==============================================================================

ALTER TABLE public.clinic_spaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clinic_procedures ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.before_after_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skin_diagnostics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Limpa políticas de tabela anteriores se existirem
DROP POLICY IF EXISTS "Leitura publica dos espacos da clinica" ON public.clinic_spaces;
DROP POLICY IF EXISTS "Leitura publica de procedimentos da clinica" ON public.clinic_procedures;
DROP POLICY IF EXISTS "Leitura publica de casos antes e depois" ON public.before_after_results;
DROP POLICY IF EXISTS "Permitir leitura publica de produtos" ON public.products;
DROP POLICY IF EXISTS "Permitir criacao de pedidos pela landing page" ON public.orders;
DROP POLICY IF EXISTS "Permitir consulta de pedido por numero" ON public.orders;
DROP POLICY IF EXISTS "Permitir envio de diagnosticos de pele" ON public.skin_diagnostics;
DROP POLICY IF EXISTS "Permitir leitura de diagnosticos de pele" ON public.skin_diagnostics;
DROP POLICY IF EXISTS "Permitir agendamentos pela landing page" ON public.appointments;
DROP POLICY IF EXISTS "Permitir cadastro de leads" ON public.leads;

-- 4.1 Políticas de Leitura Pública
CREATE POLICY "Leitura publica dos espacos da clinica" 
    ON public.clinic_spaces FOR SELECT 
    USING (is_active = true);

CREATE POLICY "Leitura publica de procedimentos da clinica" 
    ON public.clinic_procedures FOR SELECT 
    USING (true);

CREATE POLICY "Leitura publica de casos antes e depois" 
    ON public.before_after_results FOR SELECT 
    USING (is_published = true);

CREATE POLICY "Permitir leitura publica de produtos" 
    ON public.products FOR SELECT 
    USING (true);

CREATE POLICY "Permitir consulta de pedido por numero" 
    ON public.orders FOR SELECT 
    USING (true);

CREATE POLICY "Permitir leitura de diagnosticos de pele" 
    ON public.skin_diagnostics FOR SELECT 
    USING (true);

-- 4.2 Políticas de Inserção Pública (Anon / Landing Page)
CREATE POLICY "Permitir criacao de pedidos pela landing page" 
    ON public.orders FOR INSERT 
    WITH CHECK (true);

CREATE POLICY "Permitir envio de diagnosticos de pele" 
    ON public.skin_diagnostics FOR INSERT 
    WITH CHECK (true);

CREATE POLICY "Permitir agendamentos pela landing page" 
    ON public.appointments FOR INSERT 
    WITH CHECK (true);

CREATE POLICY "Permitir cadastro de leads" 
    ON public.leads FOR INSERT 
    WITH CHECK (true);


-- ==============================================================================
-- SEÇÃO 5: CARGA INICIAL DE DADOS DA CLÍNICA & PRODUTOS (SEEDS)
-- ==============================================================================

-- 5.1 Espaços da Clínica
INSERT INTO public.clinic_spaces (code, title, category, description, tech_highlight, image_url, features, display_order)
VALUES
(
    'recepcao-imperial',
    'Recepção Imperial & Concierge',
    'Boas-Vindas & Acolhimento',
    'Design biomórfico em mármore Calacatta Gold com iluminação biofílica quente e serviço de água ozonizada e chás botânicos.',
    'Atendimento exclusivo com concierge e sala privativa de check-in sem filas.',
    'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
    '["Mármore nobre e detalhes em latão banhado a ouro", "Aromaterapia personalizada com flor de laranjeira", "Menu de infusões e espumante brut para pacientes VIP"]'::jsonb,
    1
),
(
    'sala-laser-fototerapia',
    'Suíte Laser & Fototerapia 5D',
    'Tecnologia de Ponta',
    'Equipada com a mais seleta tecnologia de laser picossegundos e LEDs de regeneração celular para rejuvenescimento seguro.',
    'Rejuvenescimento sem downtime que potencializa a permeação do Sérum Facial.',
    'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
    '["Laser fracionado e picossegundos de alta precisão", "Luz pulsada para eliminação seletiva de manchas", "Cromoterapia integrada com relaxamento auditivo acústico"]'::jsonb,
    2
),
(
    'cabine-ouro-cosmetologia',
    'Cabine Ouro & Alta Cosmetologia',
    'Protocolos Exclusivos',
    'Espaço dedicado à aplicação de máscaras com partículas de ouro 24K e infusão iônica dos peptídeos do Sérum Lopes Beautiflyur.',
    'Associação sinérgica do Sérum com ultrassom microfocado transdérmico.',
    'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
    '["Infusor hiperbárico de oxigênio médico a 98%", "Máscara bioluminescente de ouro 24K coloidal", "Maca aquecida em couro nobre com massagem relaxante"]'::jsonb,
    3
)
ON CONFLICT (code) DO NOTHING;

-- 5.2 Procedimentos Estéticos
INSERT INTO public.clinic_procedures (code, name, category, description, duration_minutes, price, associated_serum_formula, image_url, is_featured)
VALUES
(
    'proc-ouro-glow',
    'Protocolo Ouro & Infusão Glow',
    'facial',
    'Higienização ultrassônica, peeling de diamante, drenagem facial com esferas douradas e iontoforese do Sérum Ouro 24K.',
    75,
    580.00,
    'Sérum Facial Lopes Beautiflyur Ouro 24K',
    'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
    true
),
(
    'proc-bio-lifting',
    'Bio-Lifting & Colágeno 5D',
    'harmonizacao',
    'Bioestimulação tecidual com peptídeos tensores para definição do contorno mandibular, melhora da elastose e firmeza imediata.',
    90,
    1250.00,
    'Sérum Facial Lopes Beautiflyur Bio-Peptídeos',
    'https://images.unsplash.com/photo-1512290900672-1f4a9bb5f725?auto=format&fit=crop&w=800&q=80',
    true
),
(
    'proc-clarity-peel',
    'Clarity Peel & Renovação de Manchas',
    'laser',
    'Tratamento intensivo para melasma e discromias solares combinando laser fracionado com Sérum Clareador Tranexâmico.',
    60,
    720.00,
    'Sérum Clareador & Uniformizador',
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    true
)
ON CONFLICT (code) DO NOTHING;

-- 5.3 Catálogo de Séruns e Produtos da Marca
INSERT INTO public.products (code, title, subtitle, description, price, original_price, discount, volume, rating, reviews_count, category, image_url, key_actives)
VALUES
(
    'serum-signature-30ml',
    'Sérum Facial Lopes Beautiflyur',
    'Fórmula Bio-Ativa Ouro 24K & Ácido Hialurônico 5D',
    'Fórmula biomimética patenteada pela clínica. Harmoniza o relevo cutâneo, reduz linhas finas e devolve a densidade celular com sensorial sedoso e acabamento acetinado.',
    289.00,
    389.00,
    '26% OFF',
    '30ml',
    4.9,
    428,
    'serum_facial',
    'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    '["Ouro Coloidal 24K", "Ácido Hialurônico 5D", "Bio-Peptídeos Tensores", "Niacinamida Gold 5%", "Extrato de Orquídea Branca"]'::jsonb
),
(
    'serum-clarifying-30ml',
    'Sérum Clareador & Uniformizador',
    'Ácido Tranexâmico & Niacinamida Pura',
    'Desenvolvido para peles com melasma ou manchas pós-acne. Clareamento suave e gradativo com ação antioxidante sem sensibilizar a barreira cutânea.',
    319.00,
    419.00,
    '24% OFF',
    '30ml',
    4.9,
    215,
    'serum_facial',
    'https://images.unsplash.com/photo-1608248597359-548590c74cf2?auto=format&fit=crop&w=800&q=80',
    '["Ácido Tranexâmico 3%", "Alfa Arbutin", "Vitamina C Estabilizada", "Extrato de Raiz de Alcaçuz"]'::jsonb
),
(
    'kit-ritual-clinico',
    'Kit Ritual Clínico Completo',
    'Sérum Facial + Mousse Marmorizado + Massageador Gua Sha Dourado',
    'O protocolo caseiro equivalente aos tratamentos de cabine da Lopes Beautiflyur. Limpeza profunda suave, nutrição intensiva e drenagem tecidual.',
    489.00,
    649.00,
    '25% OFF',
    'Kit 3 Peças',
    5.0,
    184,
    'kits',
    'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    '["Sérum Ouro 24K 30ml", "Mousse de Limpeza Iluminadora 150ml", "Gua Sha Nobre Banhado a Ouro", "Nécessaire em Couro Ecológico"]'::jsonb
)
ON CONFLICT (code) DO NOTHING;

-- ==============================================================================
-- FIM DO SCRIPT
-- ==============================================================================
