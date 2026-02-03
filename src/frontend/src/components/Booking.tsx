import { Lock, Clock } from 'lucide-react';
import { SiPaypal } from 'react-icons/si';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCheckBookingAccess } from '../hooks/useQueries';
import { useInternetIdentity } from '../hooks/useInternetIdentity';

export default function Booking() {
  const { identity, login } = useInternetIdentity();
  const { data: hasAccess, isLoading: accessLoading } = useCheckBookingAccess();

  const isAuthenticated = !!identity;
  const paypalUrl = 'https://paypal.me/drshanejc55';

  const scrollToMembership = () => {
    const element = document.getElementById('membership');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (accessLoading) {
    return (
      <section id="booking" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="py-20 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-glow/5 to-background" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-glow/10 rounded-full blur-3xl animate-glow-pulse" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-4 glow-text">
            Book a Session
          </h2>
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-glow to-neon" />
            <div className="w-2 h-2 rounded-full bg-glow shadow-glow" />
            <div className="h-px w-16 bg-gradient-to-r from-neon via-glow to-transparent" />
          </div>
          <p className="text-center text-muted-foreground mb-8 text-lg">
            Schedule a one-on-one mentoring or consultation session.
          </p>

          {/* Consulting Rate Display */}
          <div className="mb-8 p-6 bg-gradient-to-r from-glow/10 to-neon/10 border-2 border-glow/30 rounded-lg">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Clock className="w-6 h-6 text-glow" />
              <h3 className="text-2xl font-serif font-bold">One-on-One Consulting Sessions</h3>
            </div>
            <p className="text-center text-lg text-glow font-semibold">
              Rate: $515 per hour
            </p>
          </div>

          <Card className="border-2 border-glow/30 bg-gradient-to-br from-card to-glow/5 mb-8">
            <CardContent className="py-12 text-center space-y-6">
              <div className="w-20 h-20 rounded-full bg-glow/20 flex items-center justify-center mx-auto">
                <Lock className="w-10 h-10 text-glow" />
              </div>
              <div>
                <h3 className="text-2xl font-serif font-bold mb-2">Members Only</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  {isAuthenticated
                    ? 'Subscribe to a membership plan to book one-on-one mentoring and consultation sessions.'
                    : 'Please log in and subscribe to a membership plan to book sessions.'}
                </p>
              </div>
              <div className="flex gap-4 justify-center">
                {!isAuthenticated && (
                  <Button size="lg" onClick={login}>
                    Log In
                  </Button>
                )}
                <Button size="lg" variant="outline" onClick={scrollToMembership}>
                  View Membership Plans
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* PayPal Payment Portal - Three Line Format */}
          <Card className="border-2 border-glow/30 bg-card/80 backdrop-blur-sm">
            <CardContent className="py-8 text-center space-y-4">
              {/* Line 1: Text Label */}
              <h3 className="text-xl md:text-2xl font-serif text-glow leading-relaxed">
                PayPal Payment Portal
              </h3>
              
              {/* Line 2: PayPal Button */}
              <div>
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-glow to-neon hover:from-glow/90 hover:to-neon/90 text-glow-foreground shadow-glow px-8 py-6 text-lg"
                >
                  <a
                    href={paypalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    <SiPaypal className="w-5 h-5" />
                    PayPal Button
                  </a>
                </Button>
              </div>
              
              {/* Line 3: Clickable Hyperlink */}
              <div>
                <a
                  href={paypalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-glow hover:text-neon transition-colors duration-300 underline text-base"
                >
                  paypal.me/drshanejc55
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
