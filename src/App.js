import { useEffect, useState, useMemo } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState({ services: [], brands: [], styles: [] });
  const [loadingStatus, setLoadingStatus] = useState("loading");

  useEffect(() => {
    const requests = [
      "https://autobooking.com/api/test/v1/search/terms",
      "https://autobooking.com/api/test/v1/search/brands_terms",
      "https://autobooking.com/api/test/v1/search/brands_terms",
    ];
    Promise.all(
      requests.map((request) => {
        return fetch(request).then((response) => response.json());
      })
    )
      .then((res) =>
        setData({ services: res[0], brands: res[1], styles: res[2] })
      )
      .then(() => setLoadingStatus("loaded"));
  }, []);

  console.log(data);

  if (loadingStatus === "loading") {
    return (
      <div
        className="loading"
        style={{
          "text-align": "center",
          "font-size": "20px",
          "margin-top": "40px",
        }}
      >
        Loading...
      </div>
    );
  } else if (loadingStatus === "loaded") {
    return (
      <div className="container">
        <select name="services" id="services">
          {data.services.data.map((item) => {
            return <option value="">{item.label}</option>;
          })}
        </select>
        <select name="brands" id="brands">
          {data.brands.data.map((item) => {
            return <option value="">{item.label}</option>;
          })}
        </select>
        <select name="styles" id="styles">
          {data.styles.data.map((item) => {
            return <option value="">{item.label}</option>;
          })}
        </select>
      </div>
    );
  } else {
    return <div className="loading">Error</div>;
  }
}

export default App;
