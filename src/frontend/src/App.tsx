import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useGetCallerUserProfile } from './hooks/useQueries';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Biography from './components/Biography';
import Booking from './components/Booking';
import Store from './components/Store';
import Media from './components/Media';
import Contact from './components/Contact';
import Membership from './components/Membership';
import Publications from './components/Publications';
import TrainingVideos from './components/TrainingVideos';
import SupportDonations from './components/SupportDonations';
import Credentials from './components/Credentials';
import ProfileSetupModal from './components/ProfileSetupModal';
import PaymentSuccess from './components/PaymentSuccess';
import PaymentFailure from './components/PaymentFailure';
import { useEffect, useState } from 'react';

export default function App() {
  const { identity, isInitializing } = useInternetIdentity();
  const {
    data: userProfile,
    isLoading: profileLoading,
    isFetched,
  } = useGetCallerUserProfile();
  const [paymentStatus, setPaymentStatus] = useState<'success' | 'failure' | null>(null);

  const isAuthenticated = !!identity;
  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const payment = params.get('payment');
    
    if (payment === 'success') {
      setPaymentStatus('success');
      window.history.replaceState({}, '', window.location.pathname);
    } else if (payment === 'cancelled') {
      setPaymentStatus('failure');
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  if (isInitializing) {
    return (
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <div className="flex min-h-screen items-center justify-center bg-background">
          <div className="text-center">
            <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (paymentStatus === 'success') {
    return (
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <div className="min-h-screen bg-background">
          <Header />
          <PaymentSuccess onClose={() => setPaymentStatus(null)} />
          <Footer />
          <Credentials />
          <Toaster />
        </div>
      </ThemeProvider>
    );
  }

  if (paymentStatus === 'failure') {
    return (
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <div className="min-h-screen bg-background">
          <Header />
          <PaymentFailure onClose={() => setPaymentStatus(null)} />
          <Footer />
          <Credentials />
          <Toaster />
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <Biography />
          <Publications />
          <TrainingVideos />
          <Membership />
          <Booking />
          <Store />
          <Media />
          <Contact />
          <SupportDonations />
        </main>
        <Footer />
        <Credentials />
        <Toaster />
        {showProfileSetup && <ProfileSetupModal />}
      </div>
    </ThemeProvider>
  );
}
