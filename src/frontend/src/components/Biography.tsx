import { GraduationCap, Lightbulb, Target } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useGetBiographyContent } from '../hooks/useQueries';
import { useState, useEffect } from 'react';

export default function Biography() {
  const { data: bio, isLoading } = useGetBiographyContent();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 15,
        y: (e.clientY / window.innerHeight - 0.5) * 15,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (isLoading) {
    return (
      <section id="biography" className="py-20 bg-muted/30 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-glow border-t-transparent" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="biography" className="py-20 relative overflow-hidden">
      {/* Layered background with parallax */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      <div
        className="absolute inset-0 opacity-20 parallax-layer"
        style={{
          transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)`,
        }}
      >
        <img
          src="/assets/generated/geometric-overlay-transparent.dim_1200x800.png"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="absolute inset-0 geometric-overlay opacity-20" />
      
      {/* Glowing accent orbs */}
      <div className="absolute top-20 right-1/4 w-64 h-64 bg-copper/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-1/4 w-64 h-64 bg-glow/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 glow-text">
              A Tidbit About Dr. Shane JC
            </h2>
            <div className="flex items-center justify-center gap-2 mb-8">
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-accent to-copper" />
              <div className="w-2 h-2 rounded-full bg-accent shadow-glow" />
              <div className="h-px w-16 bg-gradient-to-r from-copper via-accent to-transparent" />
            </div>
          </div>

          {/* Portrait section with bioluminescent depth lighting */}
          <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
            <div className="relative flex-shrink-0">
              {/* Soft bioluminescent depth lighting */}
              <div className="absolute -inset-4 bg-gradient-to-br from-glow/20 via-accent/20 to-copper/20 rounded-full blur-2xl" />
              <div className="absolute -inset-2 bg-glow/10 rounded-full blur-xl animate-glow-pulse" />
              
              {/* Portrait with metallic gold shimmer border */}
              <div className="relative">
                <div className="absolute inset-0 metallic-gold rounded-full animate-shimmer opacity-60 blur-sm" />
                <img
                  src="/assets/DrSJC-Grad.jpg"
                  alt="Dr. Shane J Charbonnet"
                  className="relative w-48 h-48 md:w-56 md:h-56 rounded-full border-4 border-accent/80 shadow-golden-halo object-cover ring-2 ring-glow/20 ring-offset-4 ring-offset-background"
                />
                
                {/* Subtle depth lighting overlay */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent via-transparent to-glow/10" />
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              {/* Brand heading with Renaissance-golden styling */}
              <div className="mb-2">
                <h3 className="text-xl md:text-2xl font-serif font-semibold text-accent tracking-wide glow-text-subtle">
                  Simply Shane Designs <span className="text-base align-super">(c)sm</span>
                </h3>
              </div>
              
              {/* Name heading - reduced size and positioned lower */}
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-foreground mb-3 glow-text mt-1">
                Dr. Shane J Charbonnet
              </h3>
              
              {/* Enhanced subtitle */}
              <p className="text-lg md:text-xl font-semibold mb-4 enhanced-subtitle-text">
                Innovator • Educator • Author
              </p>
              
              <p className="text-lg text-foreground/80 leading-relaxed">
                {bio?.philosophy}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-2 border-glow/30 hover:border-glow hover:shadow-glow-lg transition-all duration-300 bg-card/80 backdrop-blur-sm group">
              <CardContent className="pt-6 text-center">
                <div className="relative mb-4 inline-block">
                  <div className="absolute inset-0 bg-glow/20 rounded-full blur-xl group-hover:bg-glow/40 transition-all" />
                  <div className="relative w-16 h-16 metallic-gold rounded-full flex items-center justify-center mx-auto shadow-glow animate-shimmer">
                    <GraduationCap className="h-8 w-8 text-accent-foreground" />
                  </div>
                </div>
                <h3 className="text-xl font-serif font-semibold mb-3 text-accent">Education</h3>
                <div className="text-muted-foreground space-y-2 text-sm md:text-base">
                  <p className="leading-relaxed">Ph.D. in design and innovation.</p>
                  <p className="leading-relaxed">Master's Degree in Adult Professional Development -- Leadership Studies.</p>
                  <p className="leading-relaxed">Undergraduate degree in 'Computer Information Systems' (engineering).</p>
                  <p className="leading-relaxed">Extensive postgrad credit hours in educational administration -- curriculum and instruction, and adult education -- instruction and facilitation.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-neon/30 hover:border-neon hover:shadow-neon transition-all duration-300 bg-card/80 backdrop-blur-sm group">
              <CardContent className="pt-6 text-center">
                <div className="relative mb-4 inline-block">
                  <div className="absolute inset-0 bg-neon/20 rounded-full blur-xl group-hover:bg-neon/40 transition-all" />
                  <div className="relative w-16 h-16 bg-gradient-to-br from-neon to-glow rounded-full flex items-center justify-center mx-auto shadow-neon">
                    <Lightbulb className="h-8 w-8 text-neon-foreground" />
                  </div>
                </div>
                <h3 className="text-xl font-serif font-semibold mb-2 text-neon">Philosophy</h3>
                <p className="text-muted-foreground">
                  Critical reasoning and design thinking for transformative solutions
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-copper/30 hover:border-copper hover:shadow-glow transition-all duration-300 bg-card/80 backdrop-blur-sm group">
              <CardContent className="pt-6 text-center">
                <div className="relative mb-4 inline-block">
                  <div className="absolute inset-0 bg-copper/20 rounded-full blur-xl group-hover:bg-copper/40 transition-all" />
                  <div className="relative w-16 h-16 metallic-copper rounded-full flex items-center justify-center mx-auto shadow-glow animate-shimmer">
                    <Target className="h-8 w-8 text-copper-foreground" />
                  </div>
                </div>
                <h3 className="text-xl font-serif font-semibold mb-2 text-copper">Expertise</h3>
                <p className="text-muted-foreground">
                  Mentoring, consulting, and thought leadership
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
