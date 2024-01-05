import { render, screen } from "@testing-library/react";
import ImageCustom from "./ImageCustom";
import "@testing-library/jest-dom";

describe("Given an ImageCustom component", () => {
  describe("When it is rendered", () => {
    test("Then it should show an image", () => {
      render(
        <ImageCustom className="" alt="" height={2} width={2} image={""} />,
      );

      const expectedImage = screen.getByRole("img");

      expect(expectedImage).toBeInTheDocument();
    });

    test("Then it should show a placeholder when 'image' is not defined", () => {
      render(
        <ImageCustom
          image=""
          alt="Test Image"
          className="custom-image"
          width={0}
          height={0}
        />,
      );

      const imageElement = screen.getByAltText("Test Image");
      expect(imageElement).toBeInTheDocument();
      expect(imageElement).toHaveAttribute("src", "/image-placeholder.svg");
    });

    test("Then it should set the imageLoaded state to the placeholder image", () => {
      render(
        <ImageCustom
          image="/image-placeholder.svg"
          alt="Test Image"
          className="custom-image"
          width={0}
          height={0}
        />,
      );

      const imageElement = screen.getByAltText("Test Image");
      expect(imageElement).toBeInTheDocument();
      expect(imageElement).toHaveAttribute("src", "/image-placeholder.svg");
    });
  });
});
