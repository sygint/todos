import styled from "styled-components";

export const Form = styled.form`
  display: grid;
  gap: 1rem;
  align-items: center;

  grid-template-columns: ${({ hasCancel = false }: { hasCancel?: boolean }) =>
    hasCancel ? "auto 5rem 5rem" : "auto 5rem"};
`;

export const Checkbox = styled.input``;
export const Label = styled.label``;
export const Button = styled.button``;
export const IconButton = styled.button`
  border: 0;
  padding: 0;
  background: none;
  cursor: pointer;

  ${(props: { hide?: boolean }) => props.hide && "visibility: hidden;"}
`;
