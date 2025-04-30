import { useEffect } from "react";

const TableFooter = ({ range, setPage, page, slice }) => {
  useEffect(() => {
    if (slice.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [slice, page, setPage]);

  return (
    <div className="">
      {range.map((el, index) => {
        if (el === "...") {
          return <span key={index}>...</span>;
        }
     
        return (
          <button
            className={`border-0 py-2 px-4 rounded-xl cursor-pointer mx-4 ${
              page === el ? "bg-blue-500 text-white" : "bg-white text-black"
            }`}
            key={index}
            onClick={() => setPage(el)}
          >
            {el}
          </button>
        );
      })}
    </div>
  );
};

export default TableFooter;
