import styled from "styled-components";

export const TaskListContainer = styled.ul`
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
`;

export const TaskListItem = styled.li`
  border-bottom: 1px solid #ccc;

  &:last-child {
    border-bottom: 0;
  }

  &:hover {
    .edit-button,
    .delete-button {
      visibility: visible;
    }
  }
`;

export const NoTasksContainer = styled.div`
  margin: 2rem 0;
  text-align: center;
`;

export const TaskContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: min-content auto min-content min-content;
  gap: 0.5rem;
  align-items: center;
`;

export const Checkbox = styled.input`
  // display: none;
  // position: absolute;
  // top: 0;
  // left: 0;
  // opacity: 0;
  width: 18px;
  height: 18px;

  &:checked {
    + label {
      transition-delay: 0s;
      color: #5ebec1;
      opacity: 0.6;
    }

    ~ .todo__icon .todo__box {
      stroke-dashoffset: 80;
      transition-delay: 0s;
    }
    ~ .todo__icon .todo__line {
      stroke-dashoffset: -5;
    }
    ~ .todo__icon .todo__check {
      stroke-dashoffset: 0;
      transition-delay: 0.5s;
    }
    ~ .todo__icon .todo__circle {
      animation-name: explode;
    }
  }
`;

export const Label = styled.label`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  cursor: pointer;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  padding: 0.75rem 0;

  &:last-child {
    border-bottom: none;
  }
`;

export const TaskText = styled.span`
  margin-left: 0.25rem;
  color: saturate(#1b4a4e, 15%);
  font-size: 14px;
  transition: all $duration / 2 linear $duration / 2;
`;
