import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../app/store";
import Projects from "./Projects";

test("user can open create project modal", async () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Projects />
      </BrowserRouter>
    </Provider>
  );

  const button =
    screen.getByRole("button", {
      name: /create project/i,
    });

  await userEvent.click(button);

  expect(
    screen.getByText(/new project/i)
  ).toBeInTheDocument();
});