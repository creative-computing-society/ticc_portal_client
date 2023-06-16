import dayjs from "dayjs";
export interface IStepTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  number: number;
}

export interface ILabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export interface ISlotPickerProps {
  onSelectSlot: (slot: dayjs.Dayjs | null) => void;
  onDateChange?: (date: dayjs.Dayjs) => void;
  isMultiSelect?: boolean;
}
