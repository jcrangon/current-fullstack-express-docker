import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/auth/AuthContext";
import {
  Container,
  Card,
  Title,
  Form,
  Field,
  Label,
  Input,
  ErrorText,
  SubmitButton,
  FooterText,
  Row,
  CheckboxLabel,
  Checkbox,
} from "./style";
import Header from "@/components/Header";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false); // si tu veux brancher une logique plus tard
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return setError("Email invalide.");
    }
    if (password.length < 6) {
      return setError("Mot de passe trop court (min. 6).");
    }


    try {
      setLoading(true);
      await login(email.trim(), password);
      // TODO: si tu veux persister un "remember me", c'est ici (localStorage, etc.)
      navigate("/", { replace: true });
    } catch (err: any) {
      const status = err?.response?.status;
      if (status === 401) setError("Email ou mot de passe incorrect.");
      else setError("Impossible de se connecter pour le moment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Header />
      <Card>
        <Title>Se connecter</Title>

        <Form onSubmit={onSubmit} noValidate>
          <Field>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@exemple.com"
              disabled={loading}
              required
            />
          </Field>

          <Field>
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={loading}
              required
              minLength={6}
            />
          </Field>

          <Row>
            <CheckboxLabel>
              <Checkbox
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                disabled={loading}
              />
              Se souvenir de moi
            </CheckboxLabel>

            {/* Exemple si tu ajoutes plus tard une page de reset */}
            {/* <Link to="/forgot">Mot de passe oublié ?</Link> */}
          </Row>

          {error && <ErrorText role="alert">{error}</ErrorText>}

          <SubmitButton type="submit" disabled={loading}>
            {loading ? "Connexion…" : "Se connecter"}
          </SubmitButton>
        </Form>

        <FooterText>
          Pas encore de compte ? <Link to="/register">Créer un compte</Link>
        </FooterText>
      </Card>
    </Container>
  );
}
