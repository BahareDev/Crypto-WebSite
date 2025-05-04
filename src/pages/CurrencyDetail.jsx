import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router";
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
import Dashboard from "./Dashboard";
import BackButton from "../component/BackButton";

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

  const navigate = useNavigate();
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
      <header className="container p-4 flex max-w-full text-white bg-violet-400 font-bold text-2xl justify-between items-center  ">
        <div className="flex items-center container">
          <div className="p-4">
            <BackButton />
          </div>

          <div>
            {data.fullname} ({data.currency})
          </div>
        </div>

        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
            />
          </svg>
        </div>
      </header>
      <div className="mx-auto px-4 py-6">
        <section className="bg-white rounded-xl m-8 p-4">
          <div className="flex items-center justify-between ">
            <div>
              <h2>About {data.currency}</h2>
              <span className="text-sm text-gray-400">
                {data.fullname} - {data.faName}
              </span>
            </div>
            <div className="w-16 h-16 bg-violet-200 rounded-full flex items-center justify-center p-2 ">
              <img
                className="rounded-full"
                src={`https://api.versland.io/public/coin/${data.logo}`}
                alt=""
                srcset=""
              />
            </div>
          </div>
          <div className="mt-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.equatur illo
            perspiciatis quos assumenda cum dolorum repudiandae, atque
            consectetur commodi recusandae similique, aspernatur distinctio
            voluptas sequi soluta veniam!
            <div>
              <ul className="flex items-center space-x-4 my-4 text-violet-600  cursor-pointer pl-1">
                <li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    height={20}
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill="currentColor"
                      d="M17 1H3c-1.1 0-2 .9-2 2v14c0 1.101.9 2 2 2h14c1.1 0 2-.899 2-2V3c0-1.1-.9-2-2-2M9.984 15.523a5.54 5.54 0 0 0 5.538-5.539c0-.338-.043-.664-.103-.984H17v7.216a.69.69 0 0 1-.693.69H3.693a.69.69 0 0 1-.693-.69V9h1.549c-.061.32-.104.646-.104.984a5.54 5.54 0 0 0 5.539 5.539M6.523 9.984a3.461 3.461 0 1 1 6.922 0a3.461 3.461 0 0 1-6.922 0M16.307 6h-1.615A.694.694 0 0 1 14 5.308V3.691c0-.382.31-.691.691-.691h1.615c.384 0 .694.309.694.691v1.616c0 .381-.31.693-.693.693"
                    ></path>
                  </svg>
                </li>
                <li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    height={20}
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill="currentColor"
                      d="M17.316 6.246q.011.244.011.488c0 4.99-3.797 10.742-10.74 10.742c-2.133 0-4.116-.625-5.787-1.697a7.58 7.58 0 0 0 5.588-1.562a3.78 3.78 0 0 1-3.526-2.621a3.86 3.86 0 0 0 1.705-.065a3.78 3.78 0 0 1-3.028-3.703v-.047a3.8 3.8 0 0 0 1.71.473a3.775 3.775 0 0 1-1.168-5.041a10.72 10.72 0 0 0 7.781 3.945a3.8 3.8 0 0 1-.097-.861a3.773 3.773 0 0 1 3.774-3.773a3.77 3.77 0 0 1 2.756 1.191a7.6 7.6 0 0 0 2.397-.916a3.8 3.8 0 0 1-1.66 2.088a7.6 7.6 0 0 0 2.168-.594a7.6 7.6 0 0 1-1.884 1.953"
                    ></path>
                  </svg>
                </li>
                <li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                    />
                  </svg>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-4">
            <button className="bg-violet-500 px-16 py-2 rounded-2xl text-white hover:bg-white hover:border hover:border-violet-600 hover:text-violet-600 transition-all ">
              Buy
            </button>
          </div>
        </section>

        <section class="bg-white rounded-xl shadow-md p-4 mb-4 m-8 ">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-lg font-semibold text-violet-500">Price Chart</h3>
          </div>
          <div class="h-[450px] flex justify-center">
            <Line data={chartData} options={options} />
          </div>
        </section>
      </div>
    </>
  );
}

export default CurrencyDetail;
