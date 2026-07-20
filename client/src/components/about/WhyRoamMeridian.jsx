import storyImage from "../../assets/about-story.jpg";

function WhyRoamMeridian() {
  return (
    <section className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-20 pb-10 sm:pt-24 sm:pb-12">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden order-2 lg:order-1">
          <img src={storyImage} alt="Traveler planning a trip" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-mist flex items-center justify-center">
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <p className="text-forest font-semibold text-sm tracking-wide uppercase mb-4">
            Why We Exist
          </p>
          <h2 className="font-display text-3xl sm:text-4xl text-ink leading-tight mb-6">
            Every trip starts with excitement. Planning shouldn't kill it.
          </h2>
          <div className="flex flex-col gap-4 text-body text-muted leading-relaxed">
            <p>
              Most people spend hours comparing hundreds of blogs, forum threads, and
              outdated guides before they even know where they're going — let alone
              what to do once they get there.
            </p>
            <p>
              Somewhere between the tenth open tab and the third conflicting
              recommendation, the excitement fades into fatigue. The trip becomes a
              spreadsheet before it becomes a memory.
            </p>
            <p>
              Roam Meridian exists to bring discovery, planning, and inspiration back
              into one experience — so you spend your energy imagining the trip, not
              assembling it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyRoamMeridian;
