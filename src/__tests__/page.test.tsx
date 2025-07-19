import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Page from "@/pages/index";
import { generateResponse, sampleData } from "@/utils/test-helper";
import {
  useAddParticipantMutation,
  useDeleteParticipantMutation,
  useGetParticipantsQuery,
  useUpdateParticipantMutation,
} from "@/redux/services/participants";

describe("to test the page", () => {
  beforeAll(() => {
    (useGetParticipantsQuery as jest.Mock).mockReturnValue({
      isLoading: false,
    });
    (useAddParticipantMutation as jest.Mock).mockReturnValue([
      jest.fn(),
      { isLoading: false },
    ]);
    (useUpdateParticipantMutation as jest.Mock).mockReturnValue([
      jest.fn(),
      { isLoading: false },
    ]);
    (useDeleteParticipantMutation as jest.Mock).mockReturnValue([
      jest.fn(),
      { isLoading: false },
    ]);
  });

  beforeEach(() => jest.clearAllMocks());

  test("to simulate error load data", () => {
    render(<Page />);
  });

  test("to simulate loading data", () => {
    (useGetParticipantsQuery as jest.Mock).mockReturnValue({
      isLoading: true,
    });
    render(<Page />);

    const circularProgress = screen.getByTestId("CircularProgress");
    expect(circularProgress).toBeInTheDocument();
  });

  test("to simulate failed load data", () => {
    (useGetParticipantsQuery as jest.Mock).mockReturnValue({
      data: generateResponse(sampleData, "failed"),
      isLoading: false,
    });
    render(<Page />);

    const findText = screen.getByText("Data not Available");
    expect(findText).toBeInTheDocument();
  });

  test("to simulate successfull load wihout data", () => {
    (useGetParticipantsQuery as jest.Mock).mockReturnValue({
      data: {
        success: true,
        code: 200,
      },
      isLoading: false,
    });
    render(<Page />);
  });

  test("to simulate successfull load data", () => {
    (useGetParticipantsQuery as jest.Mock).mockReturnValue({
      data: generateResponse(sampleData, "success"),
      isLoading: false,
    });
    render(<Page />);

    const findText = screen.getByText(sampleData[0].name);
    expect(findText).toBeInTheDocument();
  });

  test("simulate submit form", async () => {
    const addMock = jest.fn(() => ({
      unwrap: jest.fn().mockResolvedValue({}),
    }));
    (useAddParticipantMutation as jest.Mock).mockReturnValue([
      addMock,
      { isLoading: false },
    ]);

    render(<Page />);

    // find text field
    const nameField = screen.getByTestId("NameField");
    const genderField = screen.getByTestId("GenderSelect");
    const dateField = screen.getByTestId("datePicker");
    const emailField = screen.getByTestId("EmailField");
    const submitBtn = screen.getByText("Submit");

    // change the value
    fireEvent.change(nameField, { target: { value: "name mock" } });
    fireEvent.change(genderField, { target: { value: "Female" } });
    fireEvent.change(dateField, { target: { value: "2020-05-05" } });
    fireEvent.change(emailField, { target: { value: "email@test.com" } });

    fireEvent.submit(submitBtn);

    await waitFor(() => {
      expect(addMock).toHaveBeenCalled();
    });
  });

  test("to simulate edit data", async () => {
    const updateDataMock = jest.fn(() => ({
      unwrap: jest.fn().mockResolvedValue({}),
    }));
    (useUpdateParticipantMutation as jest.Mock).mockReturnValue([
      updateDataMock,
      { isLoading: false },
    ]);

    render(<Page />);

    const editIcons = screen.getAllByTestId("EditOutlined");

    await waitFor(() => {
      expect(editIcons[0]).toBeInTheDocument();
    });

    fireEvent.click(editIcons[0]);

    const nameField = screen.getByTestId("NameField");

    await waitFor(() => {
      expect(nameField.getAttribute("value")).toBe(sampleData[0].name);
    });

    const submitBtn = screen.getByText("Submit");
    fireEvent.submit(submitBtn);

    await waitFor(() => {
      expect(updateDataMock).toHaveBeenCalled();
    });
  });

  test("to simulate delete data", () => {
    const deleteMock = jest.fn();
    (useDeleteParticipantMutation as jest.Mock).mockReturnValue([
      deleteMock,
      { isLoading: false },
    ]);

    render(<Page />);

    const deletesIcon = screen.getAllByTestId("DeleteOutline");
    expect(deletesIcon[0]).toBeInTheDocument();

    fireEvent.click(deletesIcon[0]);

    // expect delete and cancel button tobe in the document
    const deleteButton = screen.getByText("Delete");
    const cancelButton = screen.getByText("Cancel");

    // simulate cancel first then click delete
    fireEvent.click(cancelButton);
    fireEvent.click(deletesIcon[0]);
    fireEvent.click(deleteButton);

    expect(deleteMock).toHaveBeenCalled();
  });
});
