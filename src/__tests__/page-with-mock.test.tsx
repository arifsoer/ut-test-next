import { render, fireEvent, screen } from "@testing-library/react";
import Page from "@/pages/index";
import dayjs from "dayjs";

jest.mock("@mui/material", () => ({
  ...jest.requireActual("@mui/material"),
  Dialog: jest.fn((props) => {
    return (
      <div>
        <p>Dialog mock</p>
        <button type="button" onClick={() => props.onClose()}>
          to close dialog
        </button>
      </div>
    );
  }),
}));

describe("mocked test suite", () => {
  test("to trigger close", () => {
    render(<Page />);

    const closeBtn = screen.getByText("to close dialog");
    fireEvent.click(closeBtn);

    expect(closeBtn).toBeInTheDocument();
  });
});
