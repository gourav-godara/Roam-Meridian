import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { FiStar, FiMessageCircle, FiHeart, FiCamera } from "react-icons/fi";

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Animated numeric counter — counts up from 0 to `value` on mount. */
const Counter = ({ value, decimals = 0 }) => {
  const isNumeric = !Number.isNaN(Number(value));
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (v) =>
    decimals > 0 ? v.toFixed(decimals) : Math.round(v).toLocaleString()
  );
  const [display, setDisplay] = useState(decimals > 0 ? "0.0" : "0");

  useEffect(() => {
    if (!isNumeric) return;
    const controls = animate(motionVal, Number(value), {
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1],
    });
    const unsub = rounded.on("change", (v) => setDisplay(v));
    return () => {
      controls.stop();
      unsub();
    };
  }, [value, isNumeric]); // eslint-disable-line react-hooks/exhaustive-deps

  return <>{isNumeric ? display : value}</>;
};

const ReviewStats = ({ reviews = [] }) => {
  const totalReviews = reviews.length;

  const averageRating =
    totalReviews > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
      : 0;

  const totalLikes = reviews.reduce((sum, r) => sum + (r.likes || 0), 0);
  const reviewsWithPhotos = reviews.filter((r) => r.images?.length > 0).length;

  const stats = [
    {
      title: "Average Rating",
      value: averageRating,
      decimals: 1,
      icon: FiStar,
      accent: "text-gold",
      glow: "rgba(200,155,60,0.18)",
    },
    {
      title: "Total Reviews",
      value: totalReviews,
      icon: FiMessageCircle,
      accent: "text-forest",
      glow: "rgba(44,70,58,0.16)",
    },
    {
      title: "Total Likes",
      value: totalLikes,
      icon: FiHeart,
      accent: "text-rose-500",
      glow: "rgba(244,63,94,0.14)",
    },
    {
      title: "With Photos",
      value: reviewsWithPhotos,
      icon: FiCamera,
      accent: "text-forest",
      glow: "rgba(44,70,58,0.16)",
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
    >
      {stats.map(({ title, value, decimals, icon: Icon, accent, glow }) => (
        <motion.div
          key={title}
          variants={cardVariants}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-border p-5 overflow-hidden group shadow-sm hover:shadow-lg transition-shadow duration-300"
        >
          <div
            className="absolute -top-10 -right-10 w-28 h-28 rounded-full opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500"
            style={{ background: glow }}
          />

          <motion.div
            whileHover={{ rotate: [0, -8, 8, 0] }}
            transition={{ duration: 0.5 }}
            className="relative w-11 h-11 rounded-xl bg-forest/10 flex items-center justify-center mb-4"
          >
            <Icon size={19} className={accent} />
          </motion.div>

          <p className="relative text-xs text-gray-500">{title}</p>
          <h2 className="relative text-2xl font-semibold text-ink mt-1 font-display tabular-nums">
            <Counter value={value} decimals={decimals} />
          </h2>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ReviewStats;