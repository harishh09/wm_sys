import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../app/store";
import Users from "./Users";

test("renders users page", () => {
  render(
    <Provider store={store}>
      <Users />
    </Provider>
  );

  expect(
    screen.getByRole("heading", {
      name: /users/i,
    })
  ).toBeInTheDocument();
});