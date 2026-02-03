export default function SupportDonations() {
  return (
    <section id="support" className="py-20 relative overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url('/assets/generated/celestial-pattern.dim_1600x900.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Support & Donations
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your generous support helps continue the mission of education, innovation, and thought leadership.
          </p>
        </div>

        {/* Payment Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Venmo Card */}
          <a
            href="https://venmo.com/u/ShaneJ-Charbonnet"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block"
          >
            <div className="relative overflow-hidden rounded-xl border-2 border-primary/30 bg-card/50 backdrop-blur-sm p-6 transition-all duration-300 hover:border-primary hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:scale-[1.02]">
              {/* Golden glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                {/* Venmo Image */}
                <div className="mb-4 rounded-lg overflow-hidden border border-border/50">
                  <img
                    src="/assets/VENMO-Image.jpg"
                    alt="Venmo QR Code"
                    className="w-full h-auto"
                  />
                </div>

                {/* Venmo Handle */}
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Venmo</p>
                  <p className="text-xl font-semibold text-primary group-hover:text-accent transition-colors">
                    @ShaneJ-Charbonnet
                  </p>
                </div>
              </div>

              {/* Decorative corner accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/50 rounded-tl-xl" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary/50 rounded-br-xl" />
            </div>
          </a>

          {/* Cash App Card */}
          <a
            href="https://cash.app/$DrShaneJaycee"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block"
          >
            <div className="relative overflow-hidden rounded-xl border-2 border-primary/30 bg-card/50 backdrop-blur-sm p-6 transition-all duration-300 hover:border-primary hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:scale-[1.02]">
              {/* Golden glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                {/* Cash App Image */}
                <div className="mb-4 rounded-lg overflow-hidden border border-border/50">
                  <img
                    src="/assets/CASHAPP-Image.jpg"
                    alt="Cash App QR Code"
                    className="w-full h-auto"
                  />
                </div>

                {/* Cash App Handle */}
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Cash App</p>
                  <p className="text-xl font-semibold text-primary group-hover:text-accent transition-colors">
                    $DrShaneJaycee
                  </p>
                </div>
              </div>

              {/* Decorative corner accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/50 rounded-tl-xl" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary/50 rounded-br-xl" />
            </div>
          </a>
        </div>

        {/* Additional Message */}
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground italic">
            Thank you for your support and contribution to advancing knowledge and innovation.
          </p>
        </div>
      </div>
    </section>
  );
}
