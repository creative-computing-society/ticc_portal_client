import dayjs from "dayjs";
import { ISlotObject } from "../../types";
export interface IStepTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  number: number;
}

export interface ILabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export interface ISlotPickerProps {
  onSelectSlot: (slot: ISlotObject | null) => void;
  onDateChange?: (date: dayjs.Dayjs) => void;
  isMultiSelect?: boolean;
}
