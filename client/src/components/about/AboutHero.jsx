import heroImage from "../../assets/about-hero.jpg";

function AboutHero() {
  return (
    <section className="relative -mt-24 h-[102vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 rounded-b-[20px] overflow-hidden">
        <img
          src={heroImage}
          alt="Traveler overlooking a scenic landscape"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-black/30" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12 w-full py-24">
        <div className="max-w-2xl">
          <h1 className="font-display text-4xl sm:text-6xl text-white leading-[1.1]">
            Travel should inspire you, not overwhelm you.
          </h1>
          <p className="text-white/80 text-lg mt-6 max-w-xl leading-relaxed">
            Planning a trip shouldn't mean forty open tabs, conflicting advice,
            and losing your excitement before you've even booked a ticket. Roam
            Meridian brings discovery and planning into one place — so the only
            thing left to do is go.
          </p>
          
        </div>
      </div>
    </section>
  );
}

export default AboutHero;
