import { ChangeEvent } from "react";
import { Label, Input } from "./styles";

type TextFieldProps = {
  label: string;
  placeholder?: string;
  id: string;
  value?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

function TextField({
  label,
  id,
  placeholder,
  value,
  onChange,
}: TextFieldProps) {
  return (
    <>
      <Label htmlFor={id} srOnly>
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

TextField.defaultProps = {
  placeholder: "",
  value: "",
};

export default TextField;
