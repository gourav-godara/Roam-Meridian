import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import Button from "../common/Button";
import plannerLogo from "../../assets/planner-logo.png";

function AIPlannerCTA() {
  return (
    <section className="max-w-[1440px] mx-auto px-6 lg:px-12 pb-16 sm:pb-24">
      <div className="rounded-[2rem] border border-border bg-white shadow-sm p-6 sm:p-10 flex flex-col sm:flex-row items-center sm:items-center justify-between gap-6 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row items-center gap-5">
          <img
            src={plannerLogo}
            alt="AI Planner"
            className="w-16 sm:w-20 h-auto object-contain shrink-0"
          />
          <div>
            <h3 className="font-display text-h4 text-ink">Plan smarter with AI</h3>
            <p className="text-body text-muted mt-1 max-w-md">
              Tell us your preferences and our AI will craft the perfect itinerary for you.
            </p>
          </div>
        </div>

        <Link to="/planner" className="w-full sm:w-auto">
          <Button variant="primary" rightIcon={FiArrowRight} className="w-full sm:w-auto">
            Try AI Planner
          </Button>
        </Link>
      </div>
    </section>
  );
}

export default AIPlannerCTA;
