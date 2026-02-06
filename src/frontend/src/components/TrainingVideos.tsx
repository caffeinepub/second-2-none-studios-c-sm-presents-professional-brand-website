import { useGetTrainingVideos, useGetTrainingDocuments } from '../hooks/useQueries';
import { Video, Loader2, ExternalLink, FileText } from 'lucide-react';
import { SiPaypal } from 'react-icons/si';
import { Button } from './ui/button';

export default function TrainingVideos() {
  const { data: trainingVideos, isLoading: videosLoading } = useGetTrainingVideos();
  const { data: trainingDocuments, isLoading: documentsLoading } = useGetTrainingDocuments();
  const paypalUrl = 'https://paypal.me/drshanejc55';

  const isLoading = videosLoading || documentsLoading;

  return (
    <section id="training-videos" className="relative py-24 overflow-hidden">
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
        {/* Training Videos Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <Video className="w-8 h-8 text-amber-400" />
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">
              Training Videos
            </h2>
          </div>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Watch Dr. Charbonnet's training videos covering essential topics in design thinking, innovation, and critical reasoning.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-amber-400" />
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Training Videos */}
            {trainingVideos && trainingVideos.length > 0 ? (
              trainingVideos.map((video, index) => (
                <div key={video.id} className="text-center space-y-4">
                  <h3 className="text-xl md:text-2xl font-serif text-amber-300 leading-relaxed">
                    <span className="font-bold">Training Video #{index + 1}:</span> {video.title}
                  </h3>
                  {video.videoUrl && (
                    <div>
                      <Button
                        asChild
                        className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-semibold px-8 py-6 text-lg shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 transition-all duration-300"
                      >
                        <a
                          href={video.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2"
                        >
                          <ExternalLink className="w-5 h-5" />
                          Watch This Video
                        </a>
                      </Button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-10">
                <Video className="w-16 h-16 text-amber-400/30 mx-auto mb-4" />
                <p className="text-slate-400 text-lg">The Training Videos section is ready for new content.</p>
                <p className="text-slate-500 text-sm mt-2">Videos will be displayed here as they are added.</p>
              </div>
            )}

            {/* Visual Double-Space Separator */}
            <div className="py-8"></div>

            {/* Training Documents Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 mb-4">
                <FileText className="w-8 h-8 text-amber-400" />
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">
                  Training Documents
                </h2>
              </div>
            </div>

            {/* Training Documents (PDFs) - Strict Two-Line Format */}
            {trainingDocuments && trainingDocuments.length > 0 ? (
              trainingDocuments.map((document) => (
                <div key={document.id} className="text-center space-y-3">
                  {/* Line 1: Title only */}
                  <h3 className="text-xl md:text-2xl font-serif text-amber-300 leading-relaxed">
                    {document.title}
                  </h3>
                  {/* Line 2: Clickable shortDescription text (no button, no extra label) */}
                  {document.documentUrl && document.shortDescription && (
                    <div>
                      <a
                        href={`/assets/${document.documentUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-400 hover:text-amber-300 transition-colors duration-300 underline text-base md:text-lg"
                      >
                        {document.shortDescription}
                      </a>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-10">
                <FileText className="w-16 h-16 text-amber-400/30 mx-auto mb-4" />
                <p className="text-slate-400 text-lg">The Training Documents section is ready for new content.</p>
                <p className="text-slate-500 text-sm mt-2">Documents will be displayed here as they are added.</p>
              </div>
            )}

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
        )}
      </div>
    </section>
  );
}
