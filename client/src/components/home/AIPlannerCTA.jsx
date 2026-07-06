import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import Button from "../common/Button";
import plannerLogo from "../../assets/planner-logo.png";

function AIPlannerCTA() {
  return (
    <section className="max-w-[1440px] mx-auto px-6 lg:px-12 pb-16">
      <div className="bg-bg rounded-3xl p-8 flex items-center justify-between gap-6 flex-wrap">
        <div className="flex items-center gap-5">
          <img
            src={plannerLogo}
            alt="AI Planner"
            className="w-20 h-auto object-contain shrink-0"
          />
          <div>
            <h3 className="font-display text-h4 text-ink">Plan smarter with AI</h3>
            <p className="text-body text-muted mt-1 max-w-md">
              Tell us your preferences and our AI will craft the perfect itinerary for you.
            </p>
          </div>
        </div>

        <Link to="/planner">
          <Button variant="primary" rightIcon={FiArrowRight}>
            Try AI Planner
          </Button>
        </Link>
      </div>
    </section>
  );
}

export default AIPlannerCTA;
