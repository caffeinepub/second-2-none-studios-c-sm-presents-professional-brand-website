import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { ShoppingItem } from '../backend';
import { useCreateCheckoutSession, useIsStripeConfigured } from '../hooks/useQueries';
import { toast } from 'sonner';
import StripeSetupModal from './StripeSetupModal';

interface CartItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
}

interface CartDrawerProps {
  cart: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  cart,
  isOpen,
  onClose,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const createCheckoutSession = useCreateCheckoutSession();
  const { data: isStripeConfigured, isLoading: isCheckingStripe } = useIsStripeConfigured();

  const formatPrice = (price: number) => {
    return `$${(price / 100).toFixed(2)}`;
  };

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.price, 0);
  };

  const handleCheckout = async () => {
    if (cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    if (!isStripeConfigured) {
      toast.error('Payment system is not configured. Please contact the administrator.');
      return;
    }

    try {
      const items: ShoppingItem[] = cart.map((product) => ({
        productName: product.name,
        productDescription: product.description,
        priceInCents: BigInt(product.price),
        quantity: BigInt(1),
        currency: 'usd',
      }));

      const baseUrl = `${window.location.protocol}//${window.location.host}`;
      const successUrl = `${baseUrl}?payment=success`;
      const cancelUrl = `${baseUrl}?payment=cancelled`;

      const session = await createCheckoutSession.mutateAsync({
        items,
        successUrl,
        cancelUrl,
      });

      window.location.href = session.url;
    } catch (error) {
      toast.error('Failed to initiate checkout. Please try again.');
      console.error(error);
    }
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle className="flex items-center justify-between">
              Shopping Cart
              {cart.length > 0 && (
                <Button variant="ghost" size="sm" onClick={onClearCart}>
                  Clear All
                </Button>
              )}
            </SheetTitle>
          </SheetHeader>

          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center">
              <p className="text-muted-foreground mb-4">Your cart is empty</p>
              <Button onClick={onClose}>Continue Shopping</Button>
            </div>
          ) : (
            <>
              <ScrollArea className="h-[calc(100vh-250px)] pr-4 mt-6">
                <div className="space-y-4">
                  {cart.map((item, index) => (
                    <div key={index} className="flex gap-4 p-4 border rounded-lg">
                      {item.image && (
                        <div className="w-20 h-20 rounded-md overflow-hidden bg-muted flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold truncate">{item.name}</h4>
                        <p className="text-sm text-muted-foreground truncate">
                          {item.description}
                        </p>
                        <p className="text-lg font-bold text-primary mt-1">
                          {formatPrice(item.price)}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onRemoveItem(index)}
                        className="flex-shrink-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <Separator className="my-4" />

              <SheetFooter className="flex-col gap-4">
                <div className="flex items-center justify-between text-lg font-semibold">
                  <span>Total:</span>
                  <span className="text-2xl text-primary">
                    ${(calculateTotal() / 100).toFixed(2)}
                  </span>
                </div>
                <Button
                  size="lg"
                  className="w-full"
                  onClick={handleCheckout}
                  disabled={createCheckoutSession.isPending || isCheckingStripe}
                >
                  {createCheckoutSession.isPending ? 'Processing...' : 'Proceed to Checkout'}
                </Button>
              </SheetFooter>
            </>
          )}
        </SheetContent>
      </Sheet>

      {!isCheckingStripe && !isStripeConfigured && <StripeSetupModal />}
    </>
  );
}
