import { Link, useLocation } from "react-router";

const BackButton = ({ destination = "dashboard" }) => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  const capitalizedDestination =
    destination.charAt(0).toUpperCase() + destination.slice(1);

  return (
    <Link to="/dashboard" className=" flex items-center  cursor-pointer">
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
      </span>
      {isHome ? `<-- ${capitalizedDestination}` : " "}
    </Link>
  );
};

export default BackButton;
