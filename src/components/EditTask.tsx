import InputForm from "./shared/InputForm";

type TEditTask = {
  onEdit: (data: string) => void;
  value?: string | undefined;
  onCancel: () => void;
};

function EditTask({ onEdit, value, onCancel }: TEditTask) {
  return (
    <InputForm
      onSubmit={onEdit}
      buttonText="save"
      label="Edit a task"
      value={value}
      hasCancel
      onCancel={onCancel}
    />
  );
}

EditTask.defaultProps = {
  value: "",
};

export default EditTask;
