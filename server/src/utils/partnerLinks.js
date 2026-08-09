// Builds the URL to send a user to a real travel-booking partner.
//
// IMPORTANT — read before "improving" this file:
// None of MakeMyTrip, IRCTC, or RedBus publish a documented, stable
// public URL format for pre-filling a search (the patterns you'll find
// in blog posts/scrapers are reverse-engineered, undocumented, and can
// change or break at any time — several were checked before writing
// this and are not something to rely on for a real product, let alone
// a live demo). Rather than gamble on a fragile guessed URL, this sends
// the user to the partner's real, stable homepage/search entry point,
// where they search using the same route/date themselves. This mirrors
// how large aggregators (including Incredible India's own "Book Now"
// links) actually work — an outbound link to the real partner, not a
// magic pre-filled deep link into a private API.
//
// Zoomcar is the one exception: it accepts city name as a query param
// on its public marketing pages in a documented, stable way (used by
// its own site navigation), so that one is safely prefillable.

const PARTNERS = {
  flight: {
    key: "makemytrip",
    name: "MakeMyTrip",
    baseUrl: "https://www.makemytrip.com/",
  },
  train: {
    key: "irctc",
    name: "IRCTC",
    baseUrl: "https://www.irctc.co.in/nget/train-search",
  },
  bus: {
    key: "redbus",
    name: "RedBus",
    baseUrl: "https://www.redbus.in/",
  },
  car: {
    key: "zoomcar",
    name: "Zoomcar",
    baseUrl: "https://www.zoomcar.com/",
  },
};

function getPartnerInfo(mode) {
  return PARTNERS[mode] || null;
}

function buildPartnerUrl({ mode, origin, destination, date }) {
  const partner = PARTNERS[mode];
  if (!partner) return null;

  // Only Zoomcar's public city-search page has a stable, documented
  // query param — everything else lands on the real homepage where the
  // user completes the search themselves with the same details.
  if (mode === "car" && origin) {
    const params = new URLSearchParams({ city: origin });
    return `${partner.baseUrl}search?${params.toString()}`;
  }

  return partner.baseUrl;
}

module.exports = { getPartnerInfo, buildPartnerUrl, PARTNERS };
