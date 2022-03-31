import { useState, FormEvent } from "react";
import styled from "styled-components";

import TextField from "./shared/TextField";
import { Button, Form } from "./shared/styles";

type Props = {
  onAdd: (data: string) => void;
};

const AddTaskForm = styled(Form)`
  padding: 1rem 0.5rem;
`;

export default function AddTask({ onAdd }: Props) {
  const [newTask, setNewTask] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onAdd(newTask);
    setNewTask("");
  };

  return (
    <AddTaskForm onSubmit={handleSubmit}>
      <TextField
        id="addName"
        label="Add a task"
        placeholder="Buy Milk"
        value={newTask}
        onChange={setNewTask}
      />
      <Button className="button is-primary">Add</Button>
    </AddTaskForm>
  );
}
