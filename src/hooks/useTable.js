import { useEffect, useState } from "react";

const calculateRange = (data, rowsPerPage, page) => {
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const delta = 1;

  const range = [];
  if (1 !== page - delta && page - delta > 2) {
    range.push(1, "...");
  } else {
    for (let i = 1; i < page; i++) {
      range.push(i);
    }
  }

  for (
    let i = Math.max(1, page - delta);
    i <= Math.min(totalPages, page + delta);
    i++
  ) {
    if (!range.includes(i)) range.push(i);
  }

  if (page + delta < totalPages - 1) {
    range.push("...", totalPages);
  } else {
    for (let i = page + 1; i <= totalPages; i++) {
      if (!range.includes(i)) range.push(i);
    }
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
    const range = calculateRange(data, rowsPerPage, page);
    setTableRange(range);

    const slice = sliceData(data, page, rowsPerPage);
    setSlice(slice);
  }, [data, page, rowsPerPage]);

  return { slice, range: tableRange };
};

export default useTable;
