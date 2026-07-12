import { createContext, useCallback, useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiCheckCircle, FiXCircle, FiInfo } from "react-icons/fi";

const ToastContext = createContext(null);

const ICONS = { success: FiCheckCircle, error: FiXCircle, info: FiInfo };
const COLORS = { success: "text-forest", error: "text-red-600", info: "text-ink" };

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = "info") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3500);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-5 right-5 z-[200] flex flex-col gap-2">
        <AnimatePresence>
          {toasts.map((toast) => {
            const Icon = ICONS[toast.type];
            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, y: 12, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex items-center gap-2.5 bg-white border border-border rounded-2xl shadow-lg px-4 py-3 min-w-[240px]"
              >
                <Icon size={18} className={COLORS[toast.type]} />
                <span className="text-sm text-ink">{toast.message}</span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
