import { motion } from "framer-motion";

const StatCard = ({
  title,
  value,
  icon,
  subtitle,
  gradient,
  trend,
}) => {
  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.03,
      }}
      transition={{ duration: 0.3 }}
      className="
        w-full
        relative
        overflow-hidden
        rounded-[28px]
        bg-white/10
        backdrop-blur-xl
        border border-white/10
        shadow-2xl
        p-7
      "
    >
      {/* Background Glow */}
      <div
        className={`absolute -top-12 -right-12 h-40 w-40 rounded-full bg-gradient-to-br ${gradient} opacity-20 blur-3xl`}
      />

      <div className="relative z-10">

        <div
          className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-xl`}
        >
          <div className="text-3xl">
  {icon}
</div>
        </div>

        <p className="text-slate-300 mt-6 text-sm">
          {title}
        </p>

        <h2 className="text-white text-4xl font-bold mt-2">
          {value}
        </h2>

        <p className="text-emerald-300 text-sm mt-2">
          ▲ {trend} this month
        </p>

        <div className="mt-6 border-t border-white/10 pt-4">
          <p className="text-slate-400 text-sm">
            {subtitle}
          </p>
        </div>

      </div>
    </motion.div>
  );
};

export default StatCard;