import { ClinicSpace, ProductVariation, TestimonialResult, QuizQuestion, LimitedEditionProduct, SpecialCatalogPackage } from '../types';

export const SERUM_HERO_IMAGE = '/src/assets/images/serum_bottle_hero_1789586717746.jpg';
export const CLINIC_LOUNGE_IMAGE = '/src/assets/images/clinic_interior_luxury_1789586733937.jpg';
export const CLINIC_TREATMENT_IMAGE = '/src/assets/images/clinic_treatment_room_1789586748202.jpg';
export const LIMITED_SERUM_GOLD_IMAGE = '/src/assets/images/limited_serum_gold_1789664132291.jpg';
export const LIMITED_ELIXIR_CAVIAR_IMAGE = '/src/assets/images/limited_elixir_caviar_1789664141435.jpg';
export const CATALOG_DUO_BOX_IMAGE = '/src/assets/images/catalog_duo_box_1789664323065.jpg';
export const STRIPE_DIRECT_PAYMENT_URL = 'https://buy.stripe.com/test_bJedRbfIRcQVbsp1xIbsc00';
export const ROBOT_CHAT_WEBHOOK_URL = 'https://testeclinica.app.n8n.cloud/webhook/29703b46-275d-4ce6-a4af-ddd7d23c2b1e/chat';
export const ROBOT_CHAT_INSTANCE_ID = '9fd5c26e5c5c58faa8cb8c10bf70ac6708aa1eb30536c25b77b3d1a5df51d759';

export const BRAND_CONFIG = {
  name: 'Lopes Beautiflyur',
  tagline: 'Clínica de Estética & Alta Cosmetologia',
  heroHeadline: 'A Alquimia Perfeita Entre Estética Avançada e Seu Sérum Facial Exclusivo',
  heroSubheadline: 'Resultados personalizados desenhados para a sua pele: unimos procedimentos clínicos de ponta ao poder regenerativo da nossa linha própria Lopes Beautiflyur.',
  instagramUrl: 'https://www.instagram.com/clinicasanluer/',
  instagramHandle: '@clinicasanluer',
  shopeeUrl: 'https://shopee.com.br/product/348445038/52610309939?gads_t_sig=gqRjZGVrxHCFomtpsTE0MjUxOnRzc19zZGtfa2V5omt20QACpGFsZ2_SAAAAZKNkZWvAomN0xEAAAAAMCDZ1QISG3Y9eQ8yPVgAOiad7g2PqyaqkWO_9nGG8rv2GeSvTKVy0YH9Uq_tAMSkaB8ROm0FmD1_y4Fc6qmNpcGhlcnRleHTEcgAAAAxPQnwzxiiDVn8mq_DZ6m-WPD8kxrrd9QlqQrD3F_eD3agHvBGSxEa8Zjs5HRz2FZ-k0cHYmwI4Xb8uy-5y0seOQPLgZ4cplEwFeA7mX8vQYLUVLUWkiS9iiidJx7fa28MceOxee4qYTdqZP2ciTg&utm_source=google&utm_medium=seller&utm_campaign=s348445038_ss_BR_GMAX_Validacao1_sc&is_seller=true&gad_source=1&gad_campaignid=23939331528&gbraid=0AAAABDV2BZDr4oVoIqyuLZ16Wdn2Ug5In&gclid=CjwKCAjwn67VBhBnEiwAXUIN1aufSipel7Q3XaAvaZqDDmAlmbzPdyWPGsbfELfRKQCrKAJSMUylPRoCt4YQAvD_BwE',
  shopeeStoreName: 'Lopes Beautiflyur Oficial (Shopee)',
  mercadoLivreUrl: 'https://www.mercadolivre.com.br/serum-facial-exos-antirugas-firmeza-textura-e-regeneracao/up/MLBU3975070822?pdp_filters=item_id%3AMLB6778454858&from=gshop&matt_tool=51266944&matt_word=&matt_source=google&matt_campaign_id=22090354289&matt_ad_group_id=197094197211&matt_match_type=&matt_network=g&matt_device=c&matt_creative=792396419413&matt_keyword=&matt_ad_position=&matt_ad_type=pla&matt_merchant_id=5788316431&matt_product_id=MLBU3975070822&matt_product_partition_id=2493286459126&matt_target_id=pla-2493286459126&cq_src=google_ads&cq_cmp=22090354289&cq_net=g&cq_plt=gp&cq_med=pla&gad_source=1&gad_campaignid=22090354289&gbraid=0AAAAAD93qcA7xqZzO7Mr9I7M29LuQ-HKa&gclid=CjwKCAjwn67VBhBnEiwAXUIN1dTuNjtIWYRxiotFLN9d6aOBRdozKpxL3m069aDef9erxAsf6nyidhoCOI8QAvD_BwE',
  mercadoLivreStoreName: 'Loja Oficial Mercado Livre',
  whatsappNumber: '5511999998888',
  whatsappDisplay: '(11) 99999-8888',
  address: 'Alameda Gabriel Monteiro da Silva, 1420 - Jardins, São Paulo - SP',
  email: 'contato@lopesbeautiflyur.com.br',
  crmv: 'Responsabilidade Técnica Farmacêutica e Biomédica Esteta Certificada',
};

export const PRODUCT_VARIATIONS: ProductVariation[] = [
  {
    id: 'serum-gold-glow',
    name: 'Sérum Facial Lopes Beautiflyur – Glow & Bio-Peptídeos',
    subtitle: 'Fórmula Signature com Partículas Iluminadoras e Triplo Ácido Hialurônico',
    price: 249.00,
    originalPrice: 320.00,
    volume: '30ml / 1.0 fl oz',
    idealFor: 'Peles opacas, linhas finas, perda de firmeza e necessidade de viço imediato',
    tag: 'O Mais Escolhido',
    features: [
      'Ácido Hialurônico 5D de pesos moleculares combinados',
      'Complexo de Bio-Peptídeos tensores com efeito lifting botox-like',
      'Niacinamida ultra-purificada a 5% (uniformização do tom)',
      'Ouro Coloidal 24K carreador para máxima permeação dérmica',
      'Textura aveludada não-comedogênica de rápida absorção',
    ],
  },
  {
    id: 'serum-clarifying-retinol',
    name: 'Sérum Facial Lopes Beautiflyur – Renovação & Clareador',
    subtitle: 'Fórmula Avançada para Uniformização de Manchas e Renovação Celular',
    price: 269.00,
    originalPrice: 345.00,
    volume: '30ml / 1.0 fl oz',
    idealFor: 'Melasma, hiperpigmentação pós-inflamatória, poros dilatados e textura irregular',
    tag: 'Clínico Recomendado',
    features: [
      'Bakuchiol botânico + Ácido Tranexâmico nanoencapsulado',
      'Alfa-Arbutin vegetal com liberação prolongada',
      'Vitamina C Glicosilada 10% de alta estabilidade',
      'Biofermentos probióticos para proteção da barreira cutânea',
      'Seguro para uso pós-procedimentos a laser e peelings da clínica',
    ],
  },
  {
    id: 'kit-ritual-clinico',
    name: 'Kit Ritual Lopes Beautiflyur: Sérum + Mousse Micelar de Ouro',
    subtitle: 'O Tratamento Completo que Potencializa os Resultados da Clínica em Casa',
    price: 369.00,
    originalPrice: 480.00,
    volume: 'Sérum 30ml + Mousse Dourada 150ml + Pincel Aplicador Silk',
    idealFor: 'Quem busca transformação intensiva e manutenção prolongada dos protocolos',
    tag: 'Melhor Custo-Benefício',
    features: [
      '1x Sérum Facial Lopes Beautiflyur Signature 30ml',
      '1x Mousse de Limpeza Dourada com Extrato de Camomila Nobre 150ml',
      '1x Pincel aplicador de cerdas ultrafinas para massagem drenante',
      'Acesso exclusivo à consulta online com especialista da clínica',
      'Frete Grátis para todo o Brasil + E-book de massagem facial linfática',
    ],
  },
];

export const LIMITED_EDITION_PRODUCTS: LimitedEditionProduct[] = [
  {
    id: 'limited-exos-gold-24k',
    name: 'Sérum Exos Supreme Gold 24K – Edição Especial Numerada',
    subtitle: 'Alquimia Dérmica com Exossomos Puros, Ouro Coloidal 24K & Fatores de Crescimento Bioidênticos',
    editionBadge: 'Edição Especial Limitada • Lote Ouro 01',
    unitsRemaining: 7,
    totalBatch: 50,
    batchCode: 'LB-GOLD-01/50',
    price: 389.00,
    originalPrice: 520.00,
    volume: '30ml / 1.0 fl oz • Frasco Ônix Lapidado',
    image: LIMITED_SERUM_GOLD_IMAGE,
    keyBenefits: [
      'Exossomos bioativos liofilizados em suspensão de ouro 24k biocompatível',
      'Matriz de 7 pesos de Ácido Hialurônico reticulado para sustentação imediata',
      'Efeito tensor lifting botox-like com bio-peptídeos biomiméticos de alta densidade',
      'Aceleração regenerativa pós-procedimentos e viço radiante incomparável',
    ],
    exclusiveGift: 'Acompanha Certificado de Autenticidade Numerado e Case Rígido Aveludado',
    stripePaymentUrl: STRIPE_DIRECT_PAYMENT_URL,
    description: 'Desenvolvido nos laboratórios da Clínica Sanluer / Lopes Beautiflyur como o ápice da biotecnologia regenerativa. Cada frasco é único e numerado individualmente.',
  },
  {
    id: 'limited-caviar-night-elixir',
    name: 'Elixir Imperial Exos & Caviar Negro – Regeneração Noturna Profunda',
    subtitle: 'Complexo Celular Reparador com Extrato Puro de Caviar Negro, Retinol Like & Fito-Células Tronco',
    editionBadge: 'Tiragem Rara • Lote Safira Noturno',
    unitsRemaining: 5,
    totalBatch: 40,
    batchCode: 'LB-CAVIAR-02/40',
    price: 429.00,
    originalPrice: 580.00,
    volume: '30ml / 1.0 fl oz • Vidro Fosco Preto Absoluto',
    image: LIMITED_ELIXIR_CAVIAR_IMAGE,
    keyBenefits: [
      'Extrato nobre de caviar negro rico em fosfolipídios e ômega 3 marinho regenerador',
      'Bakuchiol + Nano-Resveratrol a 98% de pureza para rejuvenescimento noturno sem irritação',
      'Estímulo comprovado na síntese de colágeno I e elastina durante o ciclo de sono',
      'Textura óleo-sérum acetinada que sela a hidratação e restaura a barreira cutânea',
    ],
    exclusiveGift: 'Acompanha Espátula Dourada de Massagem Gua Sha e Estojo de Colecionador',
    stripePaymentUrl: STRIPE_DIRECT_PAYMENT_URL,
    description: 'Um ritual de alta regeneração noturna criado para peles exigentes que buscam firmeza absoluta, uniformidade de manchas e revitalização profunda.',
  },
];

export const SPECIAL_CATALOG_PACKAGE: SpecialCatalogPackage = {
  id: 'catalogo-especial-duo-lopes-beautiflyur',
  name: 'Catálogo Especial Colecionador: Box Duo Regenerativo Exos & Caviar',
  subtitle: 'Edição Especial Limitada em estojo luxo rígido numerado contendo os 2 produtos de alta cosmetologia bioidêntica já inclusos por dentro.',
  badge: '1 Catálogo Exclusivo • 2 Produtos Já Inclusos por Dentro',
  batchCode: 'LOTE-ESPECIAL-01/100',
  unitsRemaining: 12,
  totalBatch: 100,
  price: 589.00,
  originalPrice: 850.00,
  stripePaymentUrl: STRIPE_DIRECT_PAYMENT_URL,
  description: 'Desenvolvido como o protocolo clínico mais completo da Lopes Beautiflyur & Clínica Sanluer. Ao adquirir este catálogo especial, você recebe os 2 produtos de alta regeneração perfeitamente acomodados em berço aveludado sob medida para o seu ritual diurno e noturno.',
  image: CATALOG_DUO_BOX_IMAGE,
  includedProducts: [
    {
      id: 'serum-gold-24k',
      name: 'Sérum Exos Supreme Gold 24K (Edição Especial)',
      role: 'Produto 01 Inclusivo • Uso Diurno & Efeito Glow Lifting',
      volume: '30ml / 1.0 fl oz • Frasco Lapidado com Ouro Coloidal',
      actives: 'Ouro Coloidal 24K carreador, Exossomos Bioativos Puros liofilizados, Ácido Hialurônico 7D e Bio-Peptídeos tensores botox-like.',
      benefit: 'Devolve o viço e luminosidade imediata, estimula a firmeza cutânea e sela a barreira da pele ao longo do dia.',
      image: LIMITED_SERUM_GOLD_IMAGE,
    },
    {
      id: 'elixir-caviar-negro',
      name: 'Elixir Imperial Exos & Caviar Negro (Edição Noturna)',
      role: 'Produto 02 Inclusivo • Uso Noturno & Regeneração Profunda',
      volume: '30ml / 1.0 fl oz • Vidro Fosco Preto Absoluto',
      actives: 'Extrato Nobre de Caviar Negro rico em fosfolipídios, Bakuchiol vegetal purificado e Nano-Resveratrol a 98% de pureza.',
      benefit: 'Acelera a regeneração celular durante as horas de sono, reduz hiperpigmentações e estimula a síntese de colágeno I e elastina.',
      image: LIMITED_ELIXIR_CAVIAR_IMAGE,
    },
  ],
  exclusiveGifts: [
    'Estojo rígido de colecionador com revestimento aveludado e fecho magnético',
    'Espátula ergonômica de massagem facial drenante em Quartzo e detalhes dourados',
    'Certificado de autenticidade numerado e lacrado com cera dourada',
    'Frete expresso com seguro de entrega prioritária e rastreio VIP',
  ],
};

export const CLINIC_SPACES: ClinicSpace[] = [
  {
    id: 'lounge-marmore',
    title: 'Lounge de Boas-Vindas & Recepção Privativa',
    category: 'Acolhimento & Exclusividade',
    description: 'Ambiente concebido em mármore Calacatta nobre, iluminação dourada aconchegante e serviço de concierge privativo para seu conforto antes do atendimento.',
    image: CLINIC_LOUNGE_IMAGE,
    techHighlight: 'Ambiente com purificação de ar com filtro HEPA de grau hospitalar e aromaterapia personalizada.',
    features: [
      'Privacidade total e atendimento individualizado com hora marcada',
      'Menu de chás orgânicos e colágeno hidrolisado gelado de cortesia',
      'Espaço expositivo sensorial da linha Lopes Beautiflyur Skincare',
    ],
  },
  {
    id: 'suite-procedimentos',
    title: 'Suíte Master de Procedimentos Faciais',
    category: 'Tecnologia Avançada',
    description: 'Equipada com as tecnologias de estética regenerativa mais conceituadas do mundo, integradas à aplicação imediata da nossa linha de séruns.',
    image: CLINIC_TREATMENT_IMAGE,
    techHighlight: 'Macas térmicas ergonômicas italianas com vibroterapia relaxante durante o procedimento.',
    features: [
      'Fotobioestimulação por Laser Diodo e Ledterapia Dourada',
      'Ultraformer III / Ultrassom Microfocado para contorno mandibular',
      'Drug Delivery estéril com microinfusão do Sérum Lopes Beautiflyur',
    ],
  },
  {
    id: 'consultorio-diagnostico',
    title: 'Consultório de Análise e Diagnóstico Digital',
    category: 'Personalização Científica',
    description: 'Onde o seu protocolo é criado sob medida. Utilizamos scanner dermatológico 3D com luz polarizada para mapear camadas profundas antes de indicar qualquer cosmético.',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
    techHighlight: 'Mapeamento de 8 parâmetros dérmicos: manchas UV, vascularização, rugas, poros, hidratação e sebo.',
    features: [
      'Relatório comparativo de evolução a cada 30 dias',
      'Prescrição individualizada da dosagem do Sérum Facial',
      'Plano integrado com esteta e cosmetóloga especialista',
    ],
  },
  {
    id: 'laboratorio-manipulacao',
    title: 'Laboratório & Cabine de Alquimia Skincare',
    category: 'Linha Própria Exclusiva',
    description: 'Área dedicada à personalização dos boosters adicionais que enriquecem o seu Sérum Facial Lopes Beautiflyur de acordo com o clima e momento da sua pele.',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
    techHighlight: 'Homogeneização em atmosfera estéril com embalagens protegidas contra fotooxidação.',
    features: [
      'Matérias-primas importadas da França e Suíça com laudos de pureza',
      'Sem fragrâncias sintéticas agressivas, parabenos ou corantes',
      'Fórmulas cruelty-free e sustentáveis',
    ],
  },
];

export const CLINIC_PROTOCOLS = [
  {
    id: 'glow-infusion',
    title: 'Protocolo Ouro & Infusão Glow',
    duration: '60 minutos',
    frequency: 'Mensal ou quinzenal',
    badge: 'Protocolo Mais Desejado',
    description: 'Combina limpeza profunda hidrofácial, drenagem facial suave e drug delivery do Sérum Lopes Beautiflyur sob fototerapia dourada.',
    results: 'Luminosidade instantânea, redução imediata de linhas de desidratação e textura sedosa.',
  },
  {
    id: 'lifting-matrix',
    title: 'Bio-Lifting & Colágeno 5D',
    duration: '75 minutos',
    frequency: 'A cada 21 dias',
    badge: 'Rejuvenescimento',
    description: 'Associação de ultrassom microfocado com os peptídeos tensores da fórmula do Sérum Lopes Beautiflyur, restaurando a firmeza do terço médio e inferior da face.',
    results: 'Melhora evidente do contorno facial, tônus reforçado e estímulo prolongado de neocolágeno.',
  },
  {
    id: 'clarity-repair',
    title: 'Clarity Peel & Renovação de Manchas',
    duration: '50 minutos',
    frequency: 'Sessões programadas',
    badge: 'Uniformização',
    description: 'Peeling suave enzimático seguido da aplicação do Sérum Lopes Beautiflyur Clareador com ativos despigmentantes e biofermentos calmantes.',
    results: 'Uniformidade gradativa de tons, clareamento seguro e poros notavelmente mais refinados.',
  },
];

export const TESTIMONIALS: TestimonialResult[] = [
  {
    id: '1',
    name: 'Dra. Carolina Mendonça',
    age: 38,
    treatment: 'Protocolo Ouro & Infusão Glow',
    serumUsage: 'Uso diário manhã e noite (Sérum Signature)',
    timeframe: '4 semanas de tratamento',
    quote: 'O que mais me impressionou foi a sinergia. O procedimento na clínica preparou minha pele de uma forma que o Sérum Lopes Beautiflyur agiu em dias o que outros cosméticos demoravam meses. Meu rosto recuperou aquele brilho vivo e viçoso de quem dormiu 10 horas.',
    rating: 5,
    beforeAfterDescription: 'Melhora de 87% na hidratação dérmica e redução visível nas linhas periorbitais.',
    metrics: { label: 'Aumento de Luminosidade', value: '+92%' },
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '2',
    name: 'Beatriz Vasconcellos',
    age: 44,
    treatment: 'Bio-Lifting & Colágeno 5D',
    serumUsage: 'Sérum Signature + Mousse Micelar',
    timeframe: '6 semanas de tratamento',
    quote: 'Minha pele estava sem vida e começando a perder contorno. A Dra. Lopes fez uma avaliação personalizada detalhada e montou a rotina com o Sérum da própria clínica. Não troco por nenhuma marca internacional.',
    rating: 5,
    beforeAfterDescription: 'Restabelecimento do contorno mandibular e diminuição do aspecto de cansaço facial.',
    metrics: { label: 'Firmeza e Densidade', value: '+84%' },
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '3',
    name: 'Mariana Duarte',
    age: 31,
    treatment: 'Clarity Peel & Renovação',
    serumUsage: 'Sérum Clareador Lopes Beautiflyur',
    timeframe: '3 semanas de uso contínuo',
    quote: 'Sofria muito com manchinhas de acne e sensibilidade a ácidos comuns. O Sérum da Lopes Beautiflyur não ardeu, hidratou na medida e já clareou boa parte das marcas. A experiência na clínica foi impecável, um verdadeiro oásis em SP.',
    rating: 5,
    beforeAfterDescription: 'Atenuação homogênea das manchas e controle sustentado de oleosidade na zona T.',
    metrics: { label: 'Uniformização do Tom', value: '+89%' },
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'skin-type',
    question: 'Como você descreveria a textura e comportamento atual da sua pele?',
    description: 'Identificar a resposta biológica da sua barreira cutânea é o primeiro passo.',
    options: [
      { id: 'dry', label: 'Seca / Desidratada', description: 'Sensação de repuxamento, opacidade e linhas visíveis' },
      { id: 'combination', label: 'Mista / Normal', description: 'Oleosidade moderada na zona T e bochechas normais ou secas' },
      { id: 'oily', label: 'Oleosa / Tendência a Poros', description: 'Brilho excessivo ao longo do dia e poros mais evidentes' },
      { id: 'sensitive', label: 'Sensível / Reativa', description: 'Fácil vermelhidão, sensibilidade ao toque e irritabilidade' },
    ],
  },
  {
    id: 'main-concern',
    question: 'Qual é o seu objetivo prioritário de transformação?',
    description: 'O protocolo unirá o ativo certo do Sérum com o procedimento clínico exato.',
    options: [
      { id: 'glow', label: 'Luminosidade & Viço Imediato', description: 'Acabar com o aspecto de pele cansada e sem vitalidade' },
      { id: 'aging', label: 'Firmeza, Linhas & Rejuvenescimento', description: 'Estímulo de colágeno e efeito tensor contra a flacidez' },
      { id: 'spots', label: 'Clareamento de Manchas & Melasma', description: 'Uniformização de tonalidade e renovação da superfície' },
      { id: 'pores', label: 'Poros Refinados & Textura Sedosa', description: 'Aveludamento da pele e controle do relevo irregular' },
    ],
  },
  {
    id: 'lifestyle',
    question: 'Qual é a sua disponibilidade para cuidados em clínica e home care?',
    description: 'Adequamos o cronograma à sua rotina para garantir consistência real.',
    options: [
      { id: 'full', label: 'Completo (Clínica + Home Care diário)', description: 'Desejo a experiência integral com consultas e produtos' },
      { id: 'serum-first', label: 'Começar com o Sérum em Casa', description: 'Quero iniciar com o Sérum Lopes Beautiflyur e agendar clínica depois' },
      { id: 'special-event', label: 'Preparação para Ocasião Especial', description: 'Preciso de resultados visíveis nas próximas 2 a 4 semanas' },
    ],
  },
];

export const INSTAGRAM_POSTS = [
  {
    id: 'post-1',
    image: SERUM_HERO_IMAGE,
    caption: 'A gota dourada que redefine o skincare. Conheça a textura aveludada do nosso Sérum Facial com bio-peptídeos 💎 #LopesBeautiflyur',
    likes: '1.420',
    comments: '88',
    type: 'Produto',
  },
  {
    id: 'post-2',
    image: CLINIC_LOUNGE_IMAGE,
    caption: 'Nosso espaço foi pensado como um refúgio de serenidade em mármore e ouro. Agende seu horário privativo ✨ #ClinicaEstetica',
    likes: '954',
    comments: '42',
    type: 'Clínica',
  },
  {
    id: 'post-3',
    image: CLINIC_TREATMENT_IMAGE,
    caption: 'Bastidores de uma sessão do Protocolo Ouro & Infusão Glow. Veja o viço imediato logo após a aplicação do Sérum! 💫 #ResultadosReais',
    likes: '2.110',
    comments: '135',
    type: 'Procedimento',
  },
  {
    id: 'post-4',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
    caption: 'Por que associar procedimentos em cabine à nossa linha exclusiva de skincare? A ciência da permeação explicada 🔬 #DermatologiaEstetica',
    likes: '1.830',
    comments: '97',
    type: 'Educação',
  },
];

export const FAQS = [
  {
    question: 'O que torna o Sérum Facial Lopes Beautiflyur diferente de outros séruns comerciais?',
    answer: 'O Sérum Lopes Beautiflyur foi desenvolvido no ambiente clínico com base na observação real de milhares de atendimentos. Ele utiliza ácido hialurônico em cinco pesos moleculares associado a bio-peptídeos e ouro 24k carreador, garantindo penetração dérmica profunda e compatibilidade imediata com peles submetidas a procedimentos estéticos.',
  },
  {
    question: 'Posso usar o Sérum Facial mesmo sem fazer procedimentos na clínica?',
    answer: 'Sim, com certeza! A fórmula foi concebida para ser um tratamento autônomo de alta potência em casa, entregando viço, firmeza e hidratação diária. Quando associada aos protocolos presenciais da clínica, os resultados são apenas acelerados em até 3 vezes.',
  },
  {
    question: 'Como funciona o envio do produto e quanto tempo demora a entrega?',
    answer: 'Enviamos para todo o Brasil via transportadora expressa com rastreamento em tempo real. O frete é grátis nas compras acima de R$ 200,00 e o prazo médio para capitais é de 2 a 4 dias úteis em embalagem termoprotetora anti-impacto.',
  },
  {
    question: 'Como agendar uma avaliação ou visita para conhecer a clínica?',
    answer: 'Você pode clicar no botão de WhatsApp a qualquer momento para falar diretamente com a nossa concierge. Nossos atendimentos são exclusivamente com horário marcado para garantir total privacidade e um atendimento sem esperas.',
  },
  {
    question: 'O Sérum Facial é indicado para todos os tipos de pele?',
    answer: 'Sim! A fórmula do Sérum Signature é oil-free, não obstrui poros e possui pH fisiológico ideal (5.5). Temos também a variação Clareadora para peles com tendência a manchas e melasma.',
  },
];
