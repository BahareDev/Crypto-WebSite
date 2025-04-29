import React, { useEffect, useState } from "react";
import useTable from "../hooks/useTable";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { Link } from "react-router";

export default function Table({ info, rowsPerPage }) {
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(info, page, rowsPerPage);

  const { user } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://api.aliramshini.com/api/coin/")
      .then((response) => {
        setData(response.data.coins);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (!user)
    return (
      <div>
        <Navigate to="/login" />
      </div>
    );
  if (loading) return <p>Loading ...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          {/* HEADER table */}
          <tr>
            <th scope="col" className="px-2 py-3">
              <div className="flex items-center">
                currency
                <a href="#">
                  <svg
                    className="w-3 h-3 ms-1.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                  </svg>
                </a>
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              provider
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
            <th scope="col" className="px-6 py-3">
              TradeEnabled
            </th>
            <th scope="col" className="px-6 py-3">
              SellEnable
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={item._id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                <Link to={`/detail/${item._id}`}>
                  <span className="underline ">{item.currency}</span>
                </Link>
              </th>

              <td className="px-6 py-4">{item.provider}</td>
              <td className="px-6 py-4">{item.symbol}</td>
              <td className="px-6 py-4">{item.fullname}</td>
              <td className="px-6 py-4">{item.tradeEnabled ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <TableFooter range={range} setPage={setPage} page={page} slice={slice} />
    </div>
  );
}

const TableFooter = ({ range, setPage, page, slice }) => {
  useEffect(() => {
    if (slice.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [slice, page, setPage]);

  return (
    <div>
      {range.map((el, index) => (
        <button key={index} onClick={() => setPage(el)}>
          {el}
        </button>
      ))}
    </div>
  );
};
