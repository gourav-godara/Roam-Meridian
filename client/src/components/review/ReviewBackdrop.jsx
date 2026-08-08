import { motion } from "framer-motion";

/**
 * Layered, ambient backdrop for the Review page.
 * - a soft warm gradient wash
 * - large slow-drifting color blobs (forest / gold) for depth
 * - a faint dot-grid texture so the page doesn't feel flat
 * - a few floating star glyphs that idle up and down
 *
 * Everything here is purely decorative (pointer-events disabled) and
 * sits behind the page content via negative z-index + fixed position.
 */
const ReviewBackdrop = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#FAFAF8] pointer-events-none">
      {/* base gradient wash */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F3F1E9] via-[#FAFAF8] to-[#F6F4EE]" />

      {/* dot grid texture */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(44,70,58,0.14) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />

      {/* big forest blob, top-right */}
      <motion.div
        className="absolute -top-40 -right-40 w-[560px] h-[560px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(44,70,58,0.22) 0%, rgba(44,70,58,0) 70%)",
        }}
        animate={{
          x: [0, 40, -20, 0],
          y: [0, 30, -10, 0],
          scale: [1, 1.08, 0.98, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* gold blob, mid-left */}
      <motion.div
        className="absolute top-1/3 -left-52 w-[480px] h-[480px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(200,155,60,0.20) 0%, rgba(200,155,60,0) 70%)",
        }}
        animate={{
          x: [0, 30, -15, 0],
          y: [0, -25, 15, 0],
          scale: [1, 0.95, 1.06, 1],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* small forest blob, bottom-right */}
      <motion.div
        className="absolute bottom-0 right-1/4 w-[360px] h-[360px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(44,70,58,0.16) 0%, rgba(44,70,58,0) 70%)",
        }}
        animate={{
          x: [0, -25, 20, 0],
          y: [0, 20, -10, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* floating star glyphs for a little life */}
      {[
        { top: "18%", left: "8%", size: 14, delay: 0, dur: 6 },
        { top: "62%", left: "88%", size: 10, delay: 1.2, dur: 7 },
        { top: "40%", left: "92%", size: 8, delay: 0.6, dur: 5.5 },
        { top: "78%", left: "14%", size: 12, delay: 2, dur: 6.5 },
        { top: "10%", left: "70%", size: 9, delay: 1.6, dur: 5 },
      ].map((star, i) => (
        <motion.span
          key={i}
          className="absolute text-gold/40"
          style={{ top: star.top, left: star.left, fontSize: star.size }}
          animate={{
            y: [0, -14, 0],
            opacity: [0.25, 0.6, 0.25],
            rotate: [0, 15, 0],
          }}
          transition={{
            duration: star.dur,
            repeat: Infinity,
            ease: "easeInOut",
            delay: star.delay,
          }}
        >
          ✦
        </motion.span>
      ))}

      {/* subtle vignette so content stays legible at the edges */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAF8] via-transparent to-transparent" />
    </div>
  );
};

export default ReviewBackdrop;