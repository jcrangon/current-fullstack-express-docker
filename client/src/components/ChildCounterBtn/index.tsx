import { Wrapper, Button } from "./style";

export default function ChildCounterBtn({ onAdd }: { onAdd: (n: number) => void }) {
  return (
    <Wrapper>
      <Button onClick={() => onAdd(5)}>Ajouter +5 (depuis l’enfant)</Button>
    </Wrapper>
  );
}