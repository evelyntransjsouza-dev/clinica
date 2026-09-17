import React, { useState, useEffect, useRef } from 'react';
import Markdown from 'react-markdown';
import { 
  Bot, X, Send, Sparkles, RotateCcw, ExternalLink, 
  MessageSquare, Loader2, ArrowRight, ShieldCheck, HeartHandshake
} from 'lucide-react';
import { ROBOT_CHAT_WEBHOOK_URL, ROBOT_CHAT_INSTANCE_ID, BRAND_CONFIG } from '../data/content';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
}

export const FloatingRobotChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTeaser, setShowTeaser] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Persistent session ID for n8n chat continuity
  const [sessionId] = useState<string>(() => {
    try {
      const stored = sessionStorage.getItem('LB_ROBOT_SESSION_ID');
      if (stored) return stored;
      const newId = 'session_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
      sessionStorage.setItem('LB_ROBOT_SESSION_ID', newId);
      return newId;
    } catch {
      return 'session_' + Date.now();
    }
  });

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: 'Olá! Sou a **Rafaela, sua assistente virtual** da **Clínica Lopes Beautiflyur** 🌸\n\nEstou aqui para te ajudar a escolher o sérum ideal, explicar protocolos e tirar dúvidas. Como posso cuidar de você hoje?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll on new message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isOpen]);

  // Show automatic greeting teaser after 2.5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      const dismissed = sessionStorage.getItem('LB_CHAT_TEASER_DISMISSED');
      if (!dismissed && !isOpen) {
        setShowTeaser(true);
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [isOpen]);

  const handleOpenChat = () => {
    setIsOpen(true);
    setShowTeaser(false);
    try {
      sessionStorage.setItem('LB_CHAT_TEASER_DISMISSED', 'true');
    } catch {
      // ignore
    }
    setTimeout(() => {
      inputRef.current?.focus();
    }, 200);
  };

  const handleDismissTeaser = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowTeaser(false);
    try {
      sessionStorage.setItem('LB_CHAT_TEASER_DISMISSED', 'true');
    } catch {
      // ignore
    }
  };

  const handleResetChat = () => {
    const newSession = 'session_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
    try {
      sessionStorage.setItem('LB_ROBOT_SESSION_ID', newSession);
    } catch {
      // ignore
    }
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'bot',
        text: 'Conversa reiniciada! 🌸 Em que posso te ajudar agora?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
    ]);
    setErrorMessage(null);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isLoading) return;

    const userMsgId = 'user_' + Date.now();
    const userTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setMessages((prev) => [
      ...prev,
      {
        id: userMsgId,
        sender: 'user',
        text,
        timestamp: userTimestamp,
      },
    ]);

    setInputText('');
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch(ROBOT_CHAT_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Instance-Id': ROBOT_CHAT_INSTANCE_ID,
        },
        body: JSON.stringify({
          action: 'sendMessage',
          chatInput: text,
          sessionId: sessionId,
        }),
      });

      if (!response.ok) {
        throw new Error(`Servidor respondeu com status ${response.status}`);
      }

      const data = await response.json();
      const botReply = data.output || data.text || data.message || (typeof data === 'string' ? data : 'Entendido! Como mais posso te auxiliar?');

      setMessages((prev) => [
        ...prev,
        {
          id: 'bot_' + Date.now(),
          sender: 'bot',
          text: botReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (err: any) {
      console.error('Error contacting n8n assistant:', err);
      setErrorMessage('Não consegui conectar no momento. Você pode tentar novamente ou falar no WhatsApp!');
      setMessages((prev) => [
        ...prev,
        {
          id: 'bot_err_' + Date.now(),
          sender: 'bot',
          text: 'Ops! Houve uma oscilação temporária na conexão. Você pode tentar novamente em alguns instantes ou [abrir o chat oficial em nova janela](' + ROBOT_CHAT_WEBHOOK_URL + '). 🌸',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  const QUICK_PROMPTS = [
    'Qual sérum é ideal para manchas e melasma?',
    'Como funciona a Edição Especial com os 2 produtos?',
    'Como faço o pagamento direto via Stripe?',
    'Onde fica a clínica em São Paulo?',
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      
      {/* 1. Automated Greeting Teaser Bubble */}
      {showTeaser && !isOpen && (
        <div 
          onClick={handleOpenChat}
          className="pointer-events-auto mb-3 max-w-xs bg-[#1C1917] border border-[#DFC28A]/60 text-white p-3.5 rounded-2xl rounded-br-none shadow-2xl cursor-pointer hover:border-[#DFC28A] transition-all transform hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-3 duration-300"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#DFC28A]/20 flex items-center justify-center text-[#DFC28A]">
                <Bot className="w-3.5 h-3.5" />
              </div>
              <span className="text-[11px] font-bold text-[#DFC28A]">Rafaela • Sua Assistente Virtual</span>
            </div>
            <button 
              type="button" 
              onClick={handleDismissTeaser}
              className="text-[#A89D8E] hover:text-white p-0.5 rounded transition-colors"
              aria-label="Fechar aviso"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="mt-1.5 text-xs text-[#EAE5DC] leading-snug">
            Oi! Posso tirar suas dúvidas sobre nossos <strong>Séruns</strong> ou sobre o <strong>Catálogo Especial</strong> agora mesmo? ✨
          </p>
          <div className="mt-2 flex items-center gap-1 text-[10px] text-[#DFC28A] font-semibold">
            <span>Clique para conversar</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>
      )}

      {/* 2. Interactive Chat Window (Open State) */}
      {isOpen && (
        <div 
          id="robot-chat-modal"
          className="pointer-events-auto mb-3 w-[92vw] sm:w-[420px] max-w-[420px] h-[580px] max-h-[82vh] bg-[#FAF8F5] rounded-3xl shadow-2xl border border-[#DFC28A]/50 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300"
        >
          {/* Header */}
          <div className="bg-[#1C1917] border-b border-[#DFC28A]/30 p-4 text-white flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#2A2318] to-[#121110] border border-[#DFC28A]/60 flex items-center justify-center text-[#DFC28A] shadow-md">
                  <Bot className="w-5 h-5 text-[#DFC28A]" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#10B981] rounded-full border-2 border-[#1C1917]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-serif text-sm font-bold text-[#F9F6F0]">Rafaela</h3>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-bold uppercase tracking-wider bg-[#DFC28A]/20 text-[#DFC28A] border border-[#DFC28A]/30">
                    Sua Assistente Virtual
                  </span>
                </div>
                <p className="text-[10px] text-[#C4B7A5] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                  Atendimento online 24/7 Sanluer
                </p>
              </div>
            </div>

            {/* Actions: Reset, External Link, Close */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleResetChat}
                title="Reiniciar conversa"
                className="p-1.5 text-[#A89D8E] hover:text-[#DFC28A] hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <a
                href={ROBOT_CHAT_WEBHOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                title="Abrir página oficial do chat"
                className="p-1.5 text-[#A89D8E] hover:text-[#DFC28A] hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
              >
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Fechar chat"
                className="p-1.5 text-[#A89D8E] hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer ml-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Sub-bar: Status & Context */}
          <div className="bg-[#26221D] px-4 py-1.5 border-b border-[#DFC28A]/20 text-[10px] text-[#C4B7A5] flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#DFC28A]" />
              Rafaela • Sua Assistente Virtual
            </span>
            <a
              href={`https://wa.me/${BRAND_CONFIG.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#DFC28A] hover:underline flex items-center gap-1 font-medium"
            >
              <HeartHandshake className="w-3 h-3" />
              Chamar atendente humana
            </a>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-gradient-to-b from-[#F7F4EE] to-[#EFECE4] text-xs">
            {messages.map((msg) => {
              const isBot = msg.sender === 'bot';

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isBot ? 'items-start' : 'items-end'}`}
                >
                  <div
                    className={`max-w-[88%] p-3.5 rounded-2xl shadow-xs leading-relaxed ${
                      isBot
                        ? 'bg-white text-[#2C2926] border border-[#E5DFD3] rounded-tl-xs'
                        : 'bg-[#1C1917] text-[#F9F6F0] border border-[#DFC28A]/30 rounded-tr-xs'
                    }`}
                  >
                    {isBot ? (
                      <div className="markdown-body text-xs space-y-2 [&_p]:mb-1.5 [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_strong]:text-[#8A6317] [&_strong]:font-semibold [&_table]:w-full [&_table]:border-collapse [&_table]:my-2 [&_th]:bg-[#FAF5E8] [&_th]:p-1.5 [&_th]:border [&_th]:border-[#EAE3D4] [&_td]:p-1.5 [&_td]:border [&_td]:border-[#EAE3D4] [&_a]:text-[#B8860B] [&_a]:underline font-normal">
                        <Markdown>{msg.text}</Markdown>
                      </div>
                    ) : (
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                    )}
                  </div>
                  <span className="text-[9px] text-[#A89D8E] mt-1 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              );
            })}

            {/* Robot Typing Indicator */}
            {isLoading && (
              <div className="flex items-start gap-2">
                <div className="bg-white border border-[#E5DFD3] p-3 rounded-2xl rounded-tl-xs shadow-xs flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B8860B] animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B8860B] animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B8860B] animate-bounce" />
                  </div>
                  <span className="text-[11px] text-[#8C8377] font-medium">
                    Rafaela digitando...
                  </span>
                </div>
              </div>
            )}

            {errorMessage && (
              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-[11px] flex items-center justify-between">
                <span>{errorMessage}</span>
                <button
                  type="button"
                  onClick={() => handleSendMessage()}
                  className="font-bold underline shrink-0 ml-2"
                >
                  Tentar de novo
                </button>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions Chips */}
          <div className="px-3 py-2 bg-[#F5F1E8] border-t border-[#E5DFD3] shrink-0 overflow-x-auto flex items-center gap-1.5 no-scrollbar">
            {QUICK_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(prompt)}
                disabled={isLoading}
                className="whitespace-nowrap px-2.5 py-1 rounded-full text-[10px] font-medium bg-white hover:bg-[#FAF5E8] border border-[#DFC28A]/40 text-[#7A5A18] hover:text-[#5A400C] transition-all shrink-0 cursor-pointer disabled:opacity-50"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-[#E5DFD3] flex items-center gap-2 shrink-0"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Pergunte algo para a Rafaela..."
              disabled={isLoading}
              className="flex-1 py-2.5 px-3.5 rounded-xl bg-[#FAF8F5] border border-[#DFC28A]/40 text-xs text-[#2C2926] placeholder-[#A89D8E] focus:outline-none focus:border-[#B8860B] focus:bg-white transition-all disabled:opacity-60"
            />

            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#DFC28A] to-[#B8860B] hover:from-[#E8D39E] hover:to-[#DFC28A] text-[#141210] flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md cursor-pointer shrink-0"
              aria-label="Enviar mensagem"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin text-[#141210]" />
              ) : (
                <Send className="w-4 h-4 text-[#141210]" />
              )}
            </button>
          </form>

          {/* Footer Security Note */}
          <div className="py-1 px-3 bg-[#FAF8F5] border-t border-[#EFECE4] text-[10px] text-center text-[#8C8377] flex items-center justify-center gap-1">
            <ShieldCheck className="w-3 h-3 text-[#B8860B]" />
            <span>Respostas geradas com IA & protocolos da Clínica Sanluer</span>
          </div>
        </div>
      )}

      {/* 3. The Main Floating Trigger Button */}
      <button
        id="btn-open-assistant-chat"
        type="button"
        onClick={isOpen ? () => setIsOpen(false) : handleOpenChat}
        className="pointer-events-auto relative group p-3.5 sm:p-4 rounded-full bg-gradient-to-br from-[#1C1917] via-[#2A2318] to-[#121110] hover:scale-105 border-2 border-[#DFC28A] text-[#DFC28A] shadow-2xl transition-all duration-300 cursor-pointer flex items-center justify-center"
        aria-label="Conversar com Rafaela, sua assistente virtual"
      >
        {/* Glowing Pulsing Ring */}
        <span className="absolute -inset-1 rounded-full bg-[#DFC28A]/30 blur-sm group-hover:bg-[#DFC28A]/50 transition-all animate-pulse" />

        {/* Status indicator dot */}
        <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-[#10B981] rounded-full border-2 border-[#1C1917] flex items-center justify-center">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
        </span>

        {isOpen ? (
          <X className="w-6 h-6 text-[#DFC28A] relative z-10" />
        ) : (
          <div className="flex items-center gap-2 relative z-10">
            <Sparkles className="w-5 h-5 text-[#DFC28A]" />
            <span className="hidden sm:inline text-xs font-bold text-[#DFC28A] pr-1">
              Rafaela • Sua Assistente Virtual
            </span>
          </div>
        )}
      </button>

    </div>
  );
};
