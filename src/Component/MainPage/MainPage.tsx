import axios, { CancelTokenSource } from "axios";
import React, { useEffect, useState } from "react";
import { MetroRoute } from "../../Interfaces/Interfaces";
import "./MainPage.css";

const MainPage: React.FC = () => {
  const [routes, setRoutes] = useState([] as MetroRoute[]);

  const [selectedRoute, setSelectedRoute] = useState<MetroRoute | null>(null);

  const [loading, setLoading]: [boolean, (loading: boolean) => void] =
    React.useState<boolean>(true);
  const [error, setError]: [string, (error: string) => void] = useState("");

  const cancelToken = axios.CancelToken; //create cancel token
  const [cancelTokenSource, setCancelTokenSource]: [
    CancelTokenSource,
    (cancelTokenSource: CancelTokenSource) => void
  ] = React.useState(cancelToken.source());

  const handleCancelClick = () => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel("User cancelled operation");
    }
  };

  const selectRoute = (routes: HTMLSelectElement) => {
    setSelectedRoute({
      route_id: routes.value,
      route_label: routes.options[routes.selectedIndex].text,
    });
  };

  //Gets routes on load
  useEffect(() => {
    axios
      .get<MetroRoute[]>("https://svc.metrotransit.org/nextripv2/routes", {
        cancelToken: cancelTokenSource.token,
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 10000,
      })
      .then((response) => {
        setRoutes(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        let error = axios.isCancel(err)
          ? "Request Cancelled"
          : err.code === "ECONNABORTED"
          ? "A timeout has occurred"
          : err.response.status === 404
          ? "Resource Not Found"
          : "An unexpected error has occurred";
        setError(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="main-page">
      <div>
        {loading && <button onClick={handleCancelClick}>Cancel</button>}
        <div className="select-box-container">
          <select
            data-testid="route-select"
            defaultValue={""}
            className="select-box"
            onChange={(e) => selectRoute(e.target)}
          >
            <option value={""} disabled>
              Select a Route
            </option>
            {routes.map((metroRoute) => (
              <option
                data-testid={`route-${metroRoute.route_id}`}
                key={metroRoute.route_id}
                value={metroRoute.route_id}
              >
                {metroRoute.route_label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
