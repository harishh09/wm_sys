import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../app/store";
import Projects from "./Projects";

test("renders projects page", () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Projects />
      </BrowserRouter>
    </Provider>
  );

  expect(
    screen.getByRole("heading", {
      name: /projects/i,
    })
  ).toBeInTheDocument();
});