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
`;

export const Checkbox = styled.input``;

export const Input = styled.input``;
