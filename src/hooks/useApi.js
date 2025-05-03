import axios from "axios";
import { useEffect, useState } from "react";

const useAPi = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    setLoading(true); // Start loading
    setError(null); // Clear previous errors

    axios
      .get("https://api.aliramshini.com/api/coin/")
      .then((response) => {
        const coins = response.data.coins || [];
        setData(coins);
        setFilterData(coins);
        setLoading(false);
        setLoading(false);
      })

      .catch((error) => {
        setError(error.message || "Error fetching data");
        setLoading(false);
      });
  }, []);

  return { data, filterData, setFilterData, error, loading };
};

export default useAPi;
