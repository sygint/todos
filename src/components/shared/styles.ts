import styled from "styled-components";

import { srOnly } from "../styles";

export const Form = styled.form`
  display: grid;
  gap: 1rem;
  align-items: center;

  grid-template-columns: ${({ hasCancel = false }: { hasCancel?: boolean }) =>
    hasCancel ? "auto 5rem 5rem" : "auto 5rem"};
`;

export const Button = styled.button``;
export const IconButton = styled.button`
  border: 0;
  padding: 0;
  background: none;
  cursor: pointer;
`;

export const Label = styled.label`
  ${(props: { srOnly?: boolean }) => props.srOnly && srOnly}
`;

export const Checkbox = styled.input``;

export const Input = styled.input``;

export const SROnly = styled.span`
  ${srOnly}
`;
