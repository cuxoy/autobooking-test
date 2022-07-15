import { useEffect, useState, useMemo } from "react";
import { parsePath, useNavigate, useParams } from "react-router";
import React from "react";

function Main() {
  const [data, setData] = useState({ services: [], brands: [], styles: [] });
  const [loadingStatus, setLoadingStatus] = useState("loading");
  const [url, setUrl] = useState({ s: "", b: "", st: "" });

  const navigate = useNavigate();
  const locationParams = useParams();

  useEffect(() => {
    const requests = [
      "https://onboarding.art-code.team/api/test/v1/search/terms",
      "https://onboarding.art-code.team/api/test/v1/search/brands_terms",
      "https://onboarding.art-code.team/api/test/v1/search/styles",
    ];
    Promise.all(
      requests.map((request) => {
        return fetch(
          request
          // { cache: "no-store" }
        ).then((response) => response.json());
      })
    )
      .then(([services, brands, styles]) =>
        setData({ services, brands, styles })
      )
      .then(() => setLoadingStatus("loaded"));
  }, []);

  useEffect(() => {
    onSetUrlChange();
  }, [url]);

  const onUrlChange = ({ target }) => {
    if (target.name === "s") {
      setUrl({ ...url, s: target.value });
      localStorage.setItem("urlS", target.value);
    }
    if (target.name === "b") {
      setUrl({ ...url, b: target.value });
      localStorage.setItem("urlB", target.value);
    }
    if (target.name === "st") {
      setUrl({ ...url, st: target.value });
      localStorage.setItem("urlST", target.value);
    }
  };
  const onSetUrlChange = () => {
    if (url.s.length > 0 && url.b.length > 0 && url.st.length > 0) {
      navigate(`../s-${url.s}/b-${url.b}/st-${url.st}`);
    } else if (url.s.length > 0 && url.b.length < 1 && url.st.length < 1) {
      navigate(`../s-${url.s}`);
    } else if (url.s.length < 1 && url.b.length > 0 && url.st.length < 1) {
      navigate(`../b-${url.b}`);
    } else if (url.s.length < 1 && url.b.length < 1 && url.st.length > 0) {
      navigate(`../s-${url.st}`);
    } else if (url.s.length > 0 && url.b.length > 0 && url.st.length < 1) {
      navigate(`../s-${url.s}/b-${url.b}`);
    } else if (url.s.length > 0 && url.b.length < 1 && url.st.length > 0) {
      navigate(`../s-${url.s}/st-${url.st}`);
    } else if (url.s.length < 1 && url.b.length > 0 && url.st.length > 0) {
      navigate(`../b-${url.b}/st-${url.st}`);
    } else navigate("../");
  };

  const itemS =
    data.services.data && localStorage.getItem("urlS")
      ? data.services.data.filter((item) => {
          return item.slug === localStorage.getItem("urlS");
        })[0].label
      : "";
  const itemB =
    data.services.data && localStorage.getItem("urlB")
      ? data.brands.data.filter((item) => {
          return item.slug === localStorage.getItem("urlB");
        })[0].label
      : "";
  const itemST =
    data.services.data && localStorage.getItem("urlST")
      ? data.styles.data.filter((item) => {
          return item.slug === localStorage.getItem("urlST");
        })[0].label
      : "";

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
          <option selected disabled>
            {itemS}
          </option>
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
          <option selected disabled>
            {itemB}
          </option>
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
          <option selected disabled>
            {itemST}
          </option>
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
