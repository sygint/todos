import { ReactChild, useState } from "react";
import styled from "styled-components";
import { Button } from "./styles";

type Props = {
  menuText: string;
  content: ReactChild;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const CollapsibleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const Collapsible = styled.div`
  display: ${(p: { isCollapsed: boolean }) =>
    p.isCollapsed ? "none" : "grid"};

  grid-auto-rows: auto;
  gap: 0.5rem;
`;

export default function Dropdown({ menuText, content }: Props) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <Container>
      <Button onClick={() => setIsCollapsed(!isCollapsed)}>{menuText}</Button>
      <CollapsibleContainer>
        <Collapsible isCollapsed={isCollapsed}>{content}</Collapsible>
      </CollapsibleContainer>
    </Container>
  );
}
