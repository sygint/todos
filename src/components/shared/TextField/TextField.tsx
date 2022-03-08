import { ChangeEvent } from "react";
import { Label, Input } from "../atoms";

type TTextField = {
  label: string;
  placeholder?: string;
  id: string;
  value?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default function TextField({
  label,
  id,
  placeholder,
  value,
  onChange,
}: TTextField) {
  return (
    <>
      <Label htmlFor={id} srOnly={true}>
        {label}
      </Label>
      <Input
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="input"
      />
    </>
  );
}
