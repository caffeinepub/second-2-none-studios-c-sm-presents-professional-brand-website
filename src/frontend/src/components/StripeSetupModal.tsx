import { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useSetStripeConfiguration, useIsCallerAdmin } from '../hooks/useQueries';
import { toast } from 'sonner';

export default function StripeSetupModal() {
  const [isOpen, setIsOpen] = useState(true);
  const [secretKey, setSecretKey] = useState('');
  const [countries, setCountries] = useState('US,CA,GB');
  const setStripeConfig = useSetStripeConfiguration();
  const { data: isAdmin } = useIsCallerAdmin();

  if (!isAdmin) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!secretKey.trim()) {
      toast.error('Please enter your Stripe secret key');
      return;
    }

    try {
      const allowedCountries = countries
        .split(',')
        .map((c) => c.trim().toUpperCase())
        .filter((c) => c.length === 2);

      await setStripeConfig.mutateAsync({
        secretKey: secretKey.trim(),
        allowedCountries,
      });

      toast.success('Stripe configuration saved successfully');
      setIsOpen(false);
    } catch (error) {
      toast.error('Failed to save Stripe configuration');
      console.error(error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Configure Stripe Payment</DialogTitle>
          <DialogDescription>
            Set up Stripe to enable payment processing for your store.
          </DialogDescription>
        </DialogHeader>

        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            As an admin, you need to configure Stripe before customers can make purchases.
          </AlertDescription>
        </Alert>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="secretKey">Stripe Secret Key</Label>
            <Input
              id="secretKey"
              type="password"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              placeholder="sk_test_..."
              required
            />
            <p className="text-xs text-muted-foreground">
              Find this in your Stripe Dashboard under Developers → API keys
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="countries">Allowed Countries (comma-separated)</Label>
            <Input
              id="countries"
              value={countries}
              onChange={(e) => setCountries(e.target.value)}
              placeholder="US,CA,GB"
              required
            />
            <p className="text-xs text-muted-foreground">
              Use ISO 3166-1 alpha-2 country codes (e.g., US, CA, GB)
            </p>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={setStripeConfig.isPending} className="w-full">
              {setStripeConfig.isPending ? 'Saving...' : 'Save Configuration'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
