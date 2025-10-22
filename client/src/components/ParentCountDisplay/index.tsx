import { useState } from "react";
import ChildCounterBtn from "@/components/ChildCounterBtn";
import { Wrapper } from "./style";


export default function ParentCountDisplay() {
  const [count, setCount] = useState(0);

  const handleAdd = (n: number) => {
    setCount(count + n)
  }
  return (
    <Wrapper>
      <h3>Compteur : {count}</h3>
      {/* <ChildCounterBtn onAdd={(n) => setCount((c) => c + n)} /> */}
      <ChildCounterBtn onAdd={handleAdd} />
    </Wrapper>
  );
}