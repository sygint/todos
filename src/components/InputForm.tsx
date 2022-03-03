import { FormEvent, useState } from "react";

type InputFormProps = {
  onSubmit: (data: string) => void;
  buttonText: string;
  placeholder: string;
  value?: string | undefined;
  hasCancel?: boolean;
  onCancel?: () => void;
};

export default function InputForm({
  onSubmit,
  buttonText,
  placeholder,
  value,
  hasCancel,
  onCancel,
}: InputFormProps) {
  const [data, setData] = useState<string>(value || "");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    onSubmit(data);
    setData("");
  }
  return (
    <form className="center-all" onSubmit={handleSubmit}>
      <input
        type="text"
        name="input"
        placeholder={placeholder}
        onChange={(e) => setData(e.target.value)}
        value={data}
      />
      <button>{buttonText}</button>
      {hasCancel && (
        <button type="button" onClick={onCancel}>
          cancel
        </button>
      )}
    </form>
  );
}
