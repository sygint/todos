import InputForm from "./InputForm";

type EditTaskProps = {
  onEdit: (data: string) => void;
  value?: string | undefined;
  onCancel: () => void;
};

export default function EditTask({
  onEdit: onEdit,
  value,
  onCancel,
}: EditTaskProps) {
  return (
    <InputForm
      onSubmit={onEdit}
      buttonText="save"
      placeholder="edit a task"
      value={value}
      hasCancel={true}
      onCancel={onCancel}
    />
  );
}
