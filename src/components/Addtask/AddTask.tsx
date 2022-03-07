import { InputForm } from "../";

type AddTaskProps = {
  onAdd: (data: string) => void;
  value?: string | undefined;
};

export default function AddTask({ onAdd, value }: AddTaskProps) {
  return (
    <InputForm
      onSubmit={onAdd}
      buttonText="Add"
      label="Add a task"
      placeholder="Buy milk"
      value={value}
    />
  );
}
