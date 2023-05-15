import { ILabelProps } from "./types";

export const Label: React.FC<ILabelProps> = (props) => {
  const { children, className, ...rest } = props;
  return (
    <label {...rest} className={`text-lg font-semibold ${className}`}>
      {children}
    </label>
  );
};
