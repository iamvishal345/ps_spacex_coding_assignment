import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Card } from "./card";

const data = {
  flight_number: 1,
  mission_name: "FalconSat",
  mission_id: ["1234"],
  launch_year: "2006",
  rocket: {
    first_stage: {
      cores: [
        {
          land_success: null,
        },
      ],
    },
  },
  launch_success: false,
  links: {
    mission_patch_small: "https://images2.imgbox.com/3c/0e/T8iJcSN3_o.png",
  },
};

test("renders card component", () => {
  render(<Card data={data} />);
  const cardHeaderElement = screen.getByText(/FalconSat/i);
  expect(cardHeaderElement).toBeInTheDocument();
});
