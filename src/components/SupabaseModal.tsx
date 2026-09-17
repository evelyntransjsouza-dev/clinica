import React, { useState, useEffect } from 'react';
import { 
  Database, X, Check, Copy, Sparkles, RefreshCw, ShieldCheck, 
  ExternalLink, Table, ListPlus, Terminal, CheckCircle2, AlertCircle, 
  Layers, Package, Calendar, UserCheck, ShoppingBag, HardDrive, Lock
} from 'lucide-react';
import { 
  getSupabaseConfig, saveCustomSupabaseConfig, 
  testSupabaseConnection, isSupabaseConfigured 
} from '../lib/supabase';
import { supabaseService } from '../services/supabaseService';
import { CLINIC_STORAGE_SQL } from '../data/supabaseSql';

interface SupabaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupabaseModal: React.FC<SupabaseModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'status' | 'sql' | 'records' | 'new_item'>('status');
  const [url, setUrl] = useState('');
  const [key, setKey] = useState('');
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [copiedSql, setCopiedSql] = useState(false);
  const [storedRecords, setStoredRecords] = useState(supabaseService.getStoredRecords());

  // New product form state
  const [newProdName, setNewProdName] = useState('Sérum Rejuvenescedor Noturno');
  const [newProdPrice, setNewProdPrice] = useState('299.00');
  const [newProdCategory, setNewProdCategory] = useState('serum_facial');
  const [newProdActive, setNewProdActive] = useState('Ácido Glicólico 8% & Retinol Puro');
  const [savingItem, setSavingItem] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      const config = getSupabaseConfig();
      setUrl(config.url);
      setKey(config.key);
      setStoredRecords(supabaseService.getStoredRecords());
      setTestResult(null);
      setSaveMessage(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSaveAndTest = async () => {
    setIsTesting(true);
    setTestResult(null);
    saveCustomSupabaseConfig(url, key);

    const result = await testSupabaseConnection();
    setTestResult(result);
    setIsTesting(false);
    setStoredRecords(supabaseService.getStoredRecords());
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(CLINIC_STORAGE_SQL);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  const handleCreateTestProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingItem(true);
    setSaveMessage(null);

    const result = await supabaseService.saveProduct({
      id: `prod-${Date.now()}`,
      name: newProdName,
      price: parseFloat(newProdPrice) || 299,
      subtitle: newProdActive,
      description: `Produto exclusivo da clínica Lopes Beautiflyur formulado com ${newProdActive}.`,
      inStock: true,
      features: [newProdActive, 'Dermatologicamente testado', 'Uso diário']
    });

    setSavingItem(false);
    setSaveMessage(
      result.source === 'supabase' 
        ? '✨ Produto salvo com sucesso no banco de dados Supabase!' 
        : '💾 Produto salvo no registro local do sistema! (Será sincronizado assim que o Supabase estiver com as chaves ativas)'
    );
    setStoredRecords(supabaseService.getStoredRecords());
  };

  const isConfigured = isSupabaseConfigured();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] shadow-2xl border border-[#E2C799] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#171513] to-[#2B2721] p-5 text-white flex items-center justify-between border-b border-[#D4AF37]/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#3A332B] border border-[#D4AF37]/50 flex items-center justify-center text-[#E2C799]">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-luxury text-lg font-bold text-white tracking-wide">
                  Conexão Supabase
                </h3>
                {isConfigured ? (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EBF7EE] text-[#2E7D32] border border-[#A5D6A7] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D32] animate-pulse"></span>
                    Configurado
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FFF9E6] text-[#B8860B] border border-[#FFE082] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B8860B]"></span>
                    Pronto para Conectar
                  </span>
                )}
              </div>
              <p className="text-xs text-[#C7BCAD]">
                Sistema preparado para persistir produtos, pedidos, diagnósticos e clientes.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#A69B8D] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#EAE3D4] bg-[#FAF8F5] px-5 pt-3 gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('status')}
            className={`pb-2.5 px-3 text-xs font-bold transition-all border-b-2 whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'status'
                ? 'border-[#B8860B] text-[#8A6317]'
                : 'border-transparent text-[#6B635A] hover:text-[#1A1816]'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Credenciais & Conexão
          </button>

          <button
            onClick={() => setActiveTab('new_item')}
            className={`pb-2.5 px-3 text-xs font-bold transition-all border-b-2 whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'new_item'
                ? 'border-[#B8860B] text-[#8A6317]'
                : 'border-transparent text-[#6B635A] hover:text-[#1A1816]'
            }`}
          >
            <ListPlus className="w-3.5 h-3.5" />
            Criar Registro no Sistema
          </button>

          <button
            onClick={() => setActiveTab('records')}
            className={`pb-2.5 px-3 text-xs font-bold transition-all border-b-2 whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'records'
                ? 'border-[#B8860B] text-[#8A6317]'
                : 'border-transparent text-[#6B635A] hover:text-[#1A1816]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Registros ({storedRecords.totalCount})
          </button>

          <button
            onClick={() => setActiveTab('sql')}
            className={`pb-2.5 px-3 text-xs font-bold transition-all border-b-2 whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'sql'
                ? 'border-[#B8860B] text-[#8A6317]'
                : 'border-transparent text-[#6B635A] hover:text-[#1A1816]'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            Script SQL das Tabelas
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto flex-grow space-y-5 bg-white text-xs text-[#3D3730]">
          
          {/* TAB 1: STATUS & CREDENTIALS */}
          {activeTab === 'status' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#FCFAF7] border border-[#EAE3D4] space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm text-[#1A1816]">
                  <Sparkles className="w-4 h-4 text-[#B8860B]" />
                  <span>O sistema já está 100% preparado para o Supabase</span>
                </div>
                <p className="text-xs text-[#6B635A] leading-relaxed">
                  Todas as chamadas do carrinho de compras, diagnósticos do quiz e agendamentos já estão integradas ao serviço Supabase. 
                  Você pode usar suas variáveis no arquivo <code>.env</code> ou colar abaixo a URL e Anon Key do seu projeto Supabase:
                </p>
              </div>

              <div className="space-y-3 pt-1">
                <div>
                  <label className="block text-xs font-bold text-[#1A1816] mb-1">
                    Project URL (VITE_SUPABASE_URL)
                  </label>
                  <input
                    type="url"
                    placeholder="https://exemplo.supabase.co"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#DCD3C5] focus:outline-none focus:ring-2 focus:ring-[#B8860B] text-xs font-mono"
                  />
                  <span className="text-[10px] text-[#8C8377] mt-0.5 block">
                    Encontrado no Supabase em: Project Settings &rarr; API &rarr; Project URL
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1A1816] mb-1">
                    Project API Key (Anon / Public Key - VITE_SUPABASE_ANON_KEY)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#DCD3C5] focus:outline-none focus:ring-2 focus:ring-[#B8860B] text-xs font-mono resize-none"
                  />
                  <span className="text-[10px] text-[#8C8377] mt-0.5 block">
                    Encontrado no Supabase em: Project Settings &rarr; API &rarr; Project API Keys &rarr; anon public
                  </span>
                </div>
              </div>

              {testResult && (
                <div className={`p-3.5 rounded-xl border flex items-start gap-2.5 ${
                  testResult.success 
                    ? 'bg-[#EBF7EE] border-[#A5D6A7] text-[#1B5E20]' 
                    : 'bg-[#FDEDEC] border-[#F5B7B1] text-[#78281F]'
                }`}>
                  {testResult.success ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-[#2E7D32]" />
                  ) : (
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#C0392B]" />
                  )}
                  <div className="space-y-0.5">
                    <span className="font-bold block">
                      {testResult.success ? 'Conexão Estabelecida!' : 'Atenção na Conexão:'}
                    </span>
                    <p className="text-xs leading-relaxed">{testResult.message}</p>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <a
                  href="https://supabase.com/dashboard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-[#8A6317] hover:underline flex items-center gap-1"
                >
                  Abrir Dashboard do Supabase
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  type="button"
                  onClick={handleSaveAndTest}
                  disabled={isTesting}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#B8860B] to-[#D4AF37] hover:from-[#A67709] hover:to-[#C29F2F] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isTesting ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      Testando Conexão...
                    </>
                  ) : (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      Salvar & Testar Conexão
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: CRIAR REGISTRO NO SISTEMA */}
          {activeTab === 'new_item' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-[#FCFAF7] border border-[#EAE3D4]">
                <h4 className="font-bold text-xs text-[#1A1816] mb-1">
                  Cadastrar Novo Produto ou Linha da Clínica
                </h4>
                <p className="text-[11px] text-[#6B635A]">
                  Preencha o formulário abaixo. Ele salvará instantaneamente na tabela <code>public.products</code> do Supabase e no catálogo do sistema.
                </p>
              </div>

              <form onSubmit={handleCreateTestProduct} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-[#1A1816] mb-1">
                    Nome do Produto / Tratamento
                  </label>
                  <input
                    type="text"
                    value={newProdName}
                    onChange={(e) => setNewProdName(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-xl border border-[#DCD3C5] focus:outline-none focus:ring-2 focus:ring-[#B8860B] text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#1A1816] mb-1">
                      Preço (R$)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={newProdPrice}
                      onChange={(e) => setNewProdPrice(e.target.value)}
                      required
                      className="w-full px-3 py-2 rounded-xl border border-[#DCD3C5] focus:outline-none focus:ring-2 focus:ring-[#B8860B] text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1A1816] mb-1">
                      Categoria
                    </label>
                    <select
                      value={newProdCategory}
                      onChange={(e) => setNewProdCategory(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[#DCD3C5] focus:outline-none focus:ring-2 focus:ring-[#B8860B] text-xs bg-white"
                    >
                      <option value="serum_facial">Sérum Facial</option>
                      <option value="clinica">Procedimento Clínico</option>
                      <option value="kits">Kits & Rituais</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1A1816] mb-1">
                    Ativos Principais / Subtítulo
                  </label>
                  <input
                    type="text"
                    value={newProdActive}
                    onChange={(e) => setNewProdActive(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#DCD3C5] focus:outline-none focus:ring-2 focus:ring-[#B8860B] text-xs"
                  />
                </div>

                {saveMessage && (
                  <div className="p-3 rounded-xl bg-[#EBF7EE] border border-[#A5D6A7] text-[#1B5E20] text-xs font-medium">
                    {saveMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={savingItem}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#1A1816] to-[#363028] text-white font-bold text-xs shadow-md hover:from-black hover:to-[#221F1C] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {savingItem ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      Guardando no Sistema...
                    </>
                  ) : (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#E2C799]" />
                      Guardar Produto no Sistema
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          {/* TAB 3: REGISTROS GUARDADOS */}
          {activeTab === 'records' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-[#1A1816]">
                  Atividades & Registros Salvos no Sistema
                </span>
                <button
                  onClick={() => setStoredRecords(supabaseService.getStoredRecords())}
                  className="text-[11px] text-[#8A6317] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  Atualizar
                </button>
              </div>

              {storedRecords.totalCount === 0 ? (
                <div className="p-8 text-center bg-[#FAF8F5] rounded-2xl border border-dashed border-[#DCD3C5] space-y-2">
                  <Package className="w-8 h-8 text-[#B8860B]/60 mx-auto" />
                  <h4 className="font-bold text-xs text-[#2C2926]">Nenhum registro criado ainda</h4>
                  <p className="text-[11px] text-[#7A7268]">
                    Assim que um cliente fizer um pedido, preencher o diagnóstico de pele ou você cadastrar um produto, ele aparecerá aqui e no Supabase!
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {/* Orders */}
                  {storedRecords.orders.length > 0 && (
                    <div className="space-y-1.5">
                      <div className="font-bold text-[11px] text-[#8A6317] flex items-center gap-1.5">
                        <ShoppingBag className="w-3 h-3" />
                        Pedidos Realizados ({storedRecords.orders.length})
                      </div>
                      <div className="space-y-1">
                        {storedRecords.orders.map((ord: any, i: number) => (
                          <div key={i} className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#EAE3D4] flex items-center justify-between text-[11px]">
                            <div>
                              <span className="font-bold text-[#1A1816]">{ord.orderNumber}</span>
                              <span className="text-[#6B635A] ml-2">Cliente: {ord.customerName}</span>
                            </div>
                            <span className="font-bold text-[#2E7D32]">R$ {Number(ord.total).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Diagnostics */}
                  {storedRecords.diagnostics.length > 0 && (
                    <div className="space-y-1.5 pt-2">
                      <div className="font-bold text-[11px] text-[#8A6317] flex items-center gap-1.5">
                        <UserCheck className="w-3 h-3" />
                        Diagnósticos de Pele do Quiz ({storedRecords.diagnostics.length})
                      </div>
                      <div className="space-y-1">
                        {storedRecords.diagnostics.map((diag: any, i: number) => (
                          <div key={i} className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#EAE3D4] flex items-center justify-between text-[11px]">
                            <div>
                              <span className="font-bold text-[#1A1816]">{diag.skinType}</span>
                              <span className="text-[#6B635A] ml-2">Foco: {diag.mainConcern}</span>
                            </div>
                            <span className="text-[#8A6317] font-semibold">{diag.recommendedFormula}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Custom Products */}
                  {storedRecords.products.length > 0 && (
                    <div className="space-y-1.5 pt-2">
                      <div className="font-bold text-[11px] text-[#8A6317] flex items-center gap-1.5">
                        <Package className="w-3 h-3" />
                        Produtos Criados ({storedRecords.products.length})
                      </div>
                      <div className="space-y-1">
                        {storedRecords.products.map((prod: any, i: number) => (
                          <div key={i} className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#EAE3D4] flex items-center justify-between text-[11px]">
                            <div>
                              <span className="font-bold text-[#1A1816]">{prod.name}</span>
                              <span className="text-[#6B635A] ml-2">{prod.subtitle}</span>
                            </div>
                            <span className="font-bold text-[#8A6317]">R$ {Number(prod.price).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: SQL SCRIPT */}
          {activeTab === 'sql' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-xs text-[#1A1816] block">
                    Script SQL com Armazenamento (Storage) & RLS Ativadas
                  </span>
                  <span className="text-[11px] text-[#70665A]">
                    Inclui 4 buckets de storage, políticas de segurança e todas as tabelas da clínica
                  </span>
                </div>
                <button
                  onClick={handleCopySql}
                  className="px-3.5 py-2 rounded-xl bg-[#1A1816] hover:bg-black text-white text-[11px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 shadow-xs"
                >
                  {copiedSql ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#2E7D32]" />
                      Copiado com Sucesso!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#E2C799]" />
                      Copiar SQL Completo
                    </>
                  )}
                </button>
              </div>

              {/* Badges of Storage Buckets and Security */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                <div className="p-2 rounded-xl bg-[#FAF8F5] border border-[#EAE3D4] text-[11px]">
                  <div className="flex items-center gap-1 text-[#8A6317] font-bold">
                    <HardDrive className="w-3 h-3 text-[#B8860B]" />
                    <span>clinic-media</span>
                  </div>
                  <span className="text-[10px] text-[#70665A]">Público • Salas & Mídia</span>
                </div>
                <div className="p-2 rounded-xl bg-[#FAF8F5] border border-[#EAE3D4] text-[11px]">
                  <div className="flex items-center gap-1 text-[#8A6317] font-bold">
                    <Package className="w-3 h-3 text-[#B8860B]" />
                    <span>product-images</span>
                  </div>
                  <span className="text-[10px] text-[#70665A]">Público • Séruns & Fotos</span>
                </div>
                <div className="p-2 rounded-xl bg-[#FAF8F5] border border-[#EAE3D4] text-[11px]">
                  <div className="flex items-center gap-1 text-[#2E7D32] font-bold">
                    <Lock className="w-3 h-3 text-[#2E7D32]" />
                    <span>patient-diagnostics</span>
                  </div>
                  <span className="text-[10px] text-[#70665A]">Privado • Fotos de Pele</span>
                </div>
                <div className="p-2 rounded-xl bg-[#FAF8F5] border border-[#EAE3D4] text-[11px]">
                  <div className="flex items-center gap-1 text-[#2E7D32] font-bold">
                    <ShieldCheck className="w-3 h-3 text-[#2E7D32]" />
                    <span>clinical-documents</span>
                  </div>
                  <span className="text-[10px] text-[#70665A]">Privado • Laudos & PDFs</span>
                </div>
              </div>

              <p className="text-[11px] text-[#6B635A]">
                Copie o script abaixo e cole no <strong>SQL Editor</strong> do painel Supabase. Ele configura os buckets de armazenamento, ativa as políticas de segurança RLS (leitura e upload) e cria as tabelas de dados:
              </p>

              <pre className="p-3.5 rounded-2xl bg-[#171513] text-[#E8D39E] font-mono text-[10px] overflow-x-auto max-h-72 border border-[#3A332B] leading-relaxed select-all">
                {CLINIC_STORAGE_SQL}
              </pre>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-[#FAF8F5] border-t border-[#EAE3D4] flex items-center justify-between text-xs text-[#6B635A]">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#B8860B]" />
            Pronto para persistência de dados em nuvem
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white hover:bg-[#F0EAE1] border border-[#DCD3C5] font-bold text-xs text-[#2C2926] transition-colors cursor-pointer"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
};
