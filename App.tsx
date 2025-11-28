import React, { useState, useEffect } from 'react';
import StarBackground from './components/StarBackground';
import { Eye, Shield, Sparkles, Compass, Phone, Send, Menu, X, MessageCircle, Star, ChevronDown } from 'lucide-react';

// Static data moved outside component for performance
const NAV_LINKS = [
  { name: 'Обо мне', href: '#about' },
  { name: 'Практики', href: '#practices' },
  { name: 'Преимущества', href: '#benefits' },
  { name: 'Отзывы', href: '#reviews' },
  { name: 'Заказать расклад', href: '#contact' },
];

const SERVICES_LIST = [
  "Расклады Таро",
  "Руническая Магия",
  "Астрология",
  "Обряды и Ритуалы",
  "Другой вопрос"
];

const REVIEWS = [
  {
    name: "Ольга К.",
    text: "Заказывала расклад на любовную сферу, отношения были в тупике. Мастер не просто предсказал развитие событий, а показал корень проблемы во мне. Это было жестко, но честно. Спустя месяц все наладилось именно так, как говорили карты.",
  },
  {
    name: "Алексей М.",
    text: "Стоял на перепутье в бизнесе, риск был огромен. Руническая диагностика дала четкое понимание вектора движения. Сделка прошла успешно, благодарю за ясность ума и своевременную подсказку!",
  },
  {
    name: "Елена В.",
    text: "Астрологический разбор открыл глаза на мои кармические задачи. Я годами наступала на одни и те же грабли. Теперь у меня есть 'карта' моей жизни. Очень глубокий и профессиональный подход.",
  },
  {
    name: "Мария С.",
    text: "Невероятная энергетика! После сеанса вышла с легким сердцем. Все страхи и сомнения ушли, появилась уверенность в завтрашнем дне. Спасибо за тепло, мудрость и поддержку в трудную минуту.",
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

const App: React.FC = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitted'>('idle');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // For preloader
  
  // Form State
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [service, setService] = useState('Расклады Таро');

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

  // Scroll Animation Logic
  useEffect(() => {
    if (isLoading) return; 

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 } 
    );

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
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
        setService('Расклады Таро');
    }, 1500);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault(); 
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
         <Sparkles className="w-16 h-16 text-gold animate-pulse mb-4" />
         <h2 className="font-decorative text-gold-gradient text-2xl tracking-[0.2em] animate-pulse">Открываем портал...</h2>
      </div>

      <StarBackground />

      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-50 bg-dark-bg/80 backdrop-blur-md border-b border-gold/20 transition-all duration-300">
        <div className="container mx-auto max-w-[1400px] px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <a 
            href="#" 
            onClick={(e) => handleNavClick(e, 'top')}
            className="font-decorative text-2xl text-gold-gradient font-bold hover:text-gold-glow transition-colors drop-shadow-[0_0_5px_rgba(212,175,55,0.5)]"
          >
            RUNARIS
          </a>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm uppercase tracking-widest text-gray-300 hover:text-gold transition-colors font-serif border-b border-transparent hover:border-gold/50 pb-1 cursor-pointer"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="xl:hidden text-gold hover:text-gold-glow transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-dark-bg/95 flex flex-col items-center justify-center animate-fade-in">
          <nav className="flex flex-col items-center gap-8">
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
          </nav>
        </div>
      )}

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative pt-20 overflow-hidden">
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

        <div className="container mx-auto px-6 text-center z-10 reveal">
          <h1 className="font-decorative text-5xl md:text-7xl lg:text-8xl text-gold-gradient mb-6 drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]">
            RUNARIS
          </h1>
          <p className="font-serif text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            Откройте завесу тайны. Древние знания Таро, Рун и Астрологии помогут найти ответы на главные вопросы вашей судьбы.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a 
              href="#contact" 
              onClick={(e) => handleNavClick(e, '#contact')}
              className="px-8 py-4 bg-transparent border border-gold text-gold font-decorative font-bold uppercase tracking-widest hover:bg-gold hover:text-dark-bg transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] rounded-sm backdrop-blur-sm"
            >
              Записаться
            </a>
          </div>
        </div>
      </section>

      {/* About Me Section - RESTORED */}
      <section id="about" className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-[1400px]">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Image Side */}
            <div className="w-full md:w-1/2 reveal">
              <div className="relative w-full max-w-md mx-auto aspect-[3/4] rounded-2xl overflow-hidden border border-gold/30 shadow-[0_0_30px_rgba(212,175,55,0.2)]">
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
              <h2 className="font-decorative text-4xl md:text-5xl text-gold-gradient mb-8">
                Обо мне
              </h2>
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed font-serif">
                <p>
                  Приветствую! Меня зовут Илья. Я — практикующий рунолог с опытом более 5 лет.
                </p>
                <p>
                  Мой путь в эзотерику начался с поиска ответов на глубинные вопросы бытия. Я выбрал Руны — древнейшую сакральную систему, история которой уходит корнями в V век. Это не просто знаки, а мощный инструмент Северной традиции, который сохранил свою силу сквозь столетия.
                </p>
                <p>
                  Я не программирую вас на неизбежность, а раскрываю веер вариантов. Моя задача — стать вашим компасом в шторме жизни: подсветить скрытые блоки, найти ресурс для прорыва и помочь принять решение, которое истинно резонирует с вашей Душой.
                </p>
                
                <div className="pt-6">
                   <div className="inline-block p-4 border border-gold/20 rounded-lg bg-gold/5 backdrop-blur-sm">
                        <p className="text-gold italic">
                            «В каждом из нас есть магия»
                        </p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Practices Section */}
      <section id="practices" className="py-24 bg-gradient-to-b from-transparent to-black/30">
        <div className="container mx-auto px-6 max-w-[1400px]">
          <h2 className="font-decorative text-4xl md:text-5xl text-center text-gold-gradient mb-16 reveal">
            Чем я могу помочь
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8 px-4">
            {PRACTICES.map((practice, index) => (
              <div 
                key={index} 
                className="reveal group relative bg-card-bg border border-gold/20 rounded-xl overflow-hidden hover:border-gold/60 transition-all duration-500 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)] flex flex-col md:flex-row"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-full md:w-2/5 h-64 md:h-auto overflow-hidden">
                  <img 
                    src={practice.img} 
                    alt={practice.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-8 md:w-3/5 flex flex-col justify-center">
                  <h3 className="font-decorative text-2xl text-gold mb-4 group-hover:text-gold-glow transition-colors">
                    {practice.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                    {practice.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gold/5 blur-3xl -z-10"></div>
        <div className="container mx-auto px-6 max-w-[1400px]">
          <h2 className="font-decorative text-4xl md:text-5xl text-center text-gold-gradient mb-16 reveal">
            Почему выбирают меня
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {BENEFITS.map((item, index) => (
              <div 
                key={index} 
                className="reveal p-8 border border-gold/20 bg-card-bg/50 backdrop-blur-sm rounded-lg hover:bg-gold/10 transition-all duration-300 text-center group"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <item.icon className="w-12 h-12 text-gold mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]" />
                <h3 className="font-decorative text-xl text-gold-glow mb-4">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-24">
        <div className="container mx-auto px-6 max-w-[1400px]">
          <h2 className="font-decorative text-4xl md:text-5xl text-center text-gold-gradient mb-16 reveal">
            Отзывы
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {REVIEWS.map((review, index) => (
              <div 
                key={index} 
                className="reveal bg-card-bg p-8 border border-gold/20 rounded-lg relative hover:border-gold/40 transition-colors"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="absolute top-4 right-6 text-6xl text-gold/10 font-decorative leading-none">”</div>
                <p className="text-gray-300 italic mb-6 relative z-10 leading-relaxed">
                  "{review.text}"
                </p>
                <div className="flex items-center gap-2 text-gold-glow font-bold font-decorative">
                  <Star className="w-4 h-4 fill-gold text-gold" />
                  <span>{review.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 pb-32">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="reveal bg-card-bg border border-gold/30 p-8 md:p-12 rounded-2xl shadow-[0_0_50px_rgba(212,175,55,0.1)] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-gold to-transparent opacity-50"></div>
            
            <h2 className="font-decorative text-3xl md:text-4xl text-center text-gold-gradient mb-8">
              Записаться на расклад
            </h2>
            <p className="text-center text-gray-400 mb-10 max-w-lg mx-auto">
              Оставьте заявку, и я свяжусь с вами в ближайшее время для уточнения деталей.
            </p>

            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-gold ml-1">Ваше Имя</label>
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-dark-bg/50 border border-gold/30 rounded-lg p-4 text-white focus:border-gold focus:shadow-[0_0_15px_rgba(212,175,55,0.2)] outline-none transition-all placeholder-gray-600"
                  placeholder="Мария"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-gold ml-1">Контакт для связи</label>
                <input 
                  type="text" 
                  required
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full bg-dark-bg/50 border border-gold/30 rounded-lg p-4 text-white focus:border-gold focus:shadow-[0_0_15px_rgba(212,175,55,0.2)] outline-none transition-all placeholder-gray-600"
                  placeholder="WhatsApp / Telegram / Телефон"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-gold ml-1">Интересующая услуга</label>
                <div className="relative">
                  <select 
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full bg-dark-bg/50 border border-gold/30 rounded-lg p-4 text-white focus:border-gold focus:shadow-[0_0_15px_rgba(212,175,55,0.2)] outline-none transition-all appearance-none cursor-pointer"
                  >
                    {SERVICES_LIST.map((s) => (
                      <option key={s} value={s} className="bg-dark-bg text-gray-200">{s}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gold w-5 h-5 pointer-events-none" />
                </div>
              </div>

              <button 
                type="submit"
                disabled={formStatus === 'submitted'}
                className="w-full py-4 mt-4 bg-gold text-dark-bg font-decorative font-bold text-lg uppercase tracking-widest hover:bg-gold-glow hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] transition-all duration-300 rounded-lg disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {formStatus === 'submitted' ? 'Переходим в WhatsApp...' : 'Отправить Заявку'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-black/50 border-t border-gold/10">
        <div className="container mx-auto px-6 text-center">
          <p className="font-decorative text-gold text-xl mb-4">RUNARIS</p>
          <div className="flex justify-center gap-6 mb-6">
             {/* Social placeholders could go here */}
          </div>
          <p className="text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} Все права защищены. <br/>
            Сайт не является публичной офертой.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;