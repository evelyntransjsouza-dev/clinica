/**
 * Script SQL Oficial do Supabase para Lopes Beautiflyur
 * Inclui:
 * 1. Criação de Buckets de Armazenamento (Storage) para a Clínica
 * 2. Políticas de Segurança de Storage (Storage RLS) Ativadas
 * 3. Tabelas de Negócio da Clínica (Ambientes, Procedimentos, Casos, Séruns, Pedidos, Diagnósticos, Agendamentos)
 * 4. Políticas de Segurança RLS de Banco de Dados
 * 5. Carga Inicial de Dados (Seeds)
 */

export const CLINIC_STORAGE_SQL = `-- ==============================================================================
-- SCHEMA SQL COMPLETO COM POLÍTICAS DE ARMAZENAMENTO (STORAGE) ATIVADAS
-- CLÍNICA DE ESTÉTICA & ALTA COSMETOLOGIA LOPES BEAUTIFLYUR
-- ==============================================================================
-- Instruções:
-- 1. Acesse o painel do seu projeto Supabase (https://supabase.com/dashboard)
-- 2. No menu lateral esquerdo, clique em "SQL Editor"
-- 3. Crie uma "New query", cole todo este código e clique em "Run" (Executar).
-- ==============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- SEÇÃO 1: BUCKETS DE ARMAZENAMENTO (STORAGE) DA CLÍNICA
-- ------------------------------------------------------------------------------

-- 1.1 Bucket: clinic-media (Público - Fotos das salas, equipamentos, antes/depois)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'clinic-media',
    'clinic-media',
    true,
    10485760, -- 10MB
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/svg+xml']
)
ON CONFLICT (id) DO UPDATE SET
    public = true,
    file_size_limit = 10485760,
    allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/svg+xml'];

-- 1.2 Bucket: product-images (Público - Séruns, frascos, embalagens e kits)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'product-images',
    'product-images',
    true,
    5242880, -- 5MB
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/avif']
)
ON CONFLICT (id) DO UPDATE SET
    public = true,
    file_size_limit = 5242880,
    allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/avif'];

-- 1.3 Bucket: patient-diagnostics (Privado - Fotos enviadas por pacientes para avaliação de pele)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'patient-diagnostics',
    'patient-diagnostics',
    false,
    15728640, -- 15MB
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
)
ON CONFLICT (id) DO UPDATE SET
    public = false,
    file_size_limit = 15728640,
    allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];

-- 1.4 Bucket: clinical-documents (Privado - Laudos, prescrições personalizadas e termos)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'clinical-documents',
    'clinical-documents',
    false,
    20971520, -- 20MB
    ARRAY['application/pdf', 'image/jpeg', 'image/png']
)
ON CONFLICT (id) DO UPDATE SET
    public = false,
    file_size_limit = 20971520,
    allowed_mime_types = ARRAY['application/pdf', 'image/jpeg', 'image/png'];


-- ------------------------------------------------------------------------------
-- SEÇÃO 2: POLÍTICAS DE SEGURANÇA DE ARMAZENAMENTO (STORAGE RLS) ATIVADAS
-- ------------------------------------------------------------------------------

-- NOTA: storage.objects já possui RLS ativado nativamente pelo Supabase

DROP POLICY IF EXISTS "Permitir leitura publica de midias da clinica" ON storage.objects;
DROP POLICY IF EXISTS "Permitir leitura publica de fotos de produtos" ON storage.objects;
DROP POLICY IF EXISTS "Permitir upload de fotos da clinica" ON storage.objects;
DROP POLICY IF EXISTS "Permitir upload de imagens de produtos" ON storage.objects;
DROP POLICY IF EXISTS "Permitir upload de fotos de diagnostico de pacientes" ON storage.objects;
DROP POLICY IF EXISTS "Permitir leitura de diagnosticos de pacientes" ON storage.objects;
DROP POLICY IF EXISTS "Permitir atualizacao de arquivos da clinica" ON storage.objects;
DROP POLICY IF EXISTS "Permitir exclusao de arquivos da clinica" ON storage.objects;

-- Leitura Pública dos Buckets da Clínica
CREATE POLICY "Permitir leitura publica de midias da clinica"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'clinic-media');

CREATE POLICY "Permitir leitura publica de fotos de produtos"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'product-images');

-- Upload nos Buckets da Clínica e Produtos
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

-- Upload de Fotos para Diagnóstico de Pele dos Pacientes
CREATE POLICY "Permitir upload de fotos de diagnostico de pacientes"
ON storage.objects FOR INSERT
TO public
WITH CHECK (
    bucket_id = 'patient-diagnostics'
    AND (LOWER(storage.extension(name)) IN ('jpg', 'jpeg', 'png', 'webp', 'pdf'))
);

-- Leitura de Diagnósticos e Documentos Clínicos
CREATE POLICY "Permitir leitura de diagnosticos de pacientes"
ON storage.objects FOR SELECT
TO public
USING (bucket_id IN ('patient-diagnostics', 'clinical-documents'));

-- Atualização e Remoção de Arquivos da Clínica
CREATE POLICY "Permitir atualizacao de arquivos da clinica"
ON storage.objects FOR UPDATE
TO public
USING (bucket_id IN ('clinic-media', 'product-images', 'patient-diagnostics'))
WITH CHECK (bucket_id IN ('clinic-media', 'product-images', 'patient-diagnostics'));

CREATE POLICY "Permitir exclusao de arquivos da clinica"
ON storage.objects FOR DELETE
TO public
USING (bucket_id IN ('clinic-media', 'product-images', 'patient-diagnostics', 'clinical-documents'));


-- ------------------------------------------------------------------------------
-- SEÇÃO 3: TABELAS DE DADOS DA CLÍNICA & SERVIÇOS
-- ------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.clinic_spaces (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    tech_highlight TEXT,
    features JSONB DEFAULT '[]'::jsonb,
    image_url TEXT NOT NULL,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.clinic_procedures (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    duration_minutes INT DEFAULT 60,
    price NUMERIC(10,2),
    associated_serum_formula TEXT,
    image_url TEXT,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.before_after_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_initials TEXT NOT NULL,
    age INT,
    procedure_name TEXT NOT NULL,
    serum_usage TEXT,
    timeframe TEXT,
    improvement_metric TEXT,
    quote TEXT,
    before_image_url TEXT,
    after_image_url TEXT,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

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
    payment_method TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

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
    patient_photo_url TEXT,
    quiz_answers JSONB,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_name TEXT NOT NULL,
    patient_phone TEXT NOT NULL,
    patient_email TEXT,
    procedure_name TEXT NOT NULL,
    preferred_date DATE,
    preferred_time TEXT,
    status TEXT DEFAULT 'requested',
    clinic_space TEXT,
    clinical_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT,
    phone TEXT NOT NULL,
    email TEXT,
    channel TEXT DEFAULT 'landing_page',
    interest TEXT DEFAULT 'serum_facial',
    message TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);


-- ------------------------------------------------------------------------------
-- SEÇÃO 4: POLÍTICAS RLS NAS TABELAS DE DADOS
-- ------------------------------------------------------------------------------

ALTER TABLE public.clinic_spaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clinic_procedures ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.before_after_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skin_diagnostics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

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

CREATE POLICY "Leitura publica dos espacos da clinica" ON public.clinic_spaces FOR SELECT USING (is_active = true);
CREATE POLICY "Leitura publica de procedimentos da clinica" ON public.clinic_procedures FOR SELECT USING (true);
CREATE POLICY "Leitura publica de casos antes e depois" ON public.before_after_results FOR SELECT USING (is_published = true);
CREATE POLICY "Permitir leitura publica de produtos" ON public.products FOR SELECT USING (true);
CREATE POLICY "Permitir consulta de pedido por numero" ON public.orders FOR SELECT USING (true);
CREATE POLICY "Permitir leitura de diagnosticos de pele" ON public.skin_diagnostics FOR SELECT USING (true);

CREATE POLICY "Permitir criacao de pedidos pela landing page" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir envio de diagnosticos de pele" ON public.skin_diagnostics FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir agendamentos pela landing page" ON public.appointments FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir cadastro de leads" ON public.leads FOR INSERT WITH CHECK (true);


-- ------------------------------------------------------------------------------
-- SEÇÃO 5: CARGA INICIAL (SEEDS)
-- ------------------------------------------------------------------------------

INSERT INTO public.products (code, title, subtitle, description, price, original_price, discount, volume, rating, reviews_count, category, image_url, key_actives)
VALUES
(
    'serum-signature-30ml',
    'Sérum Facial Lopes Beautiflyur',
    'Fórmula Bio-Ativa Ouro 24K & Ácido Hialurônico 5D',
    'Fórmula biomimética patenteada pela clínica. Harmoniza o relevo cutâneo, reduz linhas finas e devolve a densidade celular.',
    289.00,
    389.00,
    '26% OFF',
    '30ml',
    4.9,
    428,
    'serum_facial',
    'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    '["Ouro Coloidal 24K", "Ácido Hialurônico 5D", "Bio-Peptídeos Tensores", "Niacinamida Gold 5%"]'::jsonb
),
(
    'serum-clarifying-30ml',
    'Sérum Clareador & Uniformizador',
    'Ácido Tranexâmico & Niacinamida Pura',
    'Desenvolvido para melasma e manchas pós-acne com renovação suave e ação antioxidante.',
    319.00,
    419.00,
    '24% OFF',
    '30ml',
    4.9,
    215,
    'serum_facial',
    'https://images.unsplash.com/photo-1608248597359-548590c74cf2?auto=format&fit=crop&w=800&q=80',
    '["Ácido Tranexâmico 3%", "Alfa Arbutin", "Vitamina C Estabilizada"]'::jsonb
)
ON CONFLICT (code) DO NOTHING;
`;
