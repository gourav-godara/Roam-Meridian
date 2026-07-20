import visionImage from "../../assets/about-vision.jpg";

function VisionSection() {
  return (
    <section className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-10 pb-10 sm:pt-12 sm:pb-14">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div>
          <p className="text-forest font-semibold text-sm tracking-wide uppercase mb-4">
            Our Vision
          </p>
          <h2 className="font-display text-3xl sm:text-4xl text-ink leading-tight mb-6">
            This is just the beginning of how people plan travel.
          </h2>
          <div className="flex flex-col gap-4 text-body text-muted leading-relaxed">
            <p>
              We're building toward smarter AI that understands not just where you want
              to go, but how you actually like to travel — season after season, trip
              after trip.
            </p>
            <p>
              More destinations, better recommendations, and a platform that gets more
              useful the more you use it — not another app you open once and forget.
            </p>
            <p>
              Our goal isn't just to help you plan a trip. It's to become the travel
              companion people always wished they had.
            </p>
          </div>
        </div>

        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
          <img src={visionImage} alt="Forward-looking travel scene" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-forest/10 flex items-center justify-center">
          </div>
        </div>
      </div>
    </section>
  );
}

export default VisionSection;
