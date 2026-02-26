import { CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

interface PaymentSuccessProps {
  onClose: () => void;
}

export default function PaymentSuccess({ onClose }: PaymentSuccessProps) {
  const queryClient = useQueryClient();

  useEffect(() => {
    // Invalidate membership status to refresh user data
    queryClient.invalidateQueries({ queryKey: ['isUserMember'] });
    queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
  }, [queryClient]);

  const scrollToSection = (id: string) => {
    onClose();
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-glow/5 to-background" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-glow/10 rounded-full blur-3xl animate-glow-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon/10 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: '1.5s' }} />

      <div className="max-w-2xl w-full relative z-10">
        <Card className="border-2 border-glow shadow-glow-lg bg-gradient-to-br from-card via-card to-glow/5">
          <CardContent className="py-16 text-center space-y-8">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-glow to-neon flex items-center justify-center mx-auto shadow-glow-lg">
              <CheckCircle className="w-12 h-12 text-glow-foreground" />
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-serif font-bold glow-text">
                Payment Successful!
              </h1>
              <p className="text-xl text-muted-foreground max-w-md mx-auto">
                Thank you for your purchase. Your payment has been processed successfully.
              </p>
            </div>

            <div className="bg-muted/50 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-sm text-muted-foreground mb-2">
                <strong>Note:</strong> If you purchased a membership, an administrator will activate your account shortly. You'll receive full access to:
              </p>
              <ul className="text-sm text-left space-y-2 mt-4">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-glow flex-shrink-0 mt-0.5" />
                  <span>All training videos and educational content</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-glow flex-shrink-0 mt-0.5" />
                  <span>Exclusive store access for books and apparel</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-glow flex-shrink-0 mt-0.5" />
                  <span>Ability to book one-on-one sessions</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" onClick={onClose}>
                Return to Home
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollToSection('media')}>
                Explore Content
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
