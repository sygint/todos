import styled from "styled-components";

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

export const Checkbox = styled.input`
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;

  &:checked {
    ~ span {
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
  display: block;
  position: relative;
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }
`;

export const TaskText = styled.span`
  margin-left: 45px;
  color: saturate(#1b4a4e, 15%);
  transition: all $duration / 2 linear $duration / 2;
`;
