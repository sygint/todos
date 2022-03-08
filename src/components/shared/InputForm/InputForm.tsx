import { useState, FormEvent, ChangeEvent } from "react";

import { Button, TextField, Form } from "../..";

type TInputForm = {
  onSubmit: (data: string) => void;
  buttonText: string;
  label: string;
  placeholder?: string;
  value?: string | undefined;
  hasCancel?: boolean;
  onCancel?: () => void;
};

export default function InputForm({
  onSubmit,
  buttonText,
  label,
  placeholder,
  value,
  hasCancel,
  onCancel,
}: TInputForm) {
  const [data, setData] = useState<string>(value || "");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    onSubmit(data);
    setData("");
  }

  return (
    <Form onSubmit={handleSubmit} hasCancel={hasCancel}>
      <TextField
        id="input"
        label={label}
        placeholder={placeholder}
        value={data}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setData(e.target.value)}
      />
      <Button className="button is-primary">{buttonText}</Button>
      {hasCancel && (
        <Button className="button" type="button" onClick={onCancel}>
          cancel
        </Button>
      )}
    </Form>
  );
}
