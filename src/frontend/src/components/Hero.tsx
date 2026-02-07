import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Layered Background with Parallax */}
      <div className="absolute inset-0 z-0">
        {/* Base layer - Celestial pattern */}
        <div
          className="absolute inset-0 parallax-layer"
          style={{
            transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
          }}
        >
          <img
            src="/assets/generated/celestial-pattern.dim_1600x900.jpg"
            alt=""
            className="w-full h-full object-cover opacity-30"
          />
        </div>

        {/* Middle layer - Layered background */}
        <div
          className="absolute inset-0 parallax-layer"
          style={{
            transform: `translate(${mousePosition.x * 0.8}px, ${mousePosition.y * 0.8}px)`,
          }}
        >
          <img
            src="/assets/generated/layered-background.dim_1920x1080.jpg"
            alt=""
            className="w-full h-full object-cover opacity-40"
          />
        </div>

        {/* Geometric overlay */}
        <div
          className="absolute inset-0 parallax-layer"
          style={{
            transform: `translate(${mousePosition.x * 1.2}px, ${mousePosition.y * 1.2}px)`,
          }}
        >
          <img
            src="/assets/generated/geometric-overlay-transparent.dim_1200x800.png"
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
        </div>

        {/* Renaissance sketch overlay */}
        <div
          className="absolute inset-0 parallax-layer"
          style={{
            transform: `translate(${mousePosition.x * 1.5}px, ${mousePosition.y * 1.5}px)`,
          }}
        >
          <img
            src="/assets/generated/renaissance-sketch-overlay-transparent.dim_1400x1000.png"
            alt=""
            className="w-full h-full object-cover opacity-15"
          />
        </div>

        {/* Gradient overlay with cosmic tones */}
        <div className="absolute inset-0 bg-gradient-to-br from-background/98 via-primary/20 to-background/95" />

        {/* Data grid overlay */}
        <div className="absolute inset-0 data-grid opacity-30" />
      </div>

      {/* Geometric pattern overlay */}
      <div className="absolute inset-0 z-0 geometric-overlay opacity-40" />

      {/* Glowing orbs for depth */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-glow/20 rounded-full blur-3xl animate-glow-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon/20 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: '1.5s' }} />

      {/* Content */}
      <div className="container mx-auto px-4 z-10 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8 inline-block relative">
            {/* Luminous golden halo */}
            <div className="absolute inset-0 bg-accent/40 rounded-full blur-3xl animate-glow-pulse scale-125" />
            <div className="absolute inset-0 bg-glow/30 rounded-full blur-2xl animate-glow-pulse" style={{ animationDelay: '0.5s' }} />
            
            {/* Dynamic neural-pattern glow overlay */}
            <div className="absolute inset-0 neural-glow-overlay rounded-full opacity-60 animate-neural-pulse" />
            
            {/* Portrait with enhanced effects */}
            <div className="relative">
              <img
                src="/assets/DrSJC-Grad.jpg"
                alt="Dr. Shane J Charbonnet"
                className="relative w-48 h-48 md:w-56 md:h-56 rounded-full border-4 border-accent/70 shadow-golden-halo mx-auto ring-4 ring-glow/30 ring-offset-4 ring-offset-background object-cover"
              />
              
              {/* Additional glow layers */}
              <div className="absolute inset-0 rounded-full border-2 border-glow/40 animate-pulse-ring" />
              <div className="absolute inset-0 rounded-full border border-accent/50 animate-pulse-ring" style={{ animationDelay: '0.3s' }} />
            </div>
            
            <div className="absolute -top-2 -right-2 w-10 h-10 bg-accent rounded-full flex items-center justify-center shadow-glow-lg animate-bounce-subtle">
              <Sparkles className="w-5 h-5 text-accent-foreground" />
            </div>
          </div>

          {/* Intro Text Block - Neon Green Border */}
          <div className="mb-8 max-w-3xl mx-auto neon-green-intro-box">
            {/* Double spacing before content */}
            <div className="h-8" />
            <div className="h-8" />
            
            <p className="text-base md:text-lg text-foreground leading-relaxed whitespace-pre-wrap px-4">
              Hello there, and welcome to my site. I am the Doctor of UDesign, owner, founder of '[[ Simply Shane Designs ]] (c)sm'  I just wanted to take a few moments to welcome you to this site, to tell you how thrilled and electrified I am that you're actually here with us, and it is my desire, deepest desire, that the content that flows, that's attached, that's uploaded to this site will greatly benefit you. So stay connected, join the community. If you have any questions, feel free. Thank you very much. Let's begin.
            </p>
          </div>

          {/* Brand heading with Renaissance-golden styling */}
          <div className="mb-3">
            <h2 className="text-2xl md:text-3xl font-serif font-semibold text-accent tracking-wide glow-text-subtle">
              Simply Shane Designs <span className="text-lg align-super">(c)sm</span>
            </h2>
          </div>

          {/* PRESENTS heading - decreased by two font-size steps */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-foreground mb-6 leading-tight glow-text mt-2">
            -- PRESENTS --
          </h1>

          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-accent to-transparent" />
            {/* Subtitle - increased by two font-size steps */}
            <p className="text-3xl md:text-4xl font-semibold tracking-wider enhanced-subtitle-text">
              Innovator • Educator • Author • Master of 5D Reasoning & Thinking
            </p>
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-accent to-transparent" />
          </div>

          <p className="text-lg md:text-xl text-foreground/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Empowering minds through critical reasoning, problem-solving, and design thinking—committed to fostering intellectual excellence and creative innovation.
          </p>

          {/* Play Soundtrack Section - Three Horizontally-Aligned Columns */}
          <div className="mb-8 max-w-3xl mx-auto">
            {/* Site Soundtrack Label */}
            <div className="mb-4">
              <h3 className="text-xl md:text-2xl font-semibold text-[#39FF14]">
                Site Soundtrack.
              </h3>
            </div>

            <div className="relative rounded-lg overflow-hidden border-2 border-accent/50 shadow-glow-lg bg-card/95 backdrop-blur-sm p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                {/* Left Column - YouTube Thumbnail Link */}
                <div className="flex justify-center md:justify-start">
                  <a
                    href="https://youtu.be/yCByrDXhDJ4?si=nxD83RfKdwZakAlV"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative w-32 h-32 rounded-lg overflow-hidden border-2 border-accent/40 shadow-glow hover:border-accent hover:shadow-glow-lg transition-all duration-300 group"
                  >
                    <img
                      src={`https://img.youtube.com/vi/yCByrDXhDJ4/mqdefault.jpg`}
                      alt="YouTube Video"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                      <div className="w-12 h-12 bg-accent/90 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-accent-foreground ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </a>
                </div>

                {/* Center Column - YouTube Shorts Thumbnail Link */}
                <div className="flex justify-center">
                  <a
                    href="https://youtube.com/shorts/lhjxQ1nLgaI?si=DjfF3I5vkR8pwkvO"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative w-32 h-32 rounded-lg overflow-hidden border-2 border-accent/40 shadow-glow hover:border-accent hover:shadow-glow-lg transition-all duration-300 group"
                  >
                    <img
                      src={`https://img.youtube.com/vi/lhjxQ1nLgaI/mqdefault.jpg`}
                      alt="YouTube Shorts"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                      <div className="w-12 h-12 bg-accent/90 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-accent-foreground ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </a>
                </div>

                {/* Right Column - YouTube Full Video Thumbnail Link */}
                <div className="flex justify-center md:justify-end">
                  <a
                    href="https://youtu.be/aHI8mVS_PpM?si=nba7jf4Kr1j4noAd"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative w-32 h-32 rounded-lg overflow-hidden border-2 border-accent/40 shadow-glow hover:border-accent hover:shadow-glow-lg transition-all duration-300 group"
                  >
                    <img
                      src={`https://img.youtube.com/vi/aHI8mVS_PpM/mqdefault.jpg`}
                      alt="YouTube Video"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                      <div className="w-12 h-12 bg-accent/90 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-accent-foreground ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => scrollToSection('booking')}
              className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-glow hover:shadow-glow-lg transition-all duration-300 border border-glow/30"
            >
              Book a Session
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection('biography')}
              className="text-lg px-8 py-6 border-2 border-accent/50 hover:border-accent hover:bg-accent/10 hover:shadow-glow transition-all duration-300"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-[5]" />
    </section>
  );
}
