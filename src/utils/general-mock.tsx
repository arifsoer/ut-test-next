import dayjs from "dayjs";

jest.mock("@/redux/services/participants", () => ({
  useGetParticipantsQuery: jest.fn().mockReturnValue({}),
  useAddParticipantMutation: jest.fn().mockReturnValue([jest.fn(), {}]),
  useUpdateParticipantMutation: jest.fn().mockReturnValue([jest.fn(), {}]),
  useDeleteParticipantMutation: jest.fn().mockReturnValue([jest.fn(), {}]),
}));

jest.mock("@mui/x-date-pickers", () => ({
  ...jest.requireActual("@mui/x-date-pickers"),
  DatePicker: jest.fn((props) => (
    <input
      data-testid="datePicker"
      {...props}
      onChange={(e) => {
        const value = e.target.value;
        props.onChange(dayjs(value));
      }}
    />
  )),
}));
