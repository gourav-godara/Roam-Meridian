import { motion } from "framer-motion";

function TypingIndicator() {
  return (
    <div className="flex gap-1.5 items-center px-4 py-3 bg-white border border-border rounded-2xl w-fit">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-2 h-2 rounded-full bg-forest/50"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  );
}

export default TypingIndicator;
