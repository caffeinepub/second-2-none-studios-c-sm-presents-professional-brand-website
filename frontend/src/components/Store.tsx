import { Shirt, ExternalLink } from 'lucide-react';
import { SiPaypal } from 'react-icons/si';
import { Button } from '@/components/ui/button';

export default function Store() {
  const paypalUrl = 'https://paypal.me/drshanejc55';

  // Hardcoded apparel items for public display (three-line format)
  const apparelItems = [
    {
      id: 1,
      name: 'As Strong as Our Weak Link — t-shirt',
      bonfireLink: 'https://www.bonfire.com/as-strong-as-our-weak-link/?utm_source=copy_link&utm_medium=campaign_page&utm_campaign=as-strong-as-our-weak-link&utm_content=default',
      qrCodeImage: 'qr code-2_01.27.26.jpg',
    },
    {
      id: 2,
      name: 'The Potency of Us.',
      bonfireLink: 'https://www.bonfire.com/the-potency-of-us/?utm_source=copy_link&utm_medium=campaign_page&utm_campaign=the-potency-of-us&utm_content=default',
      qrCodeImage: 'The Potency of Us_.png',
    },
    {
      id: 3,
      name: 'Resonating Within (c)(sm)',
      bonfireLink: 'https://www.bonfire.com/resonating-within-csm/?utm_source=copy_link&utm_medium=campaign_page&utm_campaign=resonating-within-csm&utm_content=default',
      qrCodeImage: 'qr code-3_01.31.26.jpg',
    },
  ];

  return (
    <section id="store" className="relative py-24 overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'url(/assets/generated/celestial-pattern.dim_1600x900.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/50 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <Shirt className="w-8 h-8 text-amber-400" />
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">
              Apparel
            </h2>
          </div>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Exclusive apparel and merchandise by Dr. Charbonnet
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          {apparelItems.map((item) => (
            <div key={item.id} className="text-center space-y-4">
              {/* Line 1: Title */}
              <h3 className="text-xl md:text-2xl font-serif text-amber-300 leading-relaxed">
                {item.name}
              </h3>
              
              {/* Line 2: Order Button */}
              <div>
                <Button
                  asChild
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-semibold px-8 py-6 text-lg shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 transition-all duration-300"
                >
                  <a
                    href={item.bonfireLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    <ExternalLink className="w-5 h-5" />
                    Order This Item
                  </a>
                </Button>
              </div>

              {/* Line 3: QR Code */}
              {item.qrCodeImage && (
                <div className="flex justify-center pt-4">
                  <div className="p-4 bg-white rounded-lg shadow-lg border-2 border-amber-400/50 hover:border-amber-400 transition-all duration-300">
                    <img 
                      src={`/assets/${item.qrCodeImage}`}
                      alt={`QR code for ${item.name}`}
                      className="w-48 h-48 md:w-56 md:h-56"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* PayPal Payment Portal - Three Line Format */}
          <div className="text-center space-y-4 pt-8 border-t border-amber-500/20">
            {/* Line 1: Text Label */}
            <h3 className="text-xl md:text-2xl font-serif text-amber-300 leading-relaxed">
              PayPal Payment Portal
            </h3>
            
            {/* Line 2: PayPal Button */}
            <div>
              <Button
                asChild
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-semibold px-8 py-6 text-lg shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 transition-all duration-300"
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
                className="text-amber-400 hover:text-amber-300 transition-colors duration-300 underline text-base"
              >
                paypal.me/drshanejc55
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
