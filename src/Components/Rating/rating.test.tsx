import { render, screen } from "@testing-library/react";

import Rating from ".";

describe("<Rating></Rating>", () => {
    it("should render with props", () => {
        render(<Rating />);

        const ratingValue = screen.getAllByRole("radio");
        console.log("a", ratingValue);
        // expect(ratingValue).toHaveClass("rating");
    });
});
