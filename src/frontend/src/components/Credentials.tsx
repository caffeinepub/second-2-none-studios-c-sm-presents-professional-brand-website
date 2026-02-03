export default function Credentials() {
  return (
    <section className="py-16 bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 mb-4 glow-text">
            Credentials
          </h2>
          <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-amber-500 to-transparent rounded-full" />
        </div>

        {/* Diploma Images */}
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Ph.D. Diploma */}
          <div className="text-center space-y-6">
            <h3 className="text-2xl md:text-3xl font-serif text-amber-300 leading-relaxed">
              Ph.D. Diploma
            </h3>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-500" />
              <div className="relative bg-background/80 backdrop-blur-sm rounded-lg p-4 border border-amber-500/30 shadow-2xl">
                <img
                  src="/assets/fit_01.24.26.png"
                  alt="Ph.D. Diploma - Dr. Shane J Charbonnet"
                  className="w-full h-auto rounded-md shadow-lg"
                />
              </div>
            </div>
          </div>

          {/* Master's Diploma */}
          <div className="text-center space-y-6">
            <h3 className="text-2xl md:text-3xl font-serif text-amber-300 leading-relaxed">
              Master's Diploma
            </h3>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-500" />
              <div className="relative bg-background/80 backdrop-blur-sm rounded-lg p-4 border border-amber-500/30 shadow-2xl">
                <img
                  src="/assets/dbu_01.24.26.jpg"
                  alt="Master's Diploma - Dr. Shane J Charbonnet"
                  className="w-full h-auto rounded-md shadow-lg"
                />
              </div>
            </div>
          </div>

          {/* Single blank line spacing */}
          <div className="h-8" />

          {/* Portrait Image */}
          <div className="text-center space-y-6">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-500" />
              <div className="relative bg-background/80 backdrop-blur-sm rounded-lg p-4 border border-amber-500/30 shadow-2xl">
                <img
                  src="/assets/sjc_1.13.26b.jpg"
                  alt="Dr. Shane J Charbonnet Portrait"
                  className="w-full h-auto rounded-md shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
