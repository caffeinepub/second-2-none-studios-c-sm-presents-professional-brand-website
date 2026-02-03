import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-muted/30 border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        {/* Professional Credentials Section */}
        <div className="mb-12 max-w-4xl mx-auto bg-[#808000]/20 rounded-lg p-8">
          <h3 className="text-[#ff8c00] font-serif text-xl md:text-2xl font-bold mb-6 text-center md:text-left">
            Professional Credentials
          </h3>
          <div className="space-y-2 text-[#ff8c00] font-serif text-sm md:text-base leading-relaxed text-center md:text-left">
            <p>Professional Credentials (underpinning) Capability, Competency, and Mastery.</p>
            <p>Ph.D. in design and innovation (Human-centric).</p>
            <p>Master Degree in Adult Professional Development -- Leadership Studies.</p>
            <p>Undergrad degree in Computer Information Systems with minors in Psychology and Mathematics.</p>
            <p>Certification in 'Responsible Conduct of Research.'</p>
            <p>Certification in design thinking (7 total).</p>
            <p>Certification in Intellectual Property.</p>
            <p>Positive Belief Therapy.</p>
            <p>Certification in life coaching.</p>
            <p>Certification in Comic Studies.</p>
            {/* Visual spacer line */}
            <p className="opacity-0 select-none" aria-hidden="true">·</p>
            <p>Decorated US Veteran with expertise in Communications.</p>
            <p>Author of 50 riveting 'great‑reads' which transforms the mind, the intellect, the emotions, and the spiritual aspects of composite human existence.</p>
            <p>Expertise in mixed martial arts.</p>
          </div>
        </div>

        {/* Copyright Notice */}
        <div className="text-center text-sm text-muted-foreground border-t border-border/50 pt-8">
          <p className="flex items-center justify-center gap-2">
            © 2025. Built with{' '}
            <Heart className="h-4 w-4 text-primary fill-primary" /> using{' '}
            <a
              href="https://caffeine.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
