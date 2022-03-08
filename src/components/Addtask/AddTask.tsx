import styled from "styled-components";

import { InputForm } from "../";

type AddTaskProps = {
  onAdd: (data: string) => void;
  value?: string | undefined;
};

const AddTaskWrapper = styled.div`
  padding: 1rem;
`;

export default function AddTask({ onAdd, value }: AddTaskProps) {
  return (
    <AddTaskWrapper>
      <InputForm
        onSubmit={onAdd}
        buttonText="Add"
        label="Add a task"
        placeholder="Buy milk"
        value={value}
      />
    </AddTaskWrapper>
  );
}
