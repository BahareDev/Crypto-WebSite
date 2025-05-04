 💸 Crypto-Website
=====================

Crypto-WebSite is a front-end web application designed to provide users with real-time cryptocurrency information, including prices, trends, and charts. The app features a responsive design and is built using modern JavaScript tooling, React using this [Currency API](https://api.aliramshini.com/api/coin) 

📚 Table of Contents
--------------------

*   [About the Project](#about-the-project)
    
*   [Features](#features)

*   [Usage](#usage)

*   [Challenges and Improvements](#challenges-and-improvements)
    
*   [Getting Started](#getting-started)
    
*   [Contributing](#contributing)
    
*   [License](#license)
    
*   [Acknowledgements](#acknowledgements)
    

 ## 📖About the Project

**Crypto-website** allows users to browse list of currency data easily. It aims to provide a smooth UX with fast load times and a clean interface.This project is a foundation for learning and experimenting with React, component architecture, and data filtering techniques.

 ## ✨Features

*   Live cryptocurrency price display
*   Responsive and user-friendly UI
*   Real-time updates and dynamic data handling
*   Interactive charts and data visualization
*   Search functionality for different cryptocurrencies
  
## Usage

Once you run the project:

*   You will see a list of cryptocurrencies with prices and other market data and yu can click on currency name and see some detail information and chart about the prices (fetched from a public API depending on implementation).
    
*   You can search for a specific cryptocurrency using the search input.
    
*   The interface is responsive, meaning it adjusts to different screen sizes (mobile, tablet, desktop).
  
*   New features like sorting, advanced filtering, chart types, and API integrations can be added easily due to the modular code structure.

## 🎯Challenges and Improvements

Here’s a list of planned improvements and optional challenges:

### Challenges

### Challenge 1: Fetching Real-Time Crypto Data

**Problem:**  
keeping API-related code inside components made them messy and harder to maintain.

**Solution:**  
A created a custom hook called `useApi` to separate API logic from the UI components. This hook handles loading, error, and data states in a reusable way. It made the codebase cleaner, easier to debug, and simplified how data is fetched throughout the app.

```jsx
const useAPi = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    setLoading(true); // Start loading
    setError(null); // Clear previous errors

    axios
      .get("https://api.aliramshini.com/api/coin/")
      .then((response) => {
        const coins = response.data.coins || [];
        setData(coins);
        setFilterData(coins);
        setLoading(false);
        setLoading(false);
      })

      .catch((error) => {
        setError(error.message || "Error fetching data");
        setLoading(false);
      });
  }, []);

  return { data, filterData, setFilterData, error, loading };
};
```
### Challenge 2: Implementing Pagination

**Problem && solutions:**  
The crypto list could grow large, and displaying all items at once would hurt performance and usability.

so we need a pagination for it so I created a pagination but i doesn't work correctly the problem was it shows number form 30 until 50 instead of starting from 1 so after searching and debuging i found the problem was in logic that was good for small data so I changed the logic into this code generate a list of page numbers (and "..." placeholders) to be displayed in pagination based on `currentpage` , `totalPage` and give you this array as return `[1, "...", 4, 5, 6, "...", 10]`: 

```javascript
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
```

### Challenge 2: Dynamic Routing and Error Handling

**Problem && solutions:**  
Managing navigation between multiple pages (Home, Coin Detail) required dynamic routes and proper error handling. One tricky part was rendering individual coin pages based on their ID while gracefully handling invalid or broken URLs.
So get `_id` as params and then write a find method for extract data while fetching data from the API: 

```javascript
 const found = coinList.find(
          (item) => item._id.toLowerCase() === _id.toLowerCase()
        );
```

## ✨Future Improvements

*    🔍 Add filters for price range, market cap, and 24h volume, and enable sorting by name, price, and performance.
  
*    🌙 Implement a dark/light theme toggle with user preference saved using localStorage.
    
*    🌐 Add localization to support multiple languages for global users.
    
*    🔐 Add user authentication so users can save a personal watchlist of their favorite cryptocurrencies.
    
 ## Getting Started

Follow these steps to run the project locally:

### Prerequisites

Make sure you have **Node.js** and **npm** installed.

    node -v  npm -v

### Installation

Clone the repository:

    git clone https://github.com/BahareDev/Crypto-WebSite.git   

Navigate to the project directory:

    cd Crypto-WebSite

Install dependencies:

    npm install

Start the development server:
   
    npm run dev 

The app will be running at [http://localhost:5173](http://localhost:5173).    

## 🤝Contributing
 
Contributions are welcome! If you have suggestions for improvements or find a bug, feel free to open an [issue](https://github.com/BahareDev/Crypto-website/issues) or submit a pull request.

Steps:

1.  Fork the repository
    
2.  Create your feature branch (git checkout -b feature/AmazingFeature)
    
3.  Commit your changes (git commit -m 'Add some AmazingFeature')
    
4.  Push to the branch (git push origin feature/AmazingFeature)
    
5.  Open a Pull Request
    

## 📄License


## 🙏Acknowledgement

*   [React](https://react.dev/)
    
*   [Vite](https://vitejs.dev/)
    
*   [ESLint](https://eslint.org/)

