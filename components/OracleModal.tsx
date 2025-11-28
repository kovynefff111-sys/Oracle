import React, { useState } from 'react';
import { Sparkles, X, Send } from 'lucide-react';
import { askOracle } from '../services/geminiService';

const OracleModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    setResponse(null);
    
    const answer = await askOracle(input);
    
    setResponse(answer);
    setIsLoading(false);
    setInput('');
  };

  return (
    <>
      {/* Floating Action Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-gold text-dark-bg p-4 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.6)] hover:scale-110 transition-transform duration-300 border-2 border-transparent hover:border-gold-glow group animate-pulse-slow"
        aria-label="Спросить Оракула"
      >
        <Sparkles className="w-8 h-8 group-hover:rotate-12 transition-transform" />
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-dark-bg border border-gold rounded-lg w-full max-w-lg p-6 relative shadow-[0_0_50px_rgba(212,175,55,0.2)]">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gold/60 hover:text-gold transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="font-decorative text-3xl text-gold-gradient text-center mb-2">Магический Оракул</h3>
            <p className="text-center text-gray-400 text-sm mb-6 italic font-serif">
              "Прошепчи свой вопрос цифровому эфиру..."
            </p>

            {response ? (
              <div className="bg-white/5 border border-gold/30 p-6 rounded-md mb-6 animate-fade-in-up">
                <p className="font-serif text-lg leading-relaxed text-gold-glow">
                  {response}
                </p>
                <button 
                  onClick={() => setResponse(null)}
                  className="mt-4 text-xs uppercase tracking-widest text-gold/70 hover:text-gold border-b border-gold/30 pb-1"
                >
                  Задать другой вопрос
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="relative">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Что тревожит твою душу сегодня?"
                  className="w-full bg-white/5 border border-gold/30 rounded-md p-4 text-white focus:outline-none focus:border-gold focus:shadow-[0_0_15px_rgba(212,175,55,0.1)] resize-none h-32 font-serif placeholder-gray-500"
                  disabled={isLoading}
                />
                <div className="mt-6">
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="w-full py-3 px-6 rounded-md bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-dark-bg font-decorative font-bold text-lg tracking-widest uppercase hover:shadow-[0_0_25px_rgba(212,175,55,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 group"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 animate-spin" /> Связь с космосом...
                      </span>
                    ) : (
                      <>
                        Узнать Судьбу
                        <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default OracleModal;