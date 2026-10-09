import { act, fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import TypeAhead from "./TypeAhead";

const renderTypeAhead = (
  getFunctions: (text: string) => void,
  options: { id: number; name: string; value: number }[] = [],
) =>
  render(
    <TypeAhead
      value={null}
      label="Buscar"
      options={options}
      setValue={vi.fn()}
      getFunctions={getFunctions}
      searchText=""
    />,
  );

describe("Given a TypeAhead", () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"] });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test("Then typing 5 characters quickly calls getFunctions once after the debounce", async () => {
    const getFunctions = vi.fn();
    renderTypeAhead(getFunctions);
    const input = screen.getByLabelText("Buscar");

    for (const value of ["a", "ab", "abc", "abcd", "abcde"]) {
      fireEvent.change(input, { target: { value } });
    }

    expect(getFunctions).not.toHaveBeenCalled();

    await act(async () => {
      await vi.advanceTimersByTimeAsync(399);
    });
    expect(getFunctions).not.toHaveBeenCalled();

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1);
    });

    expect(getFunctions).toHaveBeenCalledTimes(1);
    expect(getFunctions).toHaveBeenCalledWith("abcde");
  });

  test("Then selecting an option does not search by the full label", async () => {
    const getFunctions = vi.fn();
    renderTypeAhead(getFunctions, [
      { id: 1, name: "Acme Corporation", value: 1 },
    ]);

    fireEvent.mouseDown(screen.getByLabelText("Buscar"));
    fireEvent.click(screen.getByRole("option", { name: "Acme Corporation" }));

    await act(async () => {
      await vi.advanceTimersByTimeAsync(400);
    });

    expect(getFunctions).not.toHaveBeenCalled();
  });
});
