import InputForm from "./InputForm";

type AddTaskProps = {
  onAdd: (data: string) => void;
  value?: string | undefined;
};

export default function AddTask({ onAdd, value }: AddTaskProps) {
  return (
    <InputForm
      onSubmit={onAdd}
      buttonText="add task"
      placeholder="enter a task"
      value={value}
    />
  );
}
