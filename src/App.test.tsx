import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders map", () => {
  jest.mock("leaflet");
  render(<App />);
  // const linkElement = screen.getByText(/learn react/i);
  const mapContainerElement = document.querySelector(".leaflet-container");
  expect(mapContainerElement).toBeInTheDocument();
});
