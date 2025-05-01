import React from "react";
import { useParams } from "react-router";
import CurrencyDetail from "./CurrencyDetail";

function CryptoDetail() {
  const { id } = useParams();

  return (
    <div>
      <CurrencyDetail id={id} />
    </div>
  );
}

export default CryptoDetail;
