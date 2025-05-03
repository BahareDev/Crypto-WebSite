import { useEffect } from "react";

const TableFooter = ({ range, setPage, page, slice }) => {
  useEffect(() => {
    if (slice.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [slice, page, setPage]);

  return (
    <div className="flex justify-center items-center space-x-2 py-4">
      {/* Prev Button */}
      <button
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        disabled={page === 1}
        className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
      >
        Prev
      </button>

      {/* Page numbers with dots */}
      {range.map((el, index) =>
        el === "..." ? (
          <span key={index} className="px-2 text-gray-500">
            ...
          </span>
        ) : (
          <button
            key={index}
            onClick={() => setPage(el)}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
              page === el
                ? "bg-violet-600 text-white font-semibold shadow"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {el}
          </button>
        )
      )}

      {/* Next Button */}
      <button
        onClick={() => setPage((prev) => prev + 1)}
        disabled={range.length === 0 || page === range[range.length - 1]}
        className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default TableFooter;
