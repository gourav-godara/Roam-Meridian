import worldMap from "../../assets/world-map.png";

/**
 * PageBackdrop — ambient background used across the app.
 *
 * This deliberately reuses the site's own existing signature move (first
 * used on the Expenses page): the low-poly world-map illustration, tinted
 * into the brand's forest/gold palette with a CSS filter, faded in at the
 * edges, sitting in a corner behind the page's normal white cards. That's
 * already Roam Meridian's visual language — real destination photography
 * on marketing pages, plain white cards everywhere else — so this extends
 * the one motif the app already uses for "ambient texture" rather than
 * introducing a new illustration style.
 *
 * Each page group gets the same map, tinted forest or gold, at a
 * different size/corner/opacity, so it doesn't feel identical on every
 * screen while staying visibly the same idea throughout the app.
 *
 * Every variant is fixed + inset-0 + -z-10 + pointer-events-none, so it
 * never affects layout, scroll, or clicks — and every page's real content
 * still sits in the app's existing white/bg-surface cards, which is what
 * keeps text fully legible against a backdrop that's actually visible.
 */

const FOREST_FILTER = "sepia(1) saturate(2) hue-rotate(60deg) brightness(0.55)";
const GOLD_FILTER = "sepia(1) saturate(4) hue-rotate(5deg) brightness(0.9)";

const MapLayer = ({
  filter,
  opacity,
  className,
  style,
}) => (
  <div
    className={`absolute pointer-events-none ${className}`}
    style={{ opacity, filter, ...style }}
  >
    <img src={worldMap} alt="" className="w-full h-auto" />
  </div>
);

/* ---------------------------------------------------------------------- */
/* discovery — Explore, Destination, Blogs, About, Contact, ItineraryGuide */
/* Map anchored top-right, forest tint — the exact treatment already used */
/* on Expenses, just brought to the rest of the browsing pages.           */
/* ---------------------------------------------------------------------- */
const DiscoveryBackdrop = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-bg">
    <MapLayer
      filter={FOREST_FILTER}
      opacity={0.26}
      className="top-0 right-0 w-[75vw] max-w-[1000px]"
    />
    <MapLayer
      filter={GOLD_FILTER}
      opacity={0.16}
      className="bottom-0 left-0 w-[45vw] max-w-[600px] scale-x-[-1]"
      style={{ transform: "translate(-15%, 20%) scaleX(-1)" }}
    />
  </div>
);

/* ---------------------------------------------------------------------- */
/* app — Dashboard, Itineraries, Trips, Expenses, Reviews, Profile,        */
/* AIPlanner, Wishlist, TravelBooking. Map anchored bottom-left this time  */
/* so it sits behind sidebars/panels rather than under a page header.     */
/* ---------------------------------------------------------------------- */
const AppBackdrop = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-bg">
    <MapLayer
      filter={FOREST_FILTER}
      opacity={0.24}
      className="bottom-[-10%] left-[-10%] w-[65vw] max-w-[850px]"
    />
    <MapLayer
      filter={GOLD_FILTER}
      opacity={0.15}
      className="top-[-8%] right-[-8%] w-[40vw] max-w-[500px]"
    />
  </div>
);

/* ---------------------------------------------------------------------- */
/* auth — Login, Signup, VerifyOtp, CreateAccount, ForgotPassword. Map     */
/* centered and a little bolder, since the form card is the only other    */
/* thing on the page and there's room for one clear signature moment.     */
/* ---------------------------------------------------------------------- */
const AuthBackdrop = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-bg">
    <MapLayer
      filter={FOREST_FILTER}
      opacity={0.3}
      className="top-1/2 left-1/2 w-[85vw] max-w-[1100px]"
      style={{ transform: "translate(-50%, -50%)" }}
    />
  </div>
);

/* ---------------------------------------------------------------------- */
/* admin — same map, pulled far into the corner and very faint, since      */
/* dense data tables need calm over atmosphere.                          */
/* ---------------------------------------------------------------------- */
const AdminBackdrop = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-bg">
    <MapLayer
      filter={FOREST_FILTER}
      opacity={0.12}
      className="top-0 right-0 w-[50vw] max-w-[650px]"
    />
  </div>
);

/* ---------------------------------------------------------------------- */
/* lost — NotFound. Map centered and desaturated toward gold, like a      */
/* faded chart.                                                          */
/* ---------------------------------------------------------------------- */
const LostBackdrop = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-bg">
    <MapLayer
      filter={GOLD_FILTER}
      opacity={0.22}
      className="top-1/2 left-1/2 w-[70vw] max-w-[900px]"
      style={{ transform: "translate(-50%, -50%)" }}
    />
  </div>
);

const VARIANTS = {
  discovery: DiscoveryBackdrop,
  app: AppBackdrop,
  auth: AuthBackdrop,
  admin: AdminBackdrop,
  lost: LostBackdrop,
};

const PageBackdrop = ({ variant = "app" }) => {
  const Backdrop = VARIANTS[variant] || VARIANTS.app;
  return <Backdrop />;
};

export default PageBackdrop;