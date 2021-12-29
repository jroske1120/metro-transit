/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/prefer-screen-queries */
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";
import App from "./App";
import MainPage from "./Components/MainPage/MainPage";
import Stops from "./Components/Stops/Stops";

const stops = [
  { place_code: "UNDP", description: "Union Depot" },
  { place_code: "CNST", description: "Central Station" },
];

const selectedDirection = { direction_id: 0, direction_name: "Eastbound" };

test("render the page title", () => {
  const { getByText } = render(<App />);
  expect(getByText("NexTrip")).toBeInTheDocument();
});

test("render the main page select", () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <MainPage />
    </Router>
  );
  expect(screen.getByText(/Select a route/i)).toBeInTheDocument();
});

test(`has rendered a the items passed correctly`, () => {
  const { getByRole } = render(
    <Stops stops={stops} selectedDirection={selectedDirection} />
  );
  let listItems = getByRole("list");
  expect(listItems.children.length).toEqual(2);
});
