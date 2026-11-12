import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { WhatsAppFloat } from './components/layout/WhatsAppFloat';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/home/Hero';
import { WhatIsOT } from './components/home/WhatIsOT';
import { TrustSection } from './components/home/TrustSection';
import { AboutSection } from './components/about/AboutSection';
import { ServicesSection } from './components/services/ServicesSection';
import { EmbeddedBookingSection } from './components/booking/EmbeddedBookingSection';
import { ReviewsSection } from './components/reviews/ReviewsSection';
import { GallerySection } from './components/gallery/GallerySection';
import { ContactSection } from './components/contact/ContactSection';
import { BookingWizardModal } from './components/booking/BookingWizardModal';
import { ConfirmationModal } from './components/booking/ConfirmationModal';
import { AdminAgendaModal } from './components/admin/AdminAgendaModal';
import { LegalModals, LegalTabType } from './components/legal/LegalModals';
import { CookieBanner } from './components/legal/CookieBanner';
import { Appointment, Review } from './types';
import { ReviewsManager } from './lib/reviewsStore';
import { initialReviews } from './data/reviewsData';

const THEME_STORAGE_KEY = 'laura_theme_mode_v1';

export function App() {
  // Dark Mode State (persisted in localStorage)
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      return saved === 'dark';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem(THEME_STORAGE_KEY, darkMode ? 'dark' : 'light');
    } catch {
      // ignore storage error
    }
  }, [darkMode]);

  // Booking Wizard Modal State
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | undefined>(undefined);

  // Confirmation Modal State
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [confirmedAppointment, setConfirmedAppointment] = useState<Appointment | null>(null);

  // Admin Agenda Panel Modal State (Single Password Protected for Laura)
  const [adminModalOpen, setAdminModalOpen] = useState(false);

  // Legal Modals State (Ley 1581 de 2012 & Cookies Colombia)
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState<LegalTabType>('datos');

  // Reviews State
  const [reviews, setReviews] = useState<Review[]>(initialReviews);

  const fetchReviews = async () => {
    try {
      const data = await ReviewsManager.getReviews();
      setReviews(data);
    } catch (e) {
      console.error('Error fetching reviews:', e);
    }
  };

  useEffect(() => {
    fetchReviews();
    const unsubscribe = ReviewsManager.subscribe(() => {
      fetchReviews();
    });
    return () => unsubscribe();
  }, []);

  const handleOpenBooking = (serviceId?: string) => {
    setPreselectedServiceId(serviceId);
    setBookingModalOpen(true);
  };

  const handleBookingSuccess = (appointment: Appointment) => {
    setConfirmedAppointment(appointment);
    setConfirmationModalOpen(true);
  };

  const handleOpenLegal = (tab: LegalTabType = 'datos') => {
    setLegalTab(tab);
    setLegalModalOpen(true);
  };

  const handleExploreServices = () => {
    const el = document.getElementById('especialidades');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream-100 dark:bg-stone-950 text-stone-900 dark:text-stone-100 font-sans selection:bg-blush-200 selection:text-stone-900 transition-colors duration-300 overflow-x-hidden">
      {/* Top Conversion Bar & Architectural Header with Dark Mode Toggle */}
      <Navbar
        onOpenBooking={handleOpenBooking}
        onOpenAdmin={() => setAdminModalOpen(true)}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode((prev) => !prev)}
      />

      {/* Main Conversion-Engineered Page Flow */}
      <main className="flex-1">
        {/* 1. Split Editorial Hero + Live Available Slots Widget */}
        <Hero
          onOpenBooking={handleOpenBooking}
          onExploreServices={handleExploreServices}
        />

        {/* 2. Interactive Symptom & Need Diagnostic Selector (6 Specialties) */}
        <WhatIsOT
          onExploreServices={handleExploreServices}
          onOpenBooking={handleOpenBooking}
        />

        {/* 3. Specialized Clinical Portfolio (01–06) with Embedded Videos & Real Details */}
        <ServicesSection
          onOpenBooking={handleOpenBooking}
          reviews={reviews}
        />

        {/* 4. First Session 3-Step Journey (Removing Uncertainty) */}
        <TrustSection />

        {/* 5. Editorial Founder Profile: Laura Rodríguez */}
        <AboutSection onOpenBooking={() => handleOpenBooking()} />

        {/* 6. On-Page Embedded Live Booking Console (Zero Friction) */}
        <EmbeddedBookingSection
          onBookingSuccess={handleBookingSuccess}
          onOpenLegal={handleOpenLegal}
        />

        {/* 7. Email-Verified Patient Testimonials */}
        <ReviewsSection
          reviews={reviews}
          onReviewAdded={fetchReviews}
          onOpenLegal={handleOpenLegal}
        />

        {/* 8. Asymmetric Studio Lookbook & Videos */}
        <GallerySection />

        {/* 9. Objection-Handling FAQ + Cali Location Map & Direct Contact */}
        <ContactSection
          onOpenBooking={() => handleOpenBooking()}
          onOpenLegal={handleOpenLegal}
        />
      </main>

      {/* Footer with Pre-Footer Conversion Banner, Admin Trigger & Colombian Legal Links */}
      <Footer
        onOpenBooking={() => handleOpenBooking()}
        onOpenLegal={handleOpenLegal}
        onOpenAdmin={() => setAdminModalOpen(true)}
      />

      {/* Floating WhatsApp Direct Access (318 575 3889) */}
      <WhatsAppFloat />

      {/* Colombian Cookie & Habeas Data Consent Banner */}
      <CookieBanner onOpenLegal={handleOpenLegal} />

      {/* Interactive Booking Modal (Triggered from any CTA) */}
      <BookingWizardModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        preselectedServiceId={preselectedServiceId}
        onBookingSuccess={handleBookingSuccess}
        onOpenLegal={handleOpenLegal}
      />

      {/* Confirmation Modal & WhatsApp One-Click Dispatch */}
      <ConfirmationModal
        isOpen={confirmationModalOpen}
        onClose={() => setConfirmationModalOpen(false)}
        appointment={confirmedAppointment}
      />

      {/* Password-Protected Admin Agenda Modal for Laura */}
      <AdminAgendaModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
      />

      {/* Colombian Legal Modals (Ley 1581 de 2012, Cookies SIC & Términos) */}
      <LegalModals
        isOpen={legalModalOpen}
        onClose={() => setLegalModalOpen(false)}
        initialTab={legalTab}
      />
    </div>
  );
}

export default App;
