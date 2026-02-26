import { XCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface PaymentFailureProps {
  onClose: () => void;
}

export default function PaymentFailure({ onClose }: PaymentFailureProps) {
  const scrollToMembership = () => {
    onClose();
    setTimeout(() => {
      const element = document.getElementById('membership');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-destructive/5 to-background" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-destructive/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-destructive/10 rounded-full blur-3xl" />

      <div className="max-w-2xl w-full relative z-10">
        <Card className="border-2 border-destructive/50 bg-gradient-to-br from-card via-card to-destructive/5">
          <CardContent className="py-16 text-center space-y-8">
            <div className="w-24 h-24 rounded-full bg-destructive/20 flex items-center justify-center mx-auto">
              <XCircle className="w-12 h-12 text-destructive" />
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-serif font-bold">
                Payment Cancelled
              </h1>
              <p className="text-xl text-muted-foreground max-w-md mx-auto">
                Your payment was not completed. No charges have been made to your account.
              </p>
            </div>

            <div className="bg-muted/50 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-sm text-muted-foreground">
                If you experienced any issues during checkout or have questions about our membership plans, please don't hesitate to contact us.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" onClick={onClose}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Return to Home
              </Button>
              <Button size="lg" variant="outline" onClick={scrollToMembership}>
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
