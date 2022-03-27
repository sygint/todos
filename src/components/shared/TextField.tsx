import { ChangeEvent } from "react";

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
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type="text"
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
