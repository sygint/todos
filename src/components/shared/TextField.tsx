import { ChangeEvent } from "react";
import { Label, Input } from "./styles";

type TextFieldProps = {
  label: string;
  placeholder?: string;
  id: string;
  value?: string;
  onChange: (value: string) => void;
};

function TextField({
  label,
  id,
  placeholder,
  value,
  onChange,
}: TextFieldProps) {
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) =>
    onChange(event.currentTarget.value);

  return (
    <>
      <Label htmlFor={id} srOnly>
        {label}
      </Label>
      <Input
        id={id}
        name={id}
        placeholder={placeholder}
        value={value}
        onChange={handleOnChange}
        className="input"
      />
    </>
  );
}

TextField.defaultProps = {
  placeholder: "",
  value: null,
};

export default TextField;
