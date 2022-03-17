import { ReactNode, ChangeEvent } from "react";
import { Label, Checkbox } from "./atoms";

type CheckboxFieldProps = {
  id: string;
  label: string;
  isChecked: boolean;
  checkbox?: () => ReactNode;
  onChange: (isChecked: boolean) => void;
};

function CheckboxField({
  id,
  label,
  isChecked = false,
  checkbox,
  onChange,
}: CheckboxFieldProps) {
  return (
    <Label className="todo" htmlFor={id} data-content={label}>
      <Checkbox
        type="checkbox"
        id={id}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          onChange(event.target.checked)
        }
        defaultChecked={isChecked}
        className="todo__state"
      />
      {checkbox && checkbox()} <div className="todo__text">{label}</div>
    </Label>
  );
}

CheckboxField.defaultProps = {
  checkbox: () => {},
};

export default CheckboxField;
