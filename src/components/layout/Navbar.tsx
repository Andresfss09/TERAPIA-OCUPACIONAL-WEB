import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, ArrowUpRight, MapPin, Lock, Moon, Sun } from 'lucide-react';
import { Button } from '../ui/Button';

interface NavbarProps {
  onOpenBooking: (serviceId?: string) => void;
  onOpenAdmin?: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenAdmin,
  darkMode,
  onToggleDarkMode,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: '¿Cómo te ayudo?', href: '#que-es-to' },
    { name: 'Especialidades', href: '#especialidades' },
    { name: 'Sobre Laura', href: '#sobre-laura' },
    { name: 'Agenda en Vivo', href: '#agenda-directa' },
    { name: 'Experiencias', href: '#resenas' },
    { name: 'El Consultorio', href: '#galeria' },
    { name: 'Preguntas & Cali', href: '#contacto' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-500">
      {/* Main Architectural Navigation */}
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 dark:bg-stone-900/95 backdrop-blur-xl shadow-soft border-b border-stone-200 dark:border-stone-800 py-2.5 sm:py-3'
            : 'bg-cream-50/90 dark:bg-stone-950/90 backdrop-blur-md border-b border-stone-200/80 dark:border-stone-800 py-3 sm:py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3 lg:gap-5">
            {/* Editorial Brand Mark — Never truncated, always 100% visible */}
            <a
              href="#inicio"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#inicio');
              }}
              className="flex items-center gap-2.5 sm:gap-3 group shrink-0"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-blush-500 text-white flex items-center justify-center font-serif text-base sm:text-lg font-semibold tracking-tight shadow-xs group-hover:bg-stone-900 transition-colors duration-300 shrink-0">
                LR
              </div>
              <div className="text-left shrink-0 whitespace-nowrap">
                <span className="block font-serif text-lg sm:text-xl lg:text-2xl font-semibold text-stone-900 tracking-tight leading-none whitespace-nowrap">
                  Laura Rodríguez
                </span>
                <span className="block text-[9px] sm:text-[10px] uppercase tracking-[0.14em] text-stone-600 font-bold mt-1 whitespace-nowrap">
                  Terapia Ocupacional • Cali
                </span>
              </div>
            </a>

            {/* Desktop Navigation — Single-line crisp links */}
            <nav className="hidden xl:flex items-center gap-4 2xl:gap-6 shrink-0">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="text-xs font-bold text-stone-700 hover:text-blush-600 transition-colors tracking-wide py-1 whitespace-nowrap"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Right Actions (Desktop & Tablet) */}
            <div className="hidden sm:flex items-center gap-2.5 shrink-0">
              {/* Dark Mode Toggle Button */}
              <button
                type="button"
                onClick={onToggleDarkMode}
                aria-label={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full border border-stone-200 bg-white hover:bg-cream-100 text-stone-800 text-xs font-bold transition-all cursor-pointer shadow-2xs whitespace-nowrap"
                title={darkMode ? 'Activar modo claro' : 'Activar modo oscuro'}
              >
                {darkMode ? (
                  <>
                    <Sun className="w-4 h-4 text-gold-400 shrink-0" />
                    <span className="hidden md:inline">Modo Claro</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4 text-blush-600 shrink-0" />
                    <span className="hidden md:inline">Modo Oscuro</span>
                  </>
                )}
              </button>

              <Button
                variant="primary"
                size="sm"
                className="whitespace-nowrap"
                icon={<Calendar className="w-3.5 h-3.5" />}
                onClick={() => onOpenBooking()}
              >
                Agendar Valoración
              </Button>

              {onOpenAdmin && (
                <button
                  type="button"
                  onClick={onOpenAdmin}
                  aria-label="Acceso privado"
                  className="p-2 rounded-full text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5" />
                </button>
              )}

              {/* Tablet Menu Trigger (visible on sm..lg when desktop nav is hidden) */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-2 rounded-full text-stone-800 hover:bg-stone-100 focus:outline-none cursor-pointer"
                aria-label="Menú"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Mobile Triggers (Dark Mode + Agendar + Menu) */}
            <div className="flex sm:hidden items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={onToggleDarkMode}
                aria-label={darkMode ? 'Modo claro' : 'Modo oscuro'}
                className="p-2 rounded-full border border-stone-200 bg-white text-stone-800 hover:bg-cream-100 transition-colors cursor-pointer"
              >
                {darkMode ? (
                  <Sun className="w-4 h-4 text-gold-400" />
                ) : (
                  <Moon className="w-4 h-4 text-blush-600" />
                )}
              </button>

              <Button
                variant="primary"
                size="sm"
                className="text-xs px-3 py-2 whitespace-nowrap"
                onClick={() => onOpenBooking()}
              >
                Agendar
              </Button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-full text-stone-800 hover:bg-stone-100 focus:outline-none"
                aria-label="Menú"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 shadow-polaroid px-5 pt-4 pb-6 animate-fadeIn max-h-[82vh] overflow-y-auto">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="text-base font-sans font-bold text-stone-900 hover:text-blush-600 py-3 border-b border-stone-100 flex items-center justify-between"
              >
                <span>{link.name}</span>
                <ArrowUpRight className="w-4 h-4 text-stone-500" />
              </a>
            ))}
          </nav>

          <div className="pt-5 space-y-3">
            <Button
              variant="primary"
              size="md"
              fullWidth
              icon={<Calendar className="w-4 h-4" />}
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
            >
              Reservar Cita en Línea (Sin Registro)
            </Button>

            <div className="flex items-center justify-between text-xs text-stone-600 pt-2">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blush-500" />
                <span>San Fernando / Tequendama, Cali</span>
              </span>
              {onOpenAdmin && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdmin();
                  }}
                  aria-label="Acceso privado"
                  className="p-1.5 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
