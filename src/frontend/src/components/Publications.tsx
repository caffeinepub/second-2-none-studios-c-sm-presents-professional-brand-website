import { useGetPublications } from '../hooks/useQueries';
import { BookOpen, Loader2, ExternalLink } from 'lucide-react';
import { SiPaypal } from 'react-icons/si';
import { Button } from './ui/button';

export default function Publications() {
  const { data: publications, isLoading } = useGetPublications();
  const paypalUrl = 'https://paypal.me/drshanejc55';

  return (
    <section id="publications" className="relative py-24 overflow-hidden">
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
            <BookOpen className="w-8 h-8 text-amber-400" />
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">
              Publications
            </h2>
          </div>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Explore Dr. Charbonnet's collection of books covering critical reasoning, design thinking, and innovative problem-solving approaches.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-amber-400" />
          </div>
        ) : publications && publications.length > 0 ? (
          <div className="max-w-4xl mx-auto space-y-12">
            {publications.map((publication, index) => (
              <div key={publication.id} className="text-center space-y-4">
                <h3 className="text-xl md:text-2xl font-serif text-amber-300 leading-relaxed">
                  <span className="font-bold">Book #{index + 1}:</span> {publication.title}
                </h3>
                {publication.amazonLink && (
                  <div>
                    <Button
                      asChild
                      className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-semibold px-8 py-6 text-lg shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 transition-all duration-300"
                    >
                      <a
                        href={publication.amazonLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2"
                      >
                        <ExternalLink className="w-5 h-5" />
                        Buy This Book
                      </a>
                    </Button>
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
        ) : (
          <div className="text-center py-20">
            <BookOpen className="w-16 h-16 text-amber-400/30 mx-auto mb-4" />
            <p className="text-slate-400 text-lg">The Publications section is ready for new content.</p>
            <p className="text-slate-500 text-sm mt-2">Books will be displayed here as they are added.</p>
          </div>
        )}
      </div>
    </section>
  );
}
