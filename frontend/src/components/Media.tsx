import { useState, useEffect } from 'react';
import { Sparkles, Lock } from 'lucide-react';
import { SiPaypal } from 'react-icons/si';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCheckVideoAccess } from '../hooks/useQueries';
import { useInternetIdentity } from '../hooks/useInternetIdentity';

export default function Media() {
  const { identity, login } = useInternetIdentity();
  const { data: hasAccess, isLoading: accessLoading } = useCheckVideoAccess();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const isAuthenticated = !!identity;
  const paypalUrl = 'https://paypal.me/drshanejc55';

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 15,
        y: (e.clientY / window.innerHeight - 0.5) * 15,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToMembership = () => {
    const element = document.getElementById('membership');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (accessLoading) {
    return (
      <section id="media" className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-glow border-t-transparent" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="media" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-glow/5 to-background" />
      <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-neon/20 rounded-full blur-3xl animate-glow-pulse" />
      <div className="absolute bottom-1/3 right-1/3 w-72 h-72 bg-glow/20 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: '1s' }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-glow" />
              <h2 className="text-4xl md:text-5xl font-serif font-bold glow-text">
                Training Videos
              </h2>
              <Sparkles className="w-6 h-6 text-neon" />
            </div>
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-glow to-neon" />
              <div className="w-2 h-2 rounded-full bg-glow shadow-glow" />
              <div className="h-px w-16 bg-gradient-to-r from-neon via-glow to-transparent" />
            </div>
            <p className="text-muted-foreground text-lg">
              Educational content and training materials.
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
                    ? 'Subscribe to a membership plan to access our exclusive training videos and educational content.'
                    : 'Please log in and subscribe to a membership plan to access our training videos.'}
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
