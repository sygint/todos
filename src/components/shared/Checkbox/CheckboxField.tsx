import { ReactNode } from "react";
import { ChangeEvent } from "react";
import { Label, Checkbox } from "../atoms";

type CheckboxFieldProps = {
  id: string;
  label: string;
  isChecked: boolean;
  onChange: (isChecked: boolean) => void;
};

export default function CheckboxField({
  id,
  label,
  isChecked = false,
  onChange,
}: CheckboxFieldProps) {
  return (
    <>
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
        {" "}
        <div className="">{label}</div>
      </Label>
    </>
  );
}
