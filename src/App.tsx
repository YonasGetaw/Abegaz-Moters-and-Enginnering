import React, { useEffect, useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { MobileActionBar } from './components/layout/MobileActionBar';
import { Toast } from './components/common/Toast';
import { HomePage } from './components/home/HomePage';
import { ServicesPage } from './components/services/ServicesPage';
import { PackagesPage } from './components/packages/PackagesPage';
import { AboutPage } from './components/about/AboutPage';
import { GalleryPage } from './components/gallery/GalleryPage';
import { FAQPage } from './components/faq/FAQPage';
import { ContactPage } from './components/contact/ContactPage';
import { BookingWizard } from './components/booking/BookingWizard';
import { CustomerPortal } from './components/account/CustomerPortal';
import { LoginSplitScreen } from './components/account/LoginSplitScreen';
import { RegisterScreen } from './components/account/RegisterScreen';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { StaffDashboard } from './components/staff/StaffDashboard';
import { TrackBookingPage } from './components/booking/TrackBookingPage';
import { NotificationSimulatorModal } from './components/notifications/NotificationSimulatorModal';
import { NotFoundPage, ForbiddenPage, EmailPreviewModal, TelegramPreviewModal } from './components/common/SystemPages';
import { FloatingSocialMenu } from './components/common/FloatingSocialMenu';
import { ChevronUp } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentView, toast, locale } = useApp();
  const [showScrollTop, setShowScrollTop] = useState(false);

  const isPortalView = ['admin', 'admin-login', 'staff', 'login', 'register', 'account'].includes(currentView);

  // Global Scroll Listener for Floating Scroll-To-Top Button
  useEffect(() => {
    const handleWindowScroll = () => {
      setShowScrollTop(window.scrollY > 350);
    };
    window.addEventListener('scroll', handleWindowScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleWindowScroll);
  }, []);

  // Reveal page sections and cards as they enter the viewport, including dynamically added content.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });

    const page = document.querySelector('main');
    if (!page) return;

    const targets = new Set<Element>();
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canObserve = 'IntersectionObserver' in window && !prefersReducedMotion;
    const observer = canObserve
      ? new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
              }
            });
          },
          {
            threshold: 0.08,
            rootMargin: '0px 0px -8% 0px'
          }
        )
      : null;

    const revealElements = (root: ParentNode) => {
      const selector = 'section, .scroll-reveal, .card-hover-effect, [data-scroll-reveal]';
      const elements = Array.from(root.querySelectorAll(selector));
      if (root instanceof Element && root.matches(selector)) elements.unshift(root);

      elements.forEach((element) => {
        if (targets.has(element)) return;
        targets.add(element);
        element.classList.add('scroll-reveal');
        if (observer) {
          observer.observe(element);
        } else {
          element.classList.add('is-visible');
        }
      });
    };

    revealElements(page);
    const contentObserver = 'MutationObserver' in window
      ? new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
              if (node instanceof HTMLElement) revealElements(node);
            });
          });
        })
      : null;
    contentObserver?.observe(page, { childList: true, subtree: true });

    return () => {
      contentObserver?.disconnect();
      observer?.disconnect();
      targets.forEach((element) => element.classList.remove('scroll-reveal', 'is-visible'));
    };
  }, [currentView]);

  // Give every pointer or keyboard activation a visible, repeatable press animation.
  useEffect(() => {
    const timers = new Map<HTMLElement, number>();
    const animateControl = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return;
      const control = target.closest<HTMLElement>('button, a[href], [role="button"], .clickable');
      if (!control || ('disabled' in control && Boolean((control as HTMLButtonElement).disabled))) return;

      const previousTimer = timers.get(control);
      if (previousTimer) window.clearTimeout(previousTimer);
      control.classList.remove('interaction-pulse');
      void control.offsetWidth;
      control.classList.add('interaction-pulse');
      timers.set(control, window.setTimeout(() => {
        control.classList.remove('interaction-pulse');
        timers.delete(control);
      }, 320));
    };

    const handlePointerDown = (event: PointerEvent) => animateControl(event.target);
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!event.repeat && (event.key === 'Enter' || event.key === ' ')) animateControl(event.target);
    };

    document.addEventListener('pointerdown', handlePointerDown, true);
    document.addEventListener('keydown', handleKeyDown, true);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown, true);
      document.removeEventListener('keydown', handleKeyDown, true);
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Global Header (Hidden on portal / auth views) */}
      {!isPortalView && <Header />}

      {/* Main Routed Page Content with Silk-smooth Page Enter Transition */}
      <main key={currentView} className="flex-grow animate-page-enter">

        {currentView === 'home' && <HomePage />}
        {currentView === 'about' && <AboutPage />}      
        {currentView === 'services' && <ServicesPage />}
        {currentView === 'packages' && <PackagesPage />}
        
        {currentView === 'gallery' && <GalleryPage />}
        {currentView === 'faq' && <FAQPage />}
        {currentView === 'contact' && <ContactPage />}
        {currentView === 'track' && <TrackBookingPage />}
        {currentView === 'book' && <BookingWizard />}
        {currentView === 'login' && <LoginSplitScreen />}
        {currentView === 'register' && <RegisterScreen />}
        {currentView === 'account' && <CustomerPortal />}
        {currentView === 'admin-login' && <AdminLogin />}
        {currentView === 'admin' && <AdminDashboard />}
        {currentView === 'staff' && <StaffDashboard />}
        {currentView === '404' && <NotFoundPage />}
        {currentView === '403' && <ForbiddenPage />}
      </main>

      {/* Global Footer (Hidden on portal / auth views) */}
      {!isPortalView && <Footer />}

      {/* Mobile Sticky Action Bar */}
      <MobileActionBar />

      {/* Global Toast Alert */}
      <Toast toast={toast} />

      {/* Live Telegram & Email Notification Simulator Modal */}
      <NotificationSimulatorModal />

      {/* Part F System Modals (F3 Email, F4 Telegram) */}
      <EmailPreviewModal />
      <TelegramPreviewModal />

      {/* Floating Speed-Dial Social & Contact Channels Widget */}
      {!['admin', 'staff'].includes(currentView) && <FloatingSocialMenu />}

      {/* Global Floating Scroll-To-Top Button with Smooth Bounce & Click Reaction */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-24 right-6 sm:bottom-28 sm:right-8 z-40 p-3 bg-white text-slate-800 hover:text-red-600 hover:bg-slate-50 rounded-full shadow-xl border border-slate-200 btn-click-effect active:scale-75 transition-all duration-200 animate-fade-in-scale flex items-center justify-center group"
          title={locale === 'am' ? 'ወደ ላይ ውጣ' : 'Scroll to top'}
        >
          <ChevronUp className="w-5 h-5 stroke-[2.5] group-hover:-translate-y-0.5 transition-transform" />
        </button>
      )}
    </div>

  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
