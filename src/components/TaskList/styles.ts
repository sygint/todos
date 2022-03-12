import styled from "styled-components";

export const TaskContainer = styled.div`
  display: grid;
  grid-template-columns: 1.5rem auto 5rem 5rem;
  gap: 1rem;
  align-items: center;
`;

export const TaskListContainer = styled.ul`
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
`;

export const TaskListItem = styled.li`
  padding: 1rem;
  border-bottom: 1px solid #ccc;
  &:last-child {
    border-bottom: 0;
  }
`;

export const NoTasksContainer = styled.div`
  margin: 2rem 0;
  text-align: center;
`;
