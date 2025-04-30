import { useEffect, useState } from "react";

// const calculateRange = (currentPage, totalPage) => {
//   const dlta = 2;
//   const range = [];
//   const rangeWithDots = [];
//   let l;

//   console.log("Calculating range for:", { currentPage, totalPage });

//   for (let i = 1; i <= totalPage; i++) {
//     if (
//       i === 1 ||
//       i === totalPage ||
//       (i >= currentPage - dlta && i <= currentPage + dlta)
//     ) {
//       range.push(i);
//     }
//   }
//   for (let i of range) {
//     if (l) {
//       if (i - l === 2) {
//         rangeWithDots.push(l + 1);
//       } else if (i - 1 !== 1) {
//         rangeWithDots.push("...");
//       }

//       rangeWithDots.push(i);
//       l = i;
//     }
//   }
//   console.log("Range with dots:", rangeWithDots);
//   return rangeWithDots;
// };

const calculateRange = (data, rowsPerPage) => {
  const range = [];
  const num = Math.ceil(data.length / rowsPerPage);
  for (let i = 1; i <= num; i++) {
    range.push(i);
  }
  return range;
};

const sliceData = (data, page, rowsPerPage) => {
  return data.slice((page - 1) * rowsPerPage, page * rowsPerPage);
};

const useTable = (data, page, rowsPerPage) => {
  const [tableRange, setTableRange] = useState([]);
  const [slice, setSlice] = useState([]);

  useEffect(() => {
    const range = calculateRange(data, rowsPerPage);
    setTableRange([...range]);

    const slice = sliceData(data, page, rowsPerPage);
    setSlice([...slice]);
  }, [data, setTableRange, page, setSlice]);

  return { slice, range: tableRange };
};

export default useTable;
