import React, { useState, useEffect } from 'react';
import StarBackground from './components/StarBackground';
import { Eye, Shield, Sparkles, Compass, Menu, X, Star, ChevronDown, Send, MessageCircle } from 'lucide-react';

// Static data moved outside component for performance
const NAV_LINKS = [
  { name: 'Обо мне', href: '#about' },
  { name: 'Практики', href: '#practices' },
  { name: 'Преимущества', href: '#benefits' },
  { name: 'Отзывы', href: '#reviews' },
  { name: 'Записаться', href: '#contact' },
];

const SERVICES_LIST = [
  "Чистка и Защита",
  "Любовь и Отношения",
  "Деньги и Реализация",
  "Путь и Предназначение",
  "Другое"
];

const REVIEWS = [
  {
    name: "Ольга К.",
    text: "Обратилась, когда ситуация в семье зашла в тупик — ни мира, ни войны. Руны показали всё жестко, без «розовых очков» и пустых надежд. Илья объяснил, где я сама блокирую развитие событий. Было непросто услышать правду, но именно этот расклад открыл глаза и сэкономил мне кучу времени. Спустя месяц всё развернулось именно так, как предсказали руны.",
  },
  {
    name: "Алексей М.",
    text: "Был непонятный застой в делах, сделки срывались на финише. Руническая диагностика четко подсветила причину — проблема была не в рынке, а в конкурентах и негативе. Сделали работу на расчистку пути. Через неделю подписал контракт, который висел «мертвым грузом» полгода. Работает четко, по существу, без лишней мистики.",
  },
  {
    name: "Елена В.",
    text: "Казалось, что стучусь в закрытые двери, всё валилось из рук. Думала — карма или сглаз. Диагностика показала, что я просто трачу силы не на свои цели. Илья буквально «разложил» мою жизнь по полочкам с помощью рун. Появилась ясность, куда двигаться. Это не гадание, а очень глубокий анализ ситуации.",
  },
  {
    name: "Мария С.",
    text: "Пришла в состоянии выжатого лимона, была постоянная тревога без причины. После чистки и постановки защиты как будто мешок с плеч свалился. В голове прояснилось, вернулся нормальный сон, появились силы. Удивило, насколько точно древние символы описывают то, что происходит внутри. Спасибо за помощь!",
  }
];

const BENEFITS = [
  { icon: Eye, title: 'Ясность', text: 'Говорю четко и по существу. Без воды, мистического тумана и размытых фраз. Только факты расклада.' },
  { icon: Shield, title: 'Тайна', text: 'Всё, что происходит на сеансе, остается между нами. Это главное правило моей этики.' },
  { icon: Sparkles, title: 'Экология', text: 'Работаю безопасно для вашей кармы. Никакого подавления воли и черных ритуалов.' },
  { icon: Compass, title: 'Результат', text: 'Цель консультации — не напугать, а дать инструменты для решения проблемы здесь и сейчас.' }
];

const PRACTICES = [
  {
    title: 'Чистка и Защита',
    desc: 'Глубокая диагностика на наличие негатива (сглаз, порча, чужие программы). Проведение чисток и установка мощной рунической защиты на вас, ваших близких и имущество.',
    img: 'https://res.cloudinary.com/dtqoqevqf/image/upload/v1764356183/Gemini_Generated_Image_u922zju922zju922_ykv9pe.png'
  },
  {
    title: 'Любовь и Отношения',
    desc: 'Диагностика истинных чувств партнера и перспектив союза. Выявление причин одиночества, гармонизация сложных отношений и руническая помощь в поиске «своего» человека.',
    img: 'https://res.cloudinary.com/dtqoqevqf/image/upload/v1764356210/Gemini_Generated_Image_cb90nucb90nucb90_zbn60m.png'
  },
  {
    title: 'Деньги и Реализация',
    desc: 'Анализ финансового канала и устранение блоков, мешающих доходу. Подбор рунических формул для прорыва в карьере, удачи в бизнесе и открытия новых денежных дорог.',
    img: 'https://res.cloudinary.com/dtqoqevqf/image/upload/v1764356184/Gemini_Generated_Image_jlfbgmjlfbgmjlfb_we0zmr.png'
  },
  {
    title: 'Путь и Предназначение',
    desc: 'Поиск выхода из жизненных тупиков и замкнутого круга. Разбор кармических задач, определение истинного предназначения и коррекция судьбы в сложной ситуации.',
    img: 'https://res.cloudinary.com/dtqoqevqf/image/upload/v1764356204/Gemini_Generated_Image_z5fqdgz5fqdgz5fq_us012z.png'
  }
];

// Telegram Icon SVG Component
const TelegramIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M21.198 2.433a2.242 2.242 0 0 0-1.022.215l-8.609 3.33c-2.068.8-4.133 1.598-5.724 2.21a405.15 405.15 0 0 1-2.849 1.09c-.42.147-.99.332-1.473.901-.728.968.193 1.798.919 2.286 1.61.516 3.275 1.009 4.654 1.472.509 1.793.997 3.592 1.48 5.388.16.69.506 1.05.964 1.263.672.31 1.254.02 1.59-.261 1.05-1.003 2.578-2.486 3.018-2.924.363.367 3.098 2.378 4.226 3.23.966.697 2.053 1.052 2.818.156.764-.895 2.16-9.18 2.766-16.142.102-1.176-.324-1.956-1.129-2.222zM8.342 12.396l.896 5.564c.033.208.066.417.066.625l-2.006-3.832 1.044-2.357zm2.492 7.02l-.654-4.053 7.82-6.985c.164-.145.418-.12.448.198.03.32-.477.592-.734.78l-6.88 5.06v5.002z" fill="currentColor" stroke="none"/>
  </svg>
);

const App: React.FC = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitted'>('idle');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // For preloader
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Form State
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [service, setService] = useState('Чистка и Защита');

  // Preloader Logic
  useEffect(() => {
    // Disable scrolling while loading
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const timer = setTimeout(() => {
        setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [isLoading]);

  // Scroll Listener for Header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll Animation Logic
  useEffect(() => {
    if (isLoading) return; 

    // Observer 1: Standard Text Reveals (Faster - 15% visibility)
    const textObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.15 } 
    );

    // Observer 2: Image Flips (Slower - 45% visibility to trigger flip)
    const imageObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('active');
            }
          });
        },
        { threshold: 0.45 } 
      );

    const textElements = document.querySelectorAll('.reveal');
    const imageElements = document.querySelectorAll('.reveal-img');

    textElements.forEach((el) => textObserver.observe(el));
    imageElements.forEach((el) => imageObserver.observe(el));

    return () => {
        textObserver.disconnect();
        imageObserver.disconnect();
    };
  }, [isLoading]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitted');
    
    // Construct WhatsApp URL with Service
    const message = `Здравствуйте! Меня зовут ${name}. Меня интересует: ${service}. Хочу записаться на консультацию. Мой контакт: ${contact}`;
    const whatsappUrl = `https://wa.me/380505337014?text=${encodeURIComponent(message)}`;
    
    // Slight delay for visual feedback before redirect
    setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        setFormStatus('idle');
        setName('');
        setContact('');
        setService('Чистка и Защита');
    }, 1500);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLElement> | null, targetId: string) => {
    if (e) e.preventDefault();
    setIsMobileMenuOpen(false); 
    
    if (targetId === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }

    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen font-serif text-gray-200">
      {/* MYSTIC PRELOADER */}
      <div className={`fixed inset-0 z-[100] bg-dark-bg flex flex-col items-center justify-center transition-opacity duration-1000 ${isLoading ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
         <Sparkles className="w-12 h-12 text-gold animate-pulse mb-4" />
         <h2 className="font-decorative text-gold-gradient text-xl tracking-[0.2em] animate-pulse">Открываем портал...</h2>
      </div>

      <StarBackground />

      {/* HEADER - Reduced padding and text size */}
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b border-gold/20
          ${isScrolled ? 'bg-dark-bg/95 py-3 shadow-lg' : 'bg-dark-bg/80 backdrop-blur-md py-5'}
        `}
      >
        <div className="container mx-auto max-w-[1200px] px-6 grid grid-cols-[1fr_auto_1fr] items-center">
          {/* Logo - Left */}
          <div className="flex justify-start">
            <a 
              href="#" 
              onClick={(e) => handleNavClick(e, 'top')}
              className={`font-decorative text-gold-gradient font-bold hover:text-gold-glow transition-all duration-500 drop-shadow-[0_0_5px_rgba(212,175,55,0.5)]
                ${isScrolled ? 'text-2xl' : 'text-3xl'}
              `}
            >
              RUNARIS
            </a>
          </div>

          {/* Desktop Nav - Center */}
          <nav className="hidden xl:flex items-center gap-8 justify-center">
            {NAV_LINKS.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-base uppercase tracking-widest text-gray-300 hover:text-gold transition-colors font-serif border-b border-transparent hover:border-gold/50 pb-1 cursor-pointer whitespace-nowrap"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Section: Contact Button + Telegram + Mobile Toggle */}
          <div className="flex items-center justify-end gap-5">
            
            {/* Subtle Contact Button */}
            <button
                onClick={(e) => handleNavClick(null, '#contact')}
                className={`hidden xl:block px-5 font-serif border border-gold/40 text-gold rounded-full hover:bg-gold/10 hover:border-gold transition-all duration-300
                  ${isScrolled ? 'py-1 text-xs' : 'py-1.5 text-sm'}
                `}
            >
                Связаться
            </button>

            <a 
              href="https://t.me/ppc_marketer" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden xl:flex text-gold hover:text-gold-glow transition-colors hover:scale-110 duration-300"
              title="Написать в Telegram"
            >
              <TelegramIcon className="w-6 h-6" />
            </a>

            {/* Mobile Menu Toggle */}
            <button 
              className="xl:hidden text-gold hover:text-gold-glow transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-dark-bg/95 flex flex-col items-center justify-center animate-fade-in">
          <nav className="flex flex-col items-center gap-6">
            {NAV_LINKS.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="font-decorative text-2xl text-gold hover:text-gold-glow transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="https://t.me/ppc_marketer"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center gap-2 font-decorative text-xl text-gold hover:text-gold-glow"
            >
              <TelegramIcon className="w-6 h-6" />
              Telegram
            </a>
          </nav>
        </div>
      )}

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/380505337014"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-[#25D366] text-white p-3 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform duration-300 flex items-center justify-center group animate-pulse-slow"
        aria-label="Написать в WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-current" />
      </a>

      {/* Hero Section - Compacted */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative pt-24 overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover opacity-60"
          >
            <source src="https://res.cloudinary.com/dtqoqevqf/video/upload/v1764346916/Mystical_Rune_Stone_Video_Generation_q9zgsy.mp4" type="video/mp4" />
          </video>
          {/* Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-black/50 bg-gradient-to-b from-dark-bg/40 via-transparent to-dark-bg"></div>
        </div>

        <div className="container mx-auto px-6 text-center z-10 reveal max-w-[1000px]">
          <h1 className="font-decorative text-5xl md:text-6xl lg:text-7xl text-gold-gradient mb-5 drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]">
            RUNARIS
          </h1>
          <p className="font-serif text-lg md:text-xl text-gray-300 mb-5 max-w-xl mx-auto leading-relaxed drop-shadow-md">
            Откройте завесу тайны. Древние знания Таро, Рун и Астрологии помогут найти ответы на главные вопросы вашей судьбы.
          </p>
          <div className="mb-8 mt-6">
            <p className="font-serif text-lg md:text-2xl text-gold font-bold drop-shadow-md inline-block relative py-2">
               Записывайтесь на первый сеанс Бесплатно.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a 
              href="#contact" 
              onClick={(e) => handleNavClick(e, '#contact')}
              className="px-10 py-5 text-2xl bg-transparent border-2 border-gold text-gold font-decorative font-bold uppercase tracking-widest hover:bg-gold hover:text-dark-bg transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] rounded-[25%] backdrop-blur-sm"
            >
              Записаться
            </a>
          </div>
        </div>
      </section>

      {/* Why Runes Section - Compacted */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-b from-transparent to-black/20">
        <div className="container mx-auto px-6 max-w-[1200px]">
          <div className="flex flex-col md:flex-row items-center gap-10">
            {/* Text Side - Left */}
            <div className="w-full md:w-1/2 reveal order-2 md:order-1">
               <h2 className="font-decorative text-3xl md:text-4xl text-gold-gradient mb-6">
                Почему Руны?
              </h2>
              <div className="space-y-4 text-gray-300 text-base leading-relaxed font-serif">
                <p>
                  Скандинавская традиция V века — это не про «угадать будущее», а про то, чтобы увидеть настоящее без иллюзий. Часто мы ходим по кругу, не замечая выхода, который находится рядом.
                </p>
                <p>
                  Руны работают как прожектор в темной комнате: они высвечивают скрытые причины ваших проблем, истинные мотивы людей и возможные риски. Это суровая, но честная система, которая дает ответы там, где логика заходит в тупик.
                </p>
                <p>
                  Иногда один расклад экономит годы сомнений. Если у вас есть вопросы — у Рун уже есть ответы.
                </p>
              </div>
            </div>

            {/* Image Side - Right */}
            <div className="w-full md:w-1/2 reveal-img order-1 md:order-2">
              <div className="relative w-full max-w-sm mx-auto aspect-[3/4] rounded-xl overflow-hidden border border-gold/30 shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                <img
                  src="https://res.cloudinary.com/dtqoqevqf/image/upload/v1764410430/Gemini_Generated_Image_y8b31by8b31by8b3_ewqwzx.png"
                  alt="Почему Руны"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                 <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/80 via-transparent to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Me Section - Compacted */}
      <section id="about" className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-[1200px]">
          <div className="flex flex-col md:flex-row items-center gap-10">
            {/* Image Side */}
            <div className="w-full md:w-1/2 reveal-img">
              <div className="relative w-full max-w-sm mx-auto aspect-[3/4] rounded-xl overflow-hidden border border-gold/30 shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                <img 
                  src="https://res.cloudinary.com/dtqoqevqf/image/upload/v1764351231/photo_2025-11-28_19-33-31_w5vdph.jpg" 
                  alt="Мастер Илья - Рунолог" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/80 via-transparent to-transparent"></div>
              </div>
            </div>

            {/* Text Side */}
            <div className="w-full md:w-1/2 reveal">
              <h2 className="font-decorative text-3xl md:text-4xl text-gold-gradient mb-6">
                Обо мне
              </h2>
              <div className="space-y-4 text-gray-300 text-base leading-relaxed font-serif">
                <p>
                  Приветствую! Меня зовут Илья. Я — практикующий рунолог с опытом более 5 лет.
                </p>
                <p>
                  Мой путь в эзотерику начался с поиска ответов на глубинные вопросы бытия. Я выбрал Руны — древнейшую сакральную систему, история которой уходит корнями в V век. Это не просто знаки, а мощный инструмент Северной традиции, который сохранил свою силу сквозь столетия.
                </p>
                <p>
                  Я не программирую вас на неизбежность, а раскрываю веер вариантов. Моя задача — стать вашим компасом в шторме жизни: подсветить скрытые блоки, найти ресурс для прорыва и помочь принять решение, которое истинно резонирует с вашей Душой.
                </p>
                
                <div className="pt-4">
                   <div className="inline-block p-3 border border-gold/20 rounded-lg bg-gold/5 backdrop-blur-sm">
                        <p className="text-gold italic text-sm">
                            «В каждом из нас есть магия»
                        </p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Practices Section - Compacted */}
      <section id="practices" className="py-20 bg-gradient-to-b from-transparent to-black/30">
        <div className="container mx-auto px-6 max-w-[1200px]">
          <h2 className="font-decorative text-3xl md:text-4xl text-center text-gold-gradient mb-12 reveal">
            Чем я могу помочь
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 px-2">
            {PRACTICES.map((practice, index) => (
              <div 
                key={index}
                onClick={() => handleNavClick(null, '#contact')} 
                className="reveal-img group relative bg-card-bg border border-gold/20 rounded-xl overflow-hidden hover:border-gold/60 transition-all duration-500 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)] flex flex-col md:flex-row cursor-pointer h-full"
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="w-full md:w-2/5 h-56 md:h-auto overflow-hidden">
                  <img 
                    src={practice.img} 
                    alt={practice.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-6 md:w-3/5 flex flex-col justify-center">
                  <h3 className="font-decorative text-xl text-gold mb-3 group-hover:text-gold-glow transition-colors">
                    {practice.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-sm">
                    {practice.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section - Compacted */}
      <section id="benefits" className="py-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gold/5 blur-3xl -z-10"></div>
        <div className="container mx-auto px-6 max-w-[1200px]">
          <h2 className="font-decorative text-3xl md:text-4xl text-center text-gold-gradient mb-12 reveal">
            Почему выбирают меня
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {BENEFITS.map((item, index) => (
              <div 
                key={index} 
                className="reveal p-6 border border-gold/20 bg-card-bg/50 backdrop-blur-sm rounded-lg hover:bg-gold/10 transition-all duration-300 text-center group"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <item.icon className="w-10 h-10 text-gold mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]" />
                <h3 className="font-decorative text-lg text-gold-glow mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section - Compacted */}
      <section id="reviews" className="py-20">
        <div className="container mx-auto px-6 max-w-[1200px]">
          <h2 className="font-decorative text-3xl md:text-4xl text-center text-gold-gradient mb-12 reveal">
            Отзывы
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {REVIEWS.map((review, index) => (
              <div 
                key={index} 
                className="reveal bg-card-bg p-6 border border-gold/20 rounded-lg relative hover:border-gold/40 transition-colors"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="absolute top-4 right-6 text-5xl text-gold/10 font-decorative leading-none">”</div>
                <p className="text-gray-300 italic mb-4 relative z-10 leading-relaxed text-sm">
                  "{review.text}"
                </p>
                <div className="flex flex-col gap-1">
                    <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-gold text-gold" />
                        ))}
                    </div>
                    <div className="flex items-center gap-2 text-gold-glow font-bold font-decorative text-sm">
                        <span>{review.name}</span>
                    </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - Compacted */}
      <section id="contact" className="py-20 pb-28">
        <div className="container mx-auto px-6 max-w-2xl flex justify-center">
          <div className="w-full reveal-img bg-card-bg border border-gold/30 p-6 md:p-10 rounded-2xl shadow-[0_0_50px_rgba(212,175,55,0.1)] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-50"></div>
            
            <h2 className="font-decorative text-2xl md:text-3xl text-center text-gold-gradient mb-6">
              Записаться на сеанс
            </h2>
            <p className="text-center text-gray-400 mb-8 max-w-md mx-auto text-sm">
              Оставьте заявку, и я свяжусь с вами в ближайшее время для уточнения деталей.
            </p>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-gold ml-1">Ваше Имя</label>
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-dark-bg/50 border border-gold/30 rounded-lg p-3 text-white focus:border-gold focus:shadow-[0_0_15px_rgba(212,175,55,0.2)] outline-none transition-all placeholder-gray-600 focus:bg-gold/5 text-sm"
                  placeholder="Имя"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-gold ml-1">Контакт для связи</label>
                <input 
                  type="text" 
                  required
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full bg-dark-bg/50 border border-gold/30 rounded-lg p-3 text-white focus:border-gold focus:shadow-[0_0_15px_rgba(212,175,55,0.2)] outline-none transition-all placeholder-gray-600 focus:bg-gold/5 text-sm"
                  placeholder="WhatsApp / Telegram / Телефон"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-gold ml-1">Интересующая услуга</label>
                <div className="relative">
                  <select 
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full bg-dark-bg/50 border border-gold/30 rounded-lg p-3 text-white focus:border-gold focus:shadow-[0_0_15px_rgba(212,175,55,0.2)] outline-none transition-all appearance-none cursor-pointer focus:bg-gold/5 text-sm"
                  >
                    {SERVICES_LIST.map((s) => (
                      <option key={s} value={s} className="bg-dark-bg text-gray-200">{s}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gold w-4 h-4 pointer-events-none" />
                </div>
              </div>

              <button 
                type="submit"
                disabled={formStatus === 'submitted'}
                className="w-full py-3 mt-4 bg-gold text-dark-bg font-decorative font-bold text-base uppercase tracking-widest hover:bg-gold-glow hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] transition-all duration-300 rounded-lg disabled:opacity-70 disabled:cursor-not-allowed transform active:scale-[0.98]"
              >
                {formStatus === 'submitted' ? 'Переходим в WhatsApp...' : 'Отправить Заявку'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer - Compacted */}
      <footer className="py-12 bg-black/90 border-t border-gold/10 relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-[1200px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start justify-items-center md:justify-items-start text-center md:text-left">
            
            {/* Column 1: Brand */}
            <div className="flex flex-col items-center md:items-start reveal">
               <p className="font-decorative text-gold text-2xl mb-3">RUNARIS</p>
               <p className="text-gray-500 text-xs leading-relaxed max-w-xs">Древние знания для современной жизни. Найди ответы в рунах и звездах.</p>
            </div>
            
            {/* Column 2: Vertical Nav */}
            <nav className="flex flex-col gap-3 items-center md:items-start w-full reveal" style={{ transitionDelay: '100ms' }}>
              <h4 className="text-gold font-serif mb-2 uppercase tracking-widest text-xs opacity-60">Меню</h4>
              {NAV_LINKS.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-gray-400 hover:text-gold transition-all duration-300 font-serif hover:translate-x-2 text-sm"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Column 3: Socials/Contacts */}
            <div className="flex flex-col items-center md:items-start gap-3 reveal" style={{ transitionDelay: '200ms' }}>
              <h4 className="text-gold font-serif mb-2 uppercase tracking-widest text-xs opacity-60">Контакты</h4>
              <a href="https://t.me/ppc_marketer" className="flex items-center gap-2 text-gray-400 hover:text-gold transition-colors group text-sm">
                <TelegramIcon className="w-4 h-4 group-hover:text-gold transition-colors" />
                <span>Telegram: @ppc_marketer</span>
              </a>
               <a href="https://wa.me/380505337014" className="flex items-center gap-2 text-gray-400 hover:text-gold transition-colors group text-sm">
                <MessageCircle className="w-4 h-4 group-hover:text-gold transition-colors" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
          
          <div className="border-t border-gold/10 mt-10 pt-6 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-gray-600 text-[10px] reveal">
            <p>&copy; {new Date().getFullYear()} RUNARIS. Все права защищены.</p>
            <p className="mt-2 md:mt-0">Сайт не является публичной офертой.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;