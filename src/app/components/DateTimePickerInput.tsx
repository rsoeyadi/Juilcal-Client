import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers";

type DateTimePickerInputProps = {
  title: string;
  isDatePicker: boolean;
};

const today = dayjs();

export const DateTimePickerInput = ({
  title,
  isDatePicker,
}: DateTimePickerInputProps) => {
  if (isDatePicker) {
    return (
      <div>
        <DatePicker
          defaultValue={today}
          label={title}
          views={["year", "month", "day"]}
          onChange={() => {
            
          }}
        />
      </div>
    );
  }
  return (
    <div>
      <TimePicker
        defaultValue={today}
        label={title}
      />
    </div>
  );
};
