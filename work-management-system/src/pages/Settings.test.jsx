import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../app/store";
import Settings from "./Settings";
import { ThemeProvider } from "../context/ThemeContext";

test("renders settings page", () => {
  render(
    <Provider store={store}>
      <ThemeProvider>
        <Settings />
      </ThemeProvider>
    </Provider>
  );

  expect(
    screen.getByRole("heading", {
      name: /settings/i,
    })
  ).toBeInTheDocument();
});