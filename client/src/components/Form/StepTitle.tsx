import { IStepTitleProps } from "./types";

const StepTitle: React.FC<IStepTitleProps> = ({
  number,
  children,
  ...rest
}) => {
  return (
    <h1
      {...rest}
      className={
        "text-4xl font-semibold mb-8 self-start pb-1 border-b-4 " +
        rest.className
      }
    >
      Step {number}: {children}
    </h1>
  );
};

export default StepTitle;
