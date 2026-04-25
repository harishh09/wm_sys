import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Signup from "./Signup";

test("renders signup form", () => {
  render(
    <BrowserRouter>
      <Signup />
    </BrowserRouter>
  );

  expect(
    screen.getByPlaceholderText("Name")
  ).toBeInTheDocument();

  expect(
    screen.getByPlaceholderText("Email")
  ).toBeInTheDocument();

  expect(
    screen.getByPlaceholderText("Password")
  ).toBeInTheDocument();

  expect(
    screen.getByRole("button", {
      name: /signup/i,
    })
  ).toBeInTheDocument();
});