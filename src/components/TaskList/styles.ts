import styled from "styled-components";

import CheckboxField from "../shared/CheckboxField";

export const TaskListContainer = styled.ul`
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
`;

export const TaskListItem = styled.li`
  padding: 0.5rem;
  border-bottom: 1px solid #ccc;
  &:last-child {
    border-bottom: 0;
  }
`;

export const NoTasksContainer = styled.div`
  margin: 2rem 0;
  text-align: center;
`;

export const TaskContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: auto min-content min-content;
  gap: 0.5rem;
  align-items: center;
`;

export const TaskCheckbox = styled(CheckboxField)``;
