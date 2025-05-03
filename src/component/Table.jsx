import React, { useState } from "react";
import useTable from "../hooks/useTable";
import { Link } from "react-router";
import TableFooter from "./TableFooter";

export default function Table({ info, rowsPerPage, Sort }) {
  const [page, setPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc");
  const { slice, range } = useTable(info, page, rowsPerPage);

  const handleSortClick = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc"; // Toggle sort order
    setSortOrder(newOrder);
    Sort(newOrder); // Pass the new order to the Sort function
  };

  
  return (
    <>
      <div className="m-8 ">
        <table className="w-full rounde-xl text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            {/* HEADER table */}
            <tr>
              <th scope="col" className="p-4 ">
                <div className="flex items-center">Currency</div>
              </th>
              <th scope="col" className="p-4">
                Provider
              </th>
              <th scope="col" className="p-4">
                Category
              </th>
              <th scope="col" className="p-4">
                <div className="flex items-center ">
                  Date
                  <a href="#" onClick={handleSortClick}>
                    <svg
                      className="w-3 h-3 "
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
              <th scope="col" className="p-4">
                Sell Enable
              </th>
            </tr>
          </thead>

          <tbody>
            {slice.map((item) => (
              <tr
                key={item._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <Link to={`/currency/${item._id}`}>
                    <span className="underline hover:font-bold">
                      {item.currency}
                    </span>
                  </Link>
                </th>

                <td className="px-6 py-4">{item.provider}</td>
                <td className="px-6 py-4">{item.symbol}</td>
                <td className="px-6 py-4">
                  {new Date(item.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td className="px-6 py-4">
                  {item.tradeEnabled ? "Yes" : "No"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TableFooter range={range} setPage={setPage} page={page} slice={slice} />
    </>
  );
}
