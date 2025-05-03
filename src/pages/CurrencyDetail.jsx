import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import useAPi from "../hooks/useApi";

ChartJS.register(
  LineElement,
  CategoryScale,

  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

function CurrencyDetail() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const { _id } = useParams();

  useEffect(() => {
    axios
      .get("https://api.aliramshini.com/api/coin/")
      .then((response) => {
        const coinList = response.data.coins;
        if (!Array.isArray(coinList)) {
          throw new Error("Invalid data format: coins not found");
        }
        const found = coinList.find(
          (item) => item._id.toLowerCase() === _id.toLowerCase()
        );

        if (found) {
          setData(found);
        } else {
          setError("Coin not found");
        }
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message || "Error fetching data");
        setLoading(false);
      });
  }, [_id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  const priceHistory = data.history || [10, 12, 11, 14, 15, 13, 17];
  const labels = priceHistory.map((_, i) => `Day ${i + 1}`);

  const chartData = {
    labels,
    datasets: [
      {
        label: `${data.currency} Price`,
        data: priceHistory,
        fill: false,
        borderColor: "blue",
        backgroundColor: "lightblue",
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  return (
    <>
      <div className="m-4 bg-white rounded-2xl p-4 space-y-5">
        {/* <div className="bg-red-400"> back</div> */}
        <div>
          <h2 className="text-2xl">
            {" "}
            More Detail about {data.currency} ({data.symbol})
          </h2>
          <div className="text-gray-400">
            Buy {data.fullname} - {data.faName}
          </div>

          <div className="py-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque alias
            minus, dolor quae dolorum mollitia modi recusandae quis consequuntur
            minima expedita laudantium fuga nam sit, nulla maxime corrupti ab
            libero?
          </div>
        </div>

        <button className="bg-violet-500 p-2 rounded-xl text-white px-8">
          Buy
        </button>
        <div></div>
        <div>{data.isWithdrawEnabled}</div>
      </div>
      <div className="mt-4">
        <Line data={chartData} options={options} />
      </div>
    </>
  );
}

export default CurrencyDetail;
