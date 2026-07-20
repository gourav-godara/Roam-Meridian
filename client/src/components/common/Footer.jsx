import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const exploreLinks = [
  { name: "Explore", path: "/explore" },
  { name: "Planner", path: "/planner" },
  { name: "Trips", path: "/itineraries" },
];

const companyLinks = [
  { name: "About Us", path: "/about" },
];

const supportLinks = [
  "Help Center",
  "FAQs",
  "Privacy Policy",
  "Terms & Conditions",
];

function Footer() {
  return (
    <footer className="border-t border-border bg-[#FFFFFF]">
      <div className="max-w-360 mx-auto px-8 lg:px-12 py-8">

        <div className="flex flex-col lg:flex-row justify-between gap-16">

          {/* Left Section */}
          <div className="max-w-sm">
            <div className="flex items-center gap-4">
              <img
                src={logo}
                alt="Roam Meridian"
                className="w-16 h-auto"
              />

              <h2 className="font-display text-3xl font-semibold text-ink">
                Roam Meridian
              </h2>
            </div>

            <p className="mt-4 text-gray-600 leading-8 text-base">
              Discover unforgettable journeys with AI-powered travel
              planning, personalized itineraries, weather insights, and
              seamless trip management—all in one place.
            </p>
          </div>

          {/* Right Section */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12">

            {/* Explore */}
            <div>
              <h3 className="font-display text-lg font-semibold text-ink mb-5">
                Explore
              </h3>

              <ul className="space-y-3">
                {exploreLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-gray-600 hover:text-forest transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-display text-lg font-semibold text-ink mb-5">
                Company
              </h3>

              <ul className="space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-gray-600 hover:text-forest transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-display text-lg font-semibold text-ink mb-5">
                Support
              </h3>

              <ul className="space-y-3">
                {supportLinks.map((link) => (
                  <li
                    key={link}
                    className="text-gray-600 hover:text-forest cursor-pointer transition-colors"
                  >
                    {link}
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

        <hr className="my-8 border-gray-300" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600">

          <p>
            © {new Date().getFullYear()} Roam Meridian. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <span className="hover:text-forest cursor-pointer transition-colors">
              Privacy Policy
            </span>

            <span className="hover:text-forest cursor-pointer transition-colors">
              Terms of Service
            </span>

            <span className="hover:text-forest cursor-pointer transition-colors">
              Contact
            </span>
          </div>

        </div>

      </div>
    </footer>
  );
}

export default Footer;
