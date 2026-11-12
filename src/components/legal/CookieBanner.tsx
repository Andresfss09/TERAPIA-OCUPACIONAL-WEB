import React, { useState, useEffect } from 'react';
import { ShieldCheck } from 'lucide-react';
import { Button } from '../ui/Button';
import { LegalTabType } from './LegalModals';

const COOKIE_CONSENT_KEY = 'luisa_cookie_consent_v1';

interface CookieBannerProps {
  onOpenLegal: (tab: LegalTabType) => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({ onOpenLegal }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (!saved) {
        const timer = setTimeout(() => setVisible(true), 900);
        return () => clearTimeout(timer);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const handleConsent = (type: 'all' | 'essential') => {
    try {
      localStorage.setItem(
        COOKIE_CONSENT_KEY,
        JSON.stringify({
          consent: type,
          timestamp: new Date().toISOString(),
          law: 'Ley 1581 de 2012 Colombia',
        })
      );
    } catch {
      // ignore storage errors
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:right-auto sm:max-w-md z-50 animate-fadeIn">
      <div className="bg-white border border-stone-300 rounded-3xl p-5 shadow-polaroid text-left space-y-3 relative">
        
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blush-50 border border-blush-200 flex items-center justify-center shrink-0 mt-0.5">
            <ShieldCheck className="w-5 h-5 text-blush-600" />
          </div>
          <div className="space-y-1">
            <h4 className="font-serif text-base font-bold text-stone-900">
              Cuidamos tus datos y tu privacidad
            </h4>
            <p className="text-xs text-stone-700 leading-relaxed">
              Usamos cookies propias y almacenamiento local para mostrar los horarios disponibles de la agenda en tiempo real y brindarte una mejor experiencia, cumpliendo con la{' '}
              <button
                type="button"
                onClick={() => onOpenLegal('datos')}
                className="font-bold text-blush-600 underline hover:text-blush-700 cursor-pointer"
              >
                Ley 1581 de 2012 (Hábeas Data Colombia)
              </button>{' '}
              y nuestra{' '}
              <button
                type="button"
                onClick={() => onOpenLegal('cookies')}
                className="font-bold text-sage-700 underline hover:text-sage-800 cursor-pointer"
              >
                Política de Cookies
              </button>.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-2 pt-1">
          <button
            type="button"
            onClick={() => handleConsent('essential')}
            className="text-xs font-bold text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 border border-stone-300 px-3.5 py-2 rounded-full transition-colors cursor-pointer"
          >
            Solo esenciales
          </button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => handleConsent('all')}
          >
            Aceptar y continuar
          </Button>
        </div>

      </div>
    </div>
  );
};
