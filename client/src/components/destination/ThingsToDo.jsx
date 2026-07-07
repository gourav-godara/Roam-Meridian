import { motion } from "framer-motion";

function ThingsToDo({ items }) {
  return (
    <div className="mt-10">
      <h3 className="text-base font-semibold text-ink mb-4">Things to Do</h3>
      <div className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1">
        {items.map((item) => (
          <motion.article
            key={item.id}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-md cursor-pointer shrink-0 w-48"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-3.5">
              <h4 className="text-sm font-semibold text-ink truncate">{item.title}</h4>
              <p className="text-xs text-gray-500 mt-0.5">{item.duration}</p>
              <p className="text-sm font-semibold text-forest mt-1.5">{item.price}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}

export default ThingsToDo;
