import axios, { CancelTokenSource } from "axios";
import React, { useEffect, useState } from "react";
import {
  MetroRoute,
  RouteDirection,
  StopsList
} from "../../Interfaces/Interfaces";
import Stops from "../Stops/Stops";
import "./MainPage.css";

const MainPage: React.FC = () => {
  const [routes, setRoutes] = useState([] as MetroRoute[]);
  const [directions, setDirections] = useState([] as RouteDirection[]);
  const [stops, setStops] = useState([] as StopsList[]);

  const [selectedRoute, setSelectedRoute] = useState<MetroRoute | null>(null);
  const [selectedDirection, setSelectedDirection] =
    useState<RouteDirection | null>(null);

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

  const selectDirection = (directions: HTMLSelectElement) => {
    setSelectedDirection({
      direction_id: Number(directions.value),
      direction_name: directions.options[directions.selectedIndex].text,
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

  //Gets Directions
  useEffect(() => {
    if (selectedRoute) {
      setDirections([]);
      setStops([]);
      axios
        .get<RouteDirection[]>(
          `https://svc.metrotransit.org/nextripv2/directions/${selectedRoute?.route_id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            timeout: 10000,
          }
        )
        .then((response) => {
          setDirections(response.data);
        })
        .catch((err) => `${err.message} CANNOT GET DIRECTIONS`);
    }
  }, [selectedRoute]);

  //Gets stops
  useEffect(() => {
    if (selectedDirection) {
      const path = `${selectedRoute?.route_id}/${selectedDirection?.direction_id}`;
      axios
        .get<StopsList[]>(
          //make whats in parenthesis variable outside
          `https://svc.metrotransit.org/nextripv2/stops/${path}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            timeout: 10000,
          }
        )
        .then((response) => {
          setStops(response.data);
        })
        .catch((err) => `${err.message} CANNOT GET STOPS`);
    }
  }, [selectedDirection]);

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
          {!!directions.length && (
            <select
              data-testid="direction-select"
              defaultValue={""}
              className="select-box"
              onChange={(e) => selectDirection(e.target)}
            >
              <option value={""} disabled>
                Select a Direction
              </option>
              {directions.map((direction) => (
                <option
                  data-testid={`direction-${direction.direction_id}`}
                  key={direction.direction_id}
                  value={direction.direction_id}
                >
                  {direction.direction_name}
                </option>
              ))}
            </select>
          )}
        </div>
        {selectedDirection && (
          <Stops stops={stops} selectedDirection={selectedDirection} />
        )}
      </div>
    </div>
  );
};

export default MainPage;
