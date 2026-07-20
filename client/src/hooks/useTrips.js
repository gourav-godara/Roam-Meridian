import { useEffect, useState } from "react";
import { getTrips } from "../services/tripApi";

export default function useTrips() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTrips() {
      try {
        const data = await getTrips();
        setTrips(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchTrips();
  }, []);

  return { trips, loading };
}