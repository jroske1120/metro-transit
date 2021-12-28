import { render } from "@testing-library/react";
import React from "react";
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
  const titleElement = getByText(/NexTrip/i);
  expect(titleElement).toBeInTheDocument();
});

test("render the main page select", () => {
  const { getByText } = render(<MainPage />);
  const titleElement = getByText(/Select a Route/i);
  expect(titleElement).toBeInTheDocument();
});

test(`has rendered a the items passed correctly`, () => {
  const { getByRole } = render(
    <Stops stops={stops} selectedDirection={selectedDirection} />
  );
  let listItems = getByRole("list");
  expect(listItems.children.length).toEqual(2);
});
