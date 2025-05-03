import React, { useEffect, useState } from "react";
import Table from "../component/Table";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import SearchBar from "../component/SearchBar";
import useAPi from "../hooks/useApi";

export default function Dashboard() {
  const { user } = useAuth();
  const { data, loading, error, filterData, setFilterData } = useAPi();

  const [query, setQuery] = useState("");

  let debounceTimeout;

  if (!user)
    return (
      <div>
        <Navigate to="/login" />
      </div>
    );
  if (loading) return <p>Loading ...</p>;
  if (error) return <p>{error}</p>;

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    debounceTimeout = setTimeout(() => {
      filteredData(e.target.value);
    }, 1500);
  };

  const filteredData = (query) => {
    if (!query.toLowerCase().trim()) {
      setFilterData(data);
      return;
    }
    const filtered = data.filter((item) => {
      return item.currency.toLowerCase().includes(query.toLowerCase().trim());
    });

    setFilterData(filtered);
  };

  const handleSort = (order) => {
    const sortedData = [...filterData].sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0); // Fallback to epoch if missing
      const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);

      if (order === "asc") {
        return dateA - dateB;
      } else if (order === "desc") {
        return dateB - dateA;
      }
      return 0;
    });

    setFilterData(sortedData);
  };
  return (
    <>
      <div className="m-8">
        <div className="mb-4 text-violet-400 font-bold">
          Welcome to the Dashboard
        </div>

        <div className="relative overflow-x-auto  sm:rounded-xl">
          {/* SEARCH */}
          <SearchBar value={query} onChange={handleInputChange} />

          <Table info={filterData} rowsPerPage={20} Sort={handleSort} />
        </div>
      </div>
    </>
  );
}
