/// <reference types="cypress" />
// const routes = require("../../fixtures/routes");
// const directions = require("../../fixtures/directions");
const url = "http://localhost:3000/#/";
const directionOptionId = "direction-0";
const routeOptionId = "route-901";

describe("metro transit route and direction displays corresponding stops", () => {
  beforeEach(() => {
    cy.fixture("routes.json").as("routes");
    cy.fixture("directions.json").as("directions");
    cy.fixture("stops.json").as("stops");
  });

  it("selects a line", () => {
    cy.visit(url);
    cy.get("[data-testid=route-select]")
      .find(`option[data-testid=${routeOptionId}]`)
      .invoke("attr", "value")
      .then((value) => {
        // now that we know the value of the <option>
        cy.get("[data-testid=route-select]").select(value);
      });
    // confirm the selected option
    cy.get("[data-testid=route-select] option:selected").should(
      "have.text",
      "METRO Blue Line"
    );
  });

  it("selects a direction and displays corresponding stops", () => {
    cy.visit(url);
    cy.get("[data-testid=route-select]")
      .find(`option[data-testid=${routeOptionId}]`)
      .invoke("attr", "value")
      .then((value) => {
        cy.get("[data-testid=route-select]").select(value);
      });
    cy.get("[data-testid=direction-select]")
      .find(`option[data-testid=${directionOptionId}]`)
      .invoke("attr", "value")
      .then((value) => {
        cy.get("[data-testid=direction-select]").select(value);
      });
    // confirm the selected option
    cy.get("[data-testid=direction-select] option:selected").should(
      "have.text",
      "Northbound"
    );
    cy.get(".stop-description div").should("have.length", "20");
  });

  it("confirms stops list loads after navigating away or refresh", () => {
    cy.visit(url + "901/0");
    cy.get(".stop-description div").should("have.length", "20");
  });
});
