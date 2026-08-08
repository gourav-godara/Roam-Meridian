require("dotenv").config();

const connectDB = require("../src/config/db");
const Destination = require("../src/models/Destination");
const User = require("../src/models/user.model");
const Itinerary = require("../src/models/itinerary.model");

const { getDestinationImages } = require("../src/services/pexels.service");

const itineraries = require("./itineraries");

const seedItineraries = async () => {
    try {
        await connectDB();

        // Every itinerary needs a createdBy admin.
        const adminUser = await User.findOne({ role: "admin" });

        if (!adminUser) {
            console.error(
                "❌ No admin user found. Create/promote an admin account first."
            );

            process.exit(1);
        }

        console.log("🗑 Clearing old itineraries...");
        await Itinerary.deleteMany({});

        console.log("🔗 Matching itineraries to destinations...");

        const toInsert = [];
        const skipped = [];

        for (const entry of itineraries) {

            // --------------------------------------------------
            // FIND DESTINATION
            // --------------------------------------------------

            const destinationDoc = await Destination.findOne({
                name: {
                    $regex: `^${entry.destinationName}$`,
                    $options: "i",
                },
            });

            if (!destinationDoc) {
                skipped.push(entry.destinationName);
                continue;
            }

            console.log(
                `\n📸 Fetching Pexels images for ${destinationDoc.name}...`
            );

            // --------------------------------------------------
            // FETCH IMAGES FROM PEXELS
            // --------------------------------------------------

            const images = await getDestinationImages(
                destinationDoc.name,
                10
            );

            console.log(
                `   Found ${images.length} images`
            );

            // --------------------------------------------------
            // CREATE COPY OF ENTRY
            // --------------------------------------------------

            const itinerary = {
                ...entry,

                destination: destinationDoc._id,

                destinationName: destinationDoc.name,

                createdBy: adminUser._id,
            };

            // --------------------------------------------------
            // SET COVER IMAGE
            // --------------------------------------------------

            if (images.length > 0) {
                itinerary.coverImage = images[0];
            }

            // --------------------------------------------------
            // SET DAY IMAGES
            // --------------------------------------------------

            if (itinerary.days && itinerary.days.length > 0) {

                itinerary.days = itinerary.days.map(
                    (day, index) => {

                        if (images.length > 0) {
                            return {
                                ...day,

                                image:
                                    images[
                                        index % images.length
                                    ],
                            };
                        }

                        return day;
                    }
                );
            }

            // --------------------------------------------------
            // ADD TO INSERT ARRAY
            // --------------------------------------------------

            toInsert.push(itinerary);
        }

        // ------------------------------------------------------
        // INSERT INTO DATABASE
        // ------------------------------------------------------

        if (toInsert.length > 0) {

            console.log(
                `\n📍 Inserting ${toInsert.length} itineraries...`
            );

            await Itinerary.insertMany(toInsert);
        }

        // ------------------------------------------------------
        // SKIPPED DESTINATIONS
        // ------------------------------------------------------

        if (skipped.length > 0) {

            console.warn(
                `\n⚠️ Skipped ${skipped.length} itinerary entries — no matching destination found for: ${skipped.join(
                    ", "
                )}`
            );

            console.warn(
                "   Run seedDestinations.js first, or check spelling against destinations.js."
            );
        }

        console.log(
            `\n✅ Successfully inserted ${toInsert.length} itineraries`
        );

        process.exit(0);

    } catch (err) {

        console.error(
            "\n❌ Itinerary seeding failed:"
        );

        console.error(err);

        process.exit(1);
    }
};

seedItineraries();