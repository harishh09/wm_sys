import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../app/store";
import Login from "./Login";

test("renders login form", () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </Provider>
  );

  expect(
    screen.getByPlaceholderText("Email")
  ).toBeInTheDocument();

  expect(
    screen.getByPlaceholderText("Password")
  ).toBeInTheDocument();

  expect(
    screen.getByRole("button", {
      name: /login/i,
    })
  ).toBeInTheDocument();
});