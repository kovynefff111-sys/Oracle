import React, { useState, useEffect } from 'react';
import StarBackground from './components/StarBackground';
import OracleModal from './components/OracleModal';
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
    title: 'Руническая Магия',
    desc: 'Диагностика на Старшем Футарке. Создание индивидуальных ставов и амулетов для защиты, привлечения удачи и коррекции судьбы.',
    img: 'https://xland.by/image/catalog/product_8593_0_image.jpg'
  },
  {
    title: 'Расклады Таро',
    desc: 'Зеркало вашего подсознания. Разбор отношений, анализ карьерных перспектив и поиск выхода из запутанных ситуаций.',
    img: 'https://board.mista.ua/2022/145778_1_2.jpg'
  },
  {
    title: 'Астрология',
    desc: 'Персональный гороскоп. Кармические задачи, совместимость партнеров (синастрия) и прогноз транзитов планет на год.',
    img: 'https://vkurse.ua/wp-content/uploads/2025/05/astrologiya-znaky-zodiaku.jpg'
  },
  {
    title: 'Обряды',
    desc: 'Обряды, которые помогут вам очистить энергетику, снять блоки и привлечь желаемое. Сила древних ритуалов для гармонизации судьбы и защиты.',
    img: 'https://molfa.ua/files/images/svecha-magicheskaya-voskovaya-boginya-luna-pentakl-pentagramma-vedmin-kotel-vedma-krasnaya-chernaya-zelenaya-fioletovaya75.jpg'
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
      <OracleModal />

      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-50 bg-dark-bg/80 backdrop-blur-md border-b border-gold/20 transition-all duration-300">
        <div className="container mx-auto max-w-[1400px] px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <a 
            href="#" 
            onClick={(e) => handleNavClick(e, 'top')}
            className="font-decorative text-2xl text-gold-gradient font-bold hover:text-gold-glow transition-colors drop-shadow-[0_0_5px_rgba(212,175,55,0.5)]"
          >
            Mystic Oracle
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

          {/* Contacts & Socials (Desktop) */}
          <div className="hidden md:flex items-center gap-12">
            <a href="tel:+380505337014" className="text-gold text-2xl font-bold hover:text-white transition-colors flex items-center gap-4 whitespace-nowrap">
              <Phone className="w-7 h-7" />
              <span>+380 50 533 70 14</span>
            </a>
            <div className="flex gap-6">
              <a href="https://t.me/ppc_marketer" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-[#0088cc] transition-colors transform hover:scale-110">
                <Send className="w-8 h-8" />
              </a>
              <a href="https://wa.me/380505337014" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-[#25D366] transition-colors transform hover:scale-110">
                <MessageCircle className="w-8 h-8" />
              </a>
            </div>
            {/* Mobile Menu Button (visible on md/lg, hidden on xl where full nav is) */}
            <button 
              className="xl:hidden text-gold hover:text-white transition-colors ml-4"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>

          {/* Mobile Menu Button (visible only on small screens) */}
          <button 
            className="md:hidden text-gold hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMobileMenuOpen && (
          <div className="bg-dark-bg/95 backdrop-blur-lg border-t border-gold/20 absolute w-full left-0 animate-fade-in shadow-2xl xl:hidden z-40">
            <div className="flex flex-col p-6 gap-6">
              {NAV_LINKS.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-lg text-gray-200 hover:text-gold font-decorative tracking-wide"
                >
                  {link.name}
                </a>
              ))}
              <div className="h-px bg-gold/20 my-2 md:hidden"></div>
              <div className="md:hidden">
                <a href="tel:+380505337014" className="text-gold flex items-center gap-3 text-lg mb-4 font-bold">
                  <Phone className="w-5 h-5" /> +380 50 533 70 14
                </a>
                <div className="flex gap-6">
                  <a href="https://t.me/ppc_marketer" className="text-gold hover:text-[#0088cc]">
                    <Send className="w-7 h-7" />
                  </a>
                  <a href="https://wa.me/380505337014" className="text-gold hover:text-[#25D366]">
                    <MessageCircle className="w-7 h-7" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center p-5 relative z-10 pt-20">
        <div className="container mx-auto max-w-[1100px] reveal">
          <h1 className="font-decorative text-gold-gradient text-4xl md:text-6xl mb-5 leading-tight drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]">
            Mystic Oracle
          </h1>
          <p className="text-xl md:text-2xl italic text-gray-300 max-w-2xl mx-auto mb-10 font-light">
            Когда звезды говорят — я помогаю их услышать.<br />
            Древние руны, мудрость Таро и точность астрологии для вашего будущего.
          </p>
          <a 
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="inline-block px-12 py-4 text-lg border-2 border-gold text-gold font-decorative uppercase tracking-widest hover:bg-gold hover:text-dark-bg hover:scale-105 hover:shadow-[0_0_40px_rgba(249,226,156,0.6)] transition-all duration-300 cursor-pointer"
          >
            Узнать Судьбу
          </a>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-20 bg-black/40 border-y border-gold/20 backdrop-blur-sm scroll-mt-20">
        <div className="container mx-auto max-w-[1100px] px-5">
          <div className="flex flex-col-reverse md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left reveal">
              <h2 className="font-decorative text-gold-gradient text-4xl mb-8 relative after:content-['✦'] after:block after:text-2xl after:text-gold-glow after:opacity-80 after:mt-4 md:after:mx-0 after:mx-auto">
                Мастер Пути
              </h2>
              <p className="text-lg mb-4 text-gray-300 text-justify leading-relaxed">
                Приветствую. Я — практик и рунолог с опытом более 5 лет. Мой путь в эзотерику начался не как хобби, а как поиск ответов на глубинные вопросы бытия.
              </p>
              <p className="text-lg mb-4 text-gray-300 text-justify leading-relaxed">
                За эти годы я объединил строгую структуру скандинавской традиции, психологический символизм Таро и математическую точность астрологии. Я не предсказываю неизбежность — я показываю варианты.
              </p>
              <p className="text-lg text-gray-300 text-justify leading-relaxed">
                Моя миссия — дать вам компас в шторме жизни. Помочь увидеть скрытые блоки, найти ресурс для прорыва и принять решение, которое резонирует с вашей Душой.
              </p>
            </div>
            <div className="flex-1 max-w-[450px] reveal">
              <div className="relative group">
                <div className="absolute inset-0 bg-gold/20 rounded-[200px_200px_0_0] blur-xl group-hover:bg-gold/30 transition-all duration-500"></div>
                <img 
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
                  alt="Фото мастера" 
                  className="w-full h-auto rounded-[200px_200px_0_0] border-2 border-gold shadow-[0_0_30px_rgba(212,175,55,0.2)] sepia-[0.2] contrast-[1.1] relative z-10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRACTICES SECTION */}
      <section id="practices" className="py-20 scroll-mt-20">
        <div className="container mx-auto max-w-[1100px] px-5">
          <h2 className="font-decorative text-gold-gradient text-4xl text-center mb-16 relative after:content-['✦'] after:block after:text-2xl after:text-gold-glow after:opacity-80 after:mt-4 reveal">
            Мои Практики
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {PRACTICES.map((item, index) => (
              <div key={index} className="bg-card-bg border border-gold/40 rounded overflow-hidden hover:-translate-y-4 hover:shadow-[0_10px_40px_rgba(212,175,55,0.15)] hover:border-gold transition-all duration-500 group reveal">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-64 object-cover border-b border-gold filter grayscale-[40%] contrast-[1.1] group-hover:grayscale-0 group-hover:contrast-[1.2] transition-all duration-500"
                />
                <div className="p-6 text-center">
                  <h3 className="font-decorative text-2xl text-gold mb-4">{item.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY ME SECTION */}
      <section id="benefits" className="py-20 scroll-mt-20">
        <div className="container mx-auto max-w-[1100px] px-5">
          <h2 className="font-decorative text-gold-gradient text-4xl text-center mb-16 relative after:content-['✦'] after:block after:text-2xl after:text-gold-glow after:opacity-80 after:mt-4 reveal">
            Почему выбирают меня?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {BENEFITS.map((item, idx) => (
              <div key={idx} className="text-center p-8 bg-white/5 border border-gold/20 hover:bg-gold/10 hover:border-gold transition-all duration-300 group cursor-default reveal">
                <item.icon className="w-12 h-12 text-gold mx-auto mb-6 drop-shadow-[0_0_10px_rgba(212,175,55,0.5)] group-hover:scale-110 transition-transform" />
                <h4 className="font-decorative text-xl text-gold mb-3">{item.title}</h4>
                <p className="text-gray-400 text-sm">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS SECTION */}
      <section id="reviews" className="py-20 bg-black/40 border-y border-gold/10 scroll-mt-20">
        <div className="container mx-auto max-w-[1100px] px-5">
          <h2 className="font-decorative text-gold-gradient text-4xl text-center mb-16 relative after:content-['✦'] after:block after:text-2xl after:text-gold-glow after:opacity-80 after:mt-4 reveal">
            Отзывы
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {REVIEWS.map((review, idx) => (
              <div key={idx} className="bg-white/5 border border-gold/20 p-8 rounded-lg hover:border-gold/60 transition-colors duration-300 relative reveal">
                <div className="flex gap-1 text-gold mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold" />
                  ))}
                </div>
                <p className="text-gray-300 italic mb-6 leading-relaxed">"{review.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold font-decorative font-bold">
                    {review.name.charAt(0)}
                  </div>
                  <h4 className="font-decorative text-lg text-gold">{review.name}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section id="contact" className="py-20 px-5 scroll-mt-24">
        <div className="container mx-auto max-w-[600px] relative reveal">
          {/* Decorative Corners */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold -translate-x-2 -translate-y-2"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gold translate-x-2 translate-y-2"></div>
          
          <div className="bg-gradient-to-br from-[#0a0a14] to-[#141423] border-2 border-gold p-10 shadow-[0_0_80px_rgba(0,0,0,0.8)] text-center relative z-10">
            <h3 className="font-decorative text-3xl text-gold mb-2">Запись на консультацию</h3>
            <p className="text-gray-400 mb-8 opacity-70">Заполните форму, и мы продолжим диалог в WhatsApp.</p>

            {formStatus === 'submitted' ? (
               <div className="py-10 text-gold-glow animate-fade-in">
                 <Sparkles className="w-12 h-12 mx-auto mb-4 text-gold" />
                 <p className="text-xl font-decorative">Переходим в WhatsApp...</p>
               </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-8 mt-10">
                {/* 1. Name Input */}
                <div className="relative group">
                  <input 
                    type="text" 
                    id="name"
                    required 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block px-4 py-4 w-full text-white bg-[#10101a] border border-[#444] border-l-[3px] border-l-gold appearance-none focus:outline-none focus:ring-0 focus:border-gold-glow focus:shadow-[0_0_15px_rgba(212,175,55,0.1)] peer pt-6 rounded-none transition-colors"
                    placeholder=" "
                  />
                  <label 
                    htmlFor="name" 
                    className="absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-gold"
                  >
                    Ваше Имя
                  </label>
                </div>

                {/* 2. Phone Input */}
                <div className="relative group">
                  <input 
                    type="tel" 
                    id="contact"
                    required 
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    className="block px-4 py-4 w-full text-white bg-[#10101a] border border-[#444] border-l-[3px] border-l-gold appearance-none focus:outline-none focus:ring-0 focus:border-gold-glow focus:shadow-[0_0_15px_rgba(212,175,55,0.1)] peer pt-6 rounded-none transition-colors"
                    placeholder=" "
                  />
                   <label 
                    htmlFor="contact" 
                    className="absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-gold"
                  >
                    Номер Телефона
                  </label>
                </div>

                {/* 3. Service Selection */}
                <div className="relative group text-left">
                  <select
                    id="service"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="block px-4 py-4 w-full text-white bg-[#10101a] border border-[#444] border-l-[3px] border-l-gold appearance-none focus:outline-none focus:ring-0 focus:border-gold-glow focus:shadow-[0_0_15px_rgba(212,175,55,0.1)] peer pt-6 cursor-pointer rounded-none transition-colors"
                  >
                    {SERVICES_LIST.map(s => (
                      <option key={s} value={s} className="bg-dark-bg text-gray-200 py-2">{s}</option>
                    ))}
                  </select>
                  <label 
                    htmlFor="service" 
                    className="absolute text-gold duration-300 transform -translate-y-4 scale-75 top-5 z-10 origin-[0] left-4"
                  >
                    Что вас интересует?
                  </label>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1 text-gold w-5 h-5 pointer-events-none" />
                </div>

                {/* Premium Gold Button */}
                <button 
                  type="submit" 
                  className="w-full py-4 px-6 rounded-md bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-dark-bg font-decorative font-bold text-lg tracking-widest uppercase hover:shadow-[0_0_25px_rgba(212,175,55,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 mt-6 flex items-center justify-center gap-2 group"
                >
                  Записаться на сеанс
                  <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* PROFESSIONAL FOOTER */}
      <footer className="bg-black/90 border-t border-gold/10 pt-16 pb-8">
        <div className="container mx-auto max-w-[1200px] px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            
            {/* Column 1: Brand */}
            <div className="text-center md:text-left">
              <h3 className="font-decorative text-2xl text-gold-gradient mb-4">Mystic Oracle</h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
                Ваш надежный проводник в мир эзотерики. 
                Мы помогаем обрести ясность, когда звезды говорят загадками.
              </p>
            </div>

            {/* Column 2: Nav Links */}
            <div className="text-center">
              <h4 className="font-decorative text-lg text-gold mb-6">Навигация</h4>
              <ul className="space-y-3">
                {NAV_LINKS.map(link => (
                  <li key={link.name}>
                    <a href={link.href} onClick={(e) => handleNavClick(e, link.href)} className="text-gray-400 hover:text-gold transition-colors text-sm">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Contact Info */}
            <div className="text-center md:text-right">
              <h4 className="font-decorative text-lg text-gold mb-6">Свяжитесь с нами</h4>
              <div className="flex flex-col items-center md:items-end gap-3">
                 <a href="tel:+380505337014" className="text-gray-300 hover:text-gold transition-colors text-lg flex items-center gap-2 font-bold tracking-wide">
                   <span>+380 50 533 70 14</span> <Phone className="w-4 h-4" />
                 </a>
                 <div className="flex gap-4 mt-2">
                   <a href="https://t.me/ppc_marketer" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-black transition-all">
                      <Send className="w-5 h-5" />
                   </a>
                   <a href="https://wa.me/380505337014" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-black transition-all">
                      <MessageCircle className="w-5 h-5" />
                   </a>
                 </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gold/10 pt-8 text-center">
            <p className="text-gray-600 text-xs">
              &copy; {new Date().getFullYear()} Mystic Oracle. Все права защищены. <br/>
              Магия реальна, если вы в нее верите.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;