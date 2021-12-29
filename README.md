# JJ Roske MetroTransit App

This project allows a user to select a route and direction from the MetroTransit system, which will then display a list of possible stops to chose from.

## Steps to build and run

Navigate to the terminal inside the project (from outside or inside code editor)

### `npm install`

This will install the packages and dependencies necessary to run and test this app.

### `npm start`

Runs the app in the development mode, and opens localhost:3000 in your browser.
The steps to build and run your application.

## Steps to to execute provided tests.

### `npm test`

Runs the jest/react-testing-library unit tests for the project. You may also be prompted for further steps (i.e. press 'a' to run all tests or 'f' to run only those that failed). These tests can be found in the App.test.tsx file.

### `npm run cy`

Runs the cypress integration tests for the project. These aren't entirely necessarily comprehensive of all the features, but provide decent expected behavior. These tests can be found in the route-direction-stops.spec.js file within the cypress folder.

## A list of assumptions you made during development.

- Scalability - This is a very small app with limited features. If a part of a larger app I would likely refactor dropdowns and api calls into separate files reserved for components and services, respectively.

- Data availability - The app is only as useful as the data, and since we don't control the data we need proper error handling. The error handling for a larger app should be better than this, but we're assuming this data is available and relatively easy to retrieve based on its small size.

- Design - I mostly stuck with NexTrip's default designs, though they're not the greatest from an design or accesibility standpoint.

- There are a few other smaller assumptions, but most of them are related to me trying out new technology combinations in this app (first time combining React and Typescript, first time using the Jest/React-Testing-Library tests, first time using styled components, etc.)
