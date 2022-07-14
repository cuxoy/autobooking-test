import { useEffect, useState, useMemo } from "react";
import { parsePath, useNavigate, useParams } from "react-router";
import React from "react";

function Main() {
  const [data, setData] = useState({ services: [], brands: [], styles: [] });
  const [loadingStatus, setLoadingStatus] = useState("loading");

  const navigate = useNavigate();
  const locationParams = useParams();

  useEffect(() => {
    const requests = [
      "https://autobooking.com/api/test/v1/search/terms",
      "https://autobooking.com/api/test/v1/search/brands_terms",
      "https://onboarding.art-code.team/api/test/v1/search/styles",
    ];
    Promise.all(
      requests.map((request) => {
        return fetch(
          request
          //  { cache: "no-store" }
        ).then((response) => response.json());
      })
    )
      .then(([services, brands, styles]) =>
        setData({ services, brands, styles })
      )
      .then(() => setLoadingStatus("loaded"));
  }, []);

  //OnURLCHANGE

  const onUrlChange = ({ target }) => {
   
  };
  console.log("--params", locationParams);

  ////////////////////////////////////////////////////
  if (loadingStatus === "loading") {
    return (
      <div
        className="loading"
        style={{
          textAlign: "center",
          fontSize: "20px",
          marginTop: "40px",
        }}
      >
        Loading...
      </div>
    );
  }

  if (loadingStatus === "error") {
    return <div className="loading">Error</div>;
  }

  if (loadingStatus === "loaded") {
    return (
      <div
        className="container"
        style={{
          width: "1200px",
          margin: "0 auto",
          paddingTop: "50px",
        }}
      >
        <select
          name="s"
          id="services"
          style={{ margin: "15px" }}
          onChange={onUrlChange}
        >
          {data.services.data.map((item) => {
            return (
              <option key={item.id} value={item.slug}>
                {item.label}
              </option>
            );
          })}
        </select>

        <select
          name="b"
          id="brands"
          style={{ margin: "15px" }}
          onChange={onUrlChange}
        >
          {data.brands.data.map((item) => {
            return (
              <option key={item.id} value={item.slug}>
                {item.label}
              </option>
            );
          })}
        </select>
        <select
          name="st"
          id="styles"
          style={{ margin: "15px" }}
          onChange={onUrlChange}
        >
          {data.styles.data.map((item) => {
            return (
              <option key={item.id} value={item.slug}>
                {item.label}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}

export default Main;
