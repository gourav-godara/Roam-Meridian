import { GoogleOAuthProvider } from "@react-oauth/google";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ToastProvider } from "./context/ToastContext.jsx";
import "./index.css";
import "leaflet/dist/leaflet.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider
      clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
    >
      <AuthProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);

// Remove the static boot splash (from index.html) once React has
// mounted and painted. A short delay lets the app's first paint
// settle so the fade-out feels intentional rather than abrupt.
const splash = document.getElementById("initial-splash");
if (splash) {
  requestAnimationFrame(() => {
    setTimeout(() => {
      splash.classList.add("splash-hidden");
      setTimeout(() => splash.remove(), 450);
    }, 300);
  });
}
