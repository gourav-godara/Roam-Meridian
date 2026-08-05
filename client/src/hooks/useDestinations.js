import { useEffect, useState } from "react";
import { getAllDestinations } from "../services/destinationApi";

export default function useDestinations() {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await getAllDestinations();
      setDestinations(res.data.data);
    }

    load();
  }, []);

  return destinations;
}