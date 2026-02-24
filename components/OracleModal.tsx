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

    try {
      const answer = await askOracle(input);
      setResponse(answer);
    } catch (error) {
      console.error(error);
      setResponse("Эфир возмущен. Попробуйте позже.");
    } finally {
      setIsLoading(false);
      setInput('');
    }
  };

  const handleReset = () => {
    setResponse(null);
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
          <div className="bg-dark-bg border border-gold rounded-lg w-full max-w-lg p-6 relative shadow-[0_0_50px_rgba(212,175,55,0.2)] flex flex-col max-h-[90vh]">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gold/60 hover:text-gold transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="font-decorative text-3xl text-gold-gradient text-center mb-1">Магический Оракул</h3>
            <p className="text-center text-gray-300 text-sm mb-6 italic font-serif">
              "Прошепчи свой вопрос цифровому эфиру..."
            </p>

            {isLoading ? (
               <div className="flex flex-col items-center justify-center py-12 animate-fade-in text-center">
                 <Sparkles className="w-12 h-12 text-gold animate-spin mb-4" />
                 <p className="font-decorative text-gold text-xl animate-pulse">
                   Звезды шепчут...
                 </p>
                 <p className="text-gray-300 text-sm mt-2 max-w-xs">
                   Связь с космосом устанавливается.
                 </p>
               </div>
            ) : response ? (
              <div className="flex flex-col flex-1 overflow-y-auto animate-fade-in-up">
                <div className="bg-white/5 border border-gold/30 p-4 rounded-md mb-4 flex-1 flex flex-col items-center justify-center">
                  <p className="font-serif text-lg leading-relaxed text-gold-glow text-left w-full">
                    {response}
                  </p>
                </div>
                <button 
                  onClick={handleReset}
                  className="w-full py-3 text-sm uppercase tracking-widest text-gold hover:text-white border border-gold/30 hover:border-gold hover:bg-gold/10 transition-all rounded"
                >
                  Задать другой вопрос
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="relative flex flex-col flex-1">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Что тревожит твою душу сегодня?"
                  className="w-full bg-white/5 border border-gold/30 rounded-md p-4 text-white focus:outline-none focus:border-gold focus:shadow-[0_0_15px_rgba(212,175,55,0.1)] resize-none h-32 font-serif placeholder-gray-500 mb-6"
                  disabled={isLoading}
                />
                
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="w-full py-4 px-6 rounded-md bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-dark-bg font-decorative font-bold text-lg tracking-widest uppercase hover:shadow-[0_0_25px_rgba(212,175,55,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 group shadow-lg"
                >
                   Узнать Судьбу
                   <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default OracleModal;