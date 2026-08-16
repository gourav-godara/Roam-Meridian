// One-time fix-up script.
//
// The original seed data (server/seed/destinations.js) shipped with
// fabricated placeholder ratings (e.g. 4.8 stars / 5420 reviews) on every
// destination, regardless of whether any real reviews existed. The
// review-write flow (review.service.js's syncDestinationRating) has
// always correctly recalculated a destination's rating whenever a real
// review is created/updated/deleted — but that only touches destinations
// someone has actually reviewed. Everything else on a live database
// that's never been reviewed is still showing the original fake numbers.
//
// This script recomputes EVERY destination's rating from its real
// reviews, in place — same aggregation syncDestinationRating already
// uses. Destinations with real reviews get their correct real
// average/count (should be a no-op if syncDestinationRating has already
// been keeping them current). Destinations with zero reviews get reset
// to average: 0, count: 0.
//
// This is intentionally NOT the same as re-running the full seed script
// — it does not delete or recreate any destinations, does not touch
// images/description/location, and does not affect review documents or
// their destination references in any way. It only updates the `rating`
// field.
//
// Run once with: node seed/fixDestinationRatings.js

require("dotenv").config();

const connectDB = require("../src/config/db");
const Destination = require("../src/models/Destination");
const Review = require("../src/models/review.model");

async function fixDestinationRatings() {
  try {
    await connectDB();

    const destinations = await Destination.find().select("_id name");

    console.log(`Found ${destinations.length} destinations. Recomputing ratings...`);

    let updated = 0;
    let withReviews = 0;

    for (const destination of destinations) {
      const [result] = await Review.aggregate([
        { $match: { destination: destination._id } },
        {
          $group: {
            _id: null,
            averageRating: { $avg: "$rating" },
            totalReviews: { $sum: 1 },
          },
        },
      ]);

      const newAverage = result ? Number(result.averageRating.toFixed(1)) : 0;
      const newCount = result ? result.totalReviews : 0;

      await Destination.findByIdAndUpdate(destination._id, {
        "rating.average": newAverage,
        "rating.count": newCount,
      });

      updated += 1;
      if (newCount > 0) withReviews += 1;

      console.log(
        `  ${destination.name}: average=${newAverage}, count=${newCount}`
      );
    }

    console.log(`\n✅ Updated ${updated} destinations.`);
    console.log(`   ${withReviews} have real reviews.`);
    console.log(`   ${updated - withReviews} reset to 0 rating / 0 reviews.`);

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

fixDestinationRatings();