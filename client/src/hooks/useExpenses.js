import { useEffect, useState } from "react";
import { getExpenses } from "../services/expenseApi";

const useExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refreshExpenses = async () => {
    try {
      setLoading(true);

      const result = await getExpenses();

      setExpenses(result.data);
      setError("");
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to load expenses."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;

    const loadExpenses = async () => {
      try {
        const result = await getExpenses();

        if (!ignore) {
          setExpenses(result.data);
          setError("");
        }
      } catch (err) {
        if (!ignore) {
          setError(
            err.response?.data?.message || "Unable to load expenses."
          );
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadExpenses();

    return () => {
      ignore = true;
    };
  }, []);

  return {
    expenses,
    loading,
    error,
    refreshExpenses,
  };
};

export default useExpenses;