import { useState } from "react";
import {
  Container,
  Title,
  InfoText,
  Button,
  StyledInput,
  Label
} from "./style";

export default function CombinedComponent() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  // --- Variables locales ---
  const prenom = "Jean-Christophe";
  const upperName = prenom.toUpperCase();
  const color = count > 5 ? "#00e676" : "#f5b342";
  const message = count > 5 ? "Bravo 🎉" : "Continue !";

  // --- Gestion de la saisie ---
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value);

  return (
    <Container>
      <Title>Démo combinée : variables + état</Title>

      <InfoText>Bonjour {prenom} !</InfoText>
      <InfoText>En majuscules : {upperName}</InfoText>

      <InfoText $color={color}>Compteur : {count}</InfoText>
      <InfoText>{message}</InfoText>

      <Button onClick={() => setCount((c) => c + 1)}>+1</Button>

      <Label>
        Saisie :
        <StyledInput
          value={text}
          onChange={handleChange}
          placeholder="Tape quelque chose..."
        />
      </Label>

      <InfoText>Texte actuel : {text || "—"}</InfoText>
      <InfoText>Longueur : {text.length}</InfoText>
    </Container>
  );
}
