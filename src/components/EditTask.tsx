import { useState, FormEvent } from "react";

import TextField from "./shared/TextField";
import { Button, Form } from "./shared/styles";

type TEditTask = {
  onEdit: (data: string) => void;
  value?: string | undefined;
  onCancel?: () => void;
};

function EditTask({ onEdit, value, onCancel }: TEditTask) {
  const [taskName, setTaskName] = useState(value || "");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onEdit(taskName);
  };

  return (
    <Form onSubmit={handleSubmit} hasCancel>
      <TextField
        id="editTask"
        label="Edit a task"
        placeholder="Buy Milk"
        value={taskName}
        onChange={setTaskName}
      />
      <Button className="button is-primary">Save</Button>
      <Button className="button" type="button" onClick={onCancel}>
        cancel
      </Button>
    </Form>
  );
}

EditTask.defaultProps = {
  value: "",
  onCancel: () => {},
};

export default EditTask;
