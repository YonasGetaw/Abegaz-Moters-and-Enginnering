import React from 'react';
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

const AppContent: React.FC = () => {
  const { currentView, toast } = useApp();

  const isPortalView = ['admin', 'admin-login', 'staff', 'login', 'register', 'account'].includes(currentView);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Global Header (Hidden on portal / auth views) */}
      {!isPortalView && <Header />}

      {/* Main Routed Page Content */}
      <main className="flex-grow">
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
