/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { createBrowserHistory } from "history";
import React, { useEffect, useState } from "react";
import { Route, useHistory, useRouteMatch } from "react-router-dom";
import {
  MetroRoute,
  RouteDirection,
  StopsList
} from "../../Interfaces/Interfaces";
import Stops from "../Stops/Stops";
import "./MainPage.css";

const MainPage: React.FC = () => {
  //available data in variables
  const [routes, setRoutes] = useState([] as MetroRoute[]);
  const [directions, setDirections] = useState([] as RouteDirection[]);
  const [stops, setStops] = useState([] as StopsList[]);

  //selected data in variables
  const [selectedRoute, setSelectedRoute] = useState<MetroRoute | null>(null);
  const [selectedDirection, setSelectedDirection] =
    useState<RouteDirection | null>(null);

  //variables necessary for routing
  const history = useHistory();
  const match = useRouteMatch();
  const browserHistory = createBrowserHistory();
  const urlRoute = `${selectedRoute?.route_id}/${selectedDirection?.direction_id}`;

  //onChange handlers for selected options
  const selectRoute = (routes: HTMLSelectElement) => {
    setSelectedRoute({
      route_id: routes.value,
      route_label: routes.options[routes.selectedIndex].text,
    });
    setSelectedDirection(selectedDirection ? null : selectedDirection);
  };

  const selectDirection = (directions: HTMLSelectElement) => {
    setSelectedDirection({
      direction_id: Number(directions.value),
      direction_name: directions.options[directions.selectedIndex].text,
    });
  };

  // Checks browser history for params in case of page navigation, refresh,
  // or even link to list of stops with specific route/direction combination
  useEffect(() => {
    const filterParams = browserHistory.location.hash.split("/");
    const routeFromParams = { route_id: filterParams[1] };
    const directionFromParams = {
      direction_id: Number(filterParams[2]),
    };
    if (routeFromParams.route_id.length > 0) {
      setSelectedRoute(routeFromParams);
      setSelectedDirection(directionFromParams);
    }
  }, []);

  //Gets routes on initial load
  useEffect(() => {
    axios
      .get<MetroRoute[]>(
        "https://svc.metrotransit.org/nextripv2/routes?format=json",
        {
          //explicitly request json format, via nexTrip docs https://svc.metrotransit.org/nextrip]
        }
      )
      .then((response) => {
        setRoutes(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //Gets Directions based on route chosen
  useEffect(() => {
    if (selectedRoute) {
      setDirections([]);
      setStops([]);
      axios
        .get<RouteDirection[]>(
          `https://svc.metrotransit.org/nextripv2/directions/${selectedRoute?.route_id}?format=json`
        )
        .then((response) => {
          setDirections(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [selectedRoute]);

  //Gets stops available given chosen route and direction
  useEffect(() => {
    if (selectedDirection) {
      axios
        .get<StopsList[]>(
          `https://svc.metrotransit.org/nextripv2/stops/${urlRoute}?format=json`
        )
        .then((response) => {
          //route to Stops component
          history.push(`${match.url}${urlRoute}`);
          setStops(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [selectedDirection, selectedRoute?.route_id]);

  return (
    <div className="main-page">
      <div className="select-box-container">
        {/* Would consider refactoring selects into their own components
        if in a larger code base where similar selects (and other elements) are reused  */}
        <select
          data-testid="route-select"
          defaultValue={""}
          className="select-box"
          onChange={(e) => selectRoute(e.target)}
          title="Select a Route"
        >
          <option value={""} disabled>
            Select a Route
          </option>
          {routes.map((route) => (
            <option
              data-testid={`route-${route.route_id}`}
              key={route.route_id}
              value={route.route_id}
              label={route.route_label}
              title={route.route_label}
            >
              {route.route_label}
            </option>
          ))}
        </select>

        {/* if a route has been selected, and therefore api call to 
        retrieve directions, display dropdown */}
        {!!directions.length && (
          <select
            data-testid="direction-select"
            defaultValue={""}
            className="select-box"
            onChange={(e) => selectDirection(e.target)}
            title="Select a Direction"
          >
            <option value={""} disabled>
              Select a Direction
            </option>
            {directions.map((direction) => (
              <option
                data-testid={`direction-${direction.direction_id}`}
                key={direction.direction_id}
                value={direction.direction_id}
                label={direction.direction_name}
                title={direction.direction_name}
              >
                {direction.direction_name}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* If a direction is selected, render and route to Stops component */}
      {selectedDirection && (
        <Route path={`${match.url}${urlRoute}`}>
          <Stops stops={stops} selectedDirection={selectedDirection} />
        </Route>
      )}
    </div>
  );
};

export default MainPage;
