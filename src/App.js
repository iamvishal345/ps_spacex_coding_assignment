import React, { useState, useEffect, Fragment } from "react";
import { useHistory } from "react-router-dom";
import "./App.scss";
import { Card } from "./components/card/card";
import { Loader } from "./components/loader/loader";
import {
  LAUNCH_YEARS,
  SUCCESSFUL_LANDING,
  SUCCESSFUL_LAUNCH,
} from "./constants/filters";
import { getLaunchData } from "./services/get-launch-data";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [launchData, setLaunchData] = useState([]);
  const [filterObj, setFilterObj] = useState({
    launch_year: "",
    launch_success: "",
    land_success: "",
  });
  const history = useHistory();
  useEffect(() => {
    setIsLoading(true);
    let filterStr = Object.keys(filterObj).reduce((acc, curr) => {
      if (filterObj[curr] !== "") {
        acc += `&${curr}=${filterObj[curr]}`;
      }
      return acc;
    }, "");
    history.push({
      pathname: "/",
      search: `?${filterStr.substr(1)}`,
    });
    getLaunchData(filterStr)
      .then((data) => {
        setLaunchData(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [filterObj, history]);

  const handleClick = (name, value) => {
    if (filterObj[name] === value) {
      value = "";
    }
    setFilterObj({ ...filterObj, [name]: value });
  };

  return (
    <Fragment>
      <header>
        <h1>SpaceX Launch Programs</h1>
      </header>
      <main>
        <div className="filters-container">
          <h3>Filters</h3>
          <div className="filters">
            <p>Launch Year</p>
            <div className="filters-list">
              {LAUNCH_YEARS.map((data, i) => (
                <button
                  onClick={(e) => handleClick(e.target.name, data)}
                  name="launch_year"
                  key={i}
                  className={`filter-button ${
                    data === filterObj["launch_year"] && "active"
                  }`}
                >
                  {data}
                </button>
              ))}
            </div>
          </div>
          <div className="filters">
            <p>Successful Launch </p>
            <div className="filters-list">
              {SUCCESSFUL_LAUNCH.map((data, i) => (
                <button
                  name="launch_success"
                  key={i}
                  onClick={(e) => handleClick(e.target.name, data)}
                  className={`filter-button ${
                    data === filterObj["launch_success"] && "active"
                  }`}
                >
                  {`${data}`}
                </button>
              ))}
            </div>
          </div>
          <div className="filters">
            <p>Successful Landing</p>
            <div className="filters-list">
              {SUCCESSFUL_LANDING.map((data, i) => (
                <button
                  name="land_success"
                  key={i}
                  onClick={(e) => handleClick(e.target.name, data)}
                  className={`filter-button ${
                    data === filterObj["land_success"] && "active"
                  }`}
                >
                  {`${data}`}
                </button>
              ))}
            </div>
          </div>
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="cards-container">
            {launchData.map((data, i) => (
              <Card key={i} data={data} />
            ))}
            {!isLoading && launchData.length === 0 && (
              <h1>No data found for selected filter</h1>
            )}
          </div>
        )}
      </main>
      <footer>
        <p>
          <b>Developed By:</b>{" "}
          <a
            href="https://www.linkedin.com/in/vishal345/"
            rel="noopener noreferrer"
          >
            Vishal Sharma
          </a>
        </p>
      </footer>
    </Fragment>
  );
}

export default App;
