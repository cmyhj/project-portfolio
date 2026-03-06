import { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t('about'), href: '#about' },
    { label: t('projects'), href: '#projects' },
    { label: t('skills'), href: '#skills' },
    { label: t('services'), href: '#services' },
    { label: t('experience'), href: '#experience' },
    { label: t('blog'), href: '#blog' },
    { label: t('contact'), href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'py-4 glass'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#hero');
              }}
              className="text-xl font-bold text-white"
            >
              {language === 'zh' ? '李沐' : 'Muyuan'}
              <span className="text-gradient">{language === 'zh' ? '远' : 'Li'}</span>
            </a>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="text-sm text-white/70 hover:text-[#00a67d] transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00a67d] group-hover:w-full transition-all duration-300" />
                </a>
              ))}
              
              {/* Language switcher */}
              <button
                onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
                className="flex items-center gap-2 px-4 py-2 glass-card rounded-full hover:bg-[#00a67d]/20 transition-all duration-300"
              >
                <Globe className="w-4 h-4 text-[#00a67d]" />
                <span className="text-sm text-white/80">{language === 'zh' ? 'EN' : '中文'}</span>
              </button>
            </div>

            {/* CTA button */}
            <div className="hidden lg:block">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('#contact');
                }}
                className="px-6 py-2.5 bg-[#00a67d]/10 text-[#00a67d] text-sm font-medium rounded-full
                         hover:bg-[#00a67d]/20 transition-all duration-300"
              >
                {t('startCooperation')}
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center gap-4">
              {/* Mobile language switcher */}
              <button
                onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
                className="flex items-center gap-1 px-3 py-1.5 glass-card rounded-full"
              >
                <Globe className="w-3 h-3 text-[#00a67d]" />
                <span className="text-xs text-white/80">{language === 'zh' ? 'EN' : '中文'}</span>
              </button>
              
              <button
                className="w-10 h-10 flex items-center justify-center text-white"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-[#181818]/95 backdrop-blur-xl"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu content */}
        <div className="relative h-full flex flex-col items-center justify-center gap-8 p-8">
          {navLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.href);
              }}
              className="text-2xl font-medium text-white/80 hover:text-[#00a67d] transition-colors"
              style={{
                transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: isMobileMenuOpen ? 1 : 0,
                transition: `all 0.3s ease ${index * 0.1}s`,
              }}
            >
              {link.label}
            </a>
          ))}

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#contact');
            }}
            className="mt-8 px-8 py-3 bg-[#00a67d] text-white font-medium rounded-full
                     transition-all duration-300"
            style={{
              transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
              opacity: isMobileMenuOpen ? 1 : 0,
              transition: `all 0.3s ease ${navLinks.length * 0.1}s`,
            }}
          >
            {t('startCooperation')}
          </a>
        </div>
      </div>
    </>
  );
};

export default Navigation;
