import { Crown, Check, Sparkles, Lock } from 'lucide-react';
import { SiPaypal } from 'react-icons/si';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useGetMembershipPlans, useIsUserMember, useIsStripeConfigured } from '../hooks/useQueries';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { toast } from 'sonner';
import StripeSetupModal from './StripeSetupModal';

export default function Membership() {
  const { data: plans, isLoading: plansLoading } = useGetMembershipPlans();
  const { data: isMember, isLoading: memberLoading } = useIsUserMember();
  const { data: isStripeConfigured, isLoading: isCheckingStripe } = useIsStripeConfigured();
  const { identity, login, loginStatus } = useInternetIdentity();

  const isAuthenticated = !!identity;
  const paypalUrl = 'https://paypal.me/drshanejc55';

  const handleSubscribe = () => {
    // Redirect directly to PayPal Payment Portal
    window.open(paypalUrl, '_blank', 'noopener,noreferrer');
  };

  const features = [
    'Access to all training videos',
    'Purchase books and apparel',
    'Book one-on-one sessions',
    'Exclusive content and materials',
    'Priority support',
  ];

  if (plansLoading || memberLoading) {
    return (
      <section id="membership" className="py-20 bg-muted/30 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-glow border-t-transparent" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="membership" className="py-20 bg-muted/30 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-glow/5 to-background" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-glow/10 rounded-full blur-3xl animate-glow-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon/10 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: '1.5s' }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <Crown className="w-8 h-8 text-glow" />
              <h2 className="text-4xl md:text-5xl font-serif font-bold glow-text">
                Membership Access
              </h2>
              <Crown className="w-8 h-8 text-neon" />
            </div>
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-glow to-neon" />
              <div className="w-2 h-2 rounded-full bg-glow shadow-glow" />
              <div className="h-px w-16 bg-gradient-to-r from-neon via-glow to-transparent" />
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Unlock exclusive access to premium content, training videos, and personalized sessions.
            </p>
          </div>

          {isMember && (
            <div className="mb-8 p-6 bg-gradient-to-r from-glow/20 to-neon/20 border-2 border-glow/50 rounded-lg text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Crown className="w-6 h-6 text-glow" />
                <h3 className="text-2xl font-serif font-bold">Active Member</h3>
              </div>
              <p className="text-muted-foreground">
                You have full access to all premium content and features.
              </p>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            {plans?.map((plan, index) => {
              const isMonthly = plan.productName.toLowerCase().includes('monthly');
              const price = Number(plan.priceInCents) / 100;
              const pricePerMonth = isMonthly ? price : price / 12;

              return (
                <Card
                  key={index}
                  className={`border-2 ${
                    !isMonthly
                      ? 'border-glow shadow-glow-lg bg-gradient-to-br from-card via-card to-glow/5'
                      : 'border-glow/30 hover:border-glow/50'
                  } transition-all duration-300 relative overflow-hidden`}
                >
                  {!isMonthly && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-gradient-to-r from-glow to-neon text-glow-foreground border-0">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Best Value
                      </Badge>
                    </div>
                  )}

                  <CardHeader>
                    <CardTitle className="text-2xl font-serif flex items-center gap-2">
                      <Crown className={`w-6 h-6 ${!isMonthly ? 'text-glow' : 'text-primary'}`} />
                      {plan.productName}
                    </CardTitle>
                    <p className="text-muted-foreground">{plan.productDescription}</p>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-bold text-primary">${price}</span>
                        <span className="text-muted-foreground">
                          / {isMonthly ? 'month' : 'year'}
                        </span>
                      </div>
                      {!isMonthly && (
                        <p className="text-sm text-glow mt-2">
                          Only ${pricePerMonth.toFixed(2)}/month
                        </p>
                      )}
                    </div>

                    <div className="space-y-3">
                      {features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-glow flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>

                  <CardFooter>
                    <Button
                      size="lg"
                      className={`w-full ${
                        !isMonthly
                          ? 'bg-gradient-to-r from-glow to-neon hover:from-glow/90 hover:to-neon/90 text-glow-foreground shadow-glow'
                          : ''
                      }`}
                      onClick={handleSubscribe}
                      disabled={isMember}
                    >
                      {isMember ? 'Already a Member' : 'Subscribe Now'}
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>

          {/* PayPal Payment Portal - Three Line Format */}
          <div className="max-w-4xl mx-auto mb-12">
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

          {/* Benefits section */}
          <Card className="border-2 border-glow/30 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-serif text-center flex items-center justify-center gap-2">
                <Lock className="w-6 h-6 text-glow" />
                What You'll Get
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-glow/20 flex items-center justify-center mx-auto mb-3">
                    <Sparkles className="w-6 h-6 text-glow" />
                  </div>
                  <h4 className="font-semibold">Premium Videos</h4>
                  <p className="text-sm text-muted-foreground">
                    Access our complete library of training videos and educational content.
                  </p>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-glow/20 flex items-center justify-center mx-auto mb-3">
                    <Crown className="w-6 h-6 text-glow" />
                  </div>
                  <h4 className="font-semibold">Exclusive Store</h4>
                  <p className="text-sm text-muted-foreground">
                    Purchase books and apparel available only to members.
                  </p>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-glow/20 flex items-center justify-center mx-auto mb-3">
                    <Check className="w-6 h-6 text-glow" />
                  </div>
                  <h4 className="font-semibold">Personal Sessions</h4>
                  <p className="text-sm text-muted-foreground">
                    Book one-on-one mentoring and consultation sessions.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {!isCheckingStripe && !isStripeConfigured && <StripeSetupModal />}
    </section>
  );
}
