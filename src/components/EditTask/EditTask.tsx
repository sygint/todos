import { InputForm } from "../";

type TEditTask = {
  onEdit: (data: string) => void;
  value?: string | undefined;
  onCancel: () => void;
};

export default function EditTask({
  onEdit,
  value,
  onCancel,
}: TEditTask) {
  return (
    <InputForm
      onSubmit={onEdit}
      buttonText="save"
      label="Edit a task"
      value={value}
      hasCancel={true}
      onCancel={onCancel}
    />
  );
}
