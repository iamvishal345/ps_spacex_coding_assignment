import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));
test("renders app component", () => {
  render(<App />);
  const headerElement = screen.getByText(/SpaceX Launch Programs/i);
  expect(headerElement).toBeInTheDocument();
});
