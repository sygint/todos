import styled, { css } from "styled-components";

export const srOnly = css`
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

export const Container = styled.div`
  max-width: 50rem;
  padding: 2rem;
  margin: 0 auto;
`;

export const NoTasks = styled.div`
  margin: 2rem 0;
  text-align: center;
`;
