import { useState } from "react";
import { Wrapper, Button } from "./style";
import CountDisplay from "../CountDisplay";

export default function ClickCounter() {
  const [count, setCount] = useState(0);

  return (
    <Wrapper>
        <CountDisplay count={count} title="Affichage des clicks" />
        <Button onClick={() => setCount((c) => c + 1)}>Clique ici</Button>
    </Wrapper>
  );
}