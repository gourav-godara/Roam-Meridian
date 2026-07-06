import { useEffect, useState } from "react"; // Imports React state hooks.
import { getDashboard } from "../services/dashboardApi"; // Imports the API network caller function.

const useDashboard = () => {
  const [dashboard, setDashboard] = useState(null); // State to store the actual dashboard data.
  const [loading, setLoading] = useState(true); // State tracking if the page is currently fetching data.
  const [error, setError] = useState(""); // State storing text errors if something fails.

  // A manual refresh function you can trigger later to reload your data (e.g. pulled down to refresh)
  const refreshDashboard = async () => {
    try {
      setLoading(true); // Set screen state to loading.
      const result = await getDashboard(); // Trigger API pull.
      setDashboard(result.data); // Update data state.
      setError(""); // Reset error to blank.
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load dashboard."); // Capture error text.
    } finally {
      setLoading(false); // Stop loading animation.
    }
  };

  useEffect(() => { // React lifecycle mechanism; runs automatically when this component mounts onto the screen.
    let ignore = false; // "Ignore flag" – highly advanced trick preventing data state collision if the user clicks away instantly.

    const loadDashboard = async () => {
      try {
        const result = await getDashboard(); // Fetch data.
        if (!ignore) { // If the user hasn't abandoned the page yet...
          setDashboard(result.data); // ...save data to state.
          setError("");
        }
      } catch (err) {
        if (!ignore) {
          setError(err.response?.data?.message || "Unable to load dashboard.");
        }
      } finally {
        if (!ignore) {
          setLoading(false); // Finished loading.
        }
      }
    };

    loadDashboard(); // Fires up the local loader function defined right above.

    return () => {
      ignore = true; // Clean-up phase. If user navigates away, mark ignore as true so state updates abort.
    };
  }, []); // Empty brackets mean this logic triggers exactly ONCE when the component first loads.

  return { dashboard, loading, error, refreshDashboard }; // Returns all elements to any view page requesting it.
};

export default useDashboard;