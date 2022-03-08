import styled, { css } from "styled-components";

const srOnly = css`
  position: absolute !important;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`;

const colors = {
  black: "#363839",
  lightGray: "#9c9e9f",
  gray: "#bdc1c6",
  white: "#fff",
  green: "#00d1b2",
};

export const Container = styled.div`
  max-width: 50rem;
  padding: 2rem;
  margin: 0 auto;
`;

export const Form = styled.form`
  display: grid;
  gap: 1rem;
  align-items: center;

  grid-template-columns: ${({ hasCancel = false }: { hasCancel?: boolean }) =>
    hasCancel ? "auto 5rem 5rem" : "auto 5rem"};
`;

export const Button = styled.button``;

export const Label = styled.label`
  ${(props: { srOnly?: boolean }) => props.srOnly && srOnly}

  position: relative;
  cursor: pointer;
  font-size: 1.5em;
  font-weight: 600;
  user-select: none;
  &::before {
    position: absolute;
    content: attr(data-content);
    color: ${colors.lightGray};
    clip-path: polygon(0 0, 0 0, 0% 100%, 0 100%);
    text-decoration: line-through;
    text-decoration-thickness: 3px;
    text-decoration-color: ${colors.black};
    transition: clip-path 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
`;

export const Checkbox = styled.input`
  position: relative;
  width: 1.5rem;
  height: 1.5rem;
  color: ${colors.black};
  border: 1px solid ${colors.gray};
  border-radius: 4px;
  appearance: none;
  outline: 0;
  cursor: pointer;
  transition: background 175ms cubic-bezier(0.1, 0.1, 0.25, 1);
  &::before {
    position: absolute;
    content: "";
    display: block;
    top: 2px;
    left: 7px;
    width: 8px;
    height: 14px;
    border-style: solid;
    border-color: ${colors.white};
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
    opacity: 0;
  }
  &:checked {
    color: ${colors.white};
    border-color: ${colors.green};
    background: ${colors.green};
    &::before {
      opacity: 1;
    }
    ~ label::before {
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    }
  }
`;

export const Input = styled.input``;
