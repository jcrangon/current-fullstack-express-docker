import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "@/axios/axios"; // ton instance Axios mono + intercepteur
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
} from "./style";
import { useAuth } from "@/auth/AuthContext";
import Header from "@/components/Header";

type FormState = {
  name: string;
  email: string;
  password: string;
  confirm: string;
};

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth(); // pour auto-login après register
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const onChange =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((f) => ({ ...f, [key]: e.target.value }));
    };

  const validate = () => {
    if (!form.name.trim()) return "Le nom est requis.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return "Email invalide.";
    if (form.password.length < 6) return "Mot de passe trop court (min. 6).";
    if (form.password !== form.confirm) return "Les mots de passe ne correspondent pas.";
    return "";
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const msg = validate();
    if (msg) return setError(msg);

    try {
      setLoading(true);
      // 1) Création du compte
      await api.post("/auth/register", {
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
      });

      // 2) Auto-login (ton /auth/login pose le cookie httpOnly + renvoie refreshToken)
      await login(form.email.trim(), form.password);

      // 3) Redirection
      navigate("/", { replace: true });
    } catch (err: any) {
      // Gestion 409 / autres
      const status = err?.response?.status;
      if (status === 409) setError("Un utilisateur existe déjà avec cet email.");
      else setError("Impossible de créer le compte. Réessaie plus tard.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Header />
      <Card>
        <Title>Créer un compte</Title>

        <Form onSubmit={onSubmit} noValidate>
          <Field>
            <Label htmlFor="name">Nom</Label>
            <Input
              id="name"
              type="text"
              autoComplete="name"
              value={form.name}
              onChange={onChange("name")}
              placeholder="Ex: Jean Dupont"
              disabled={loading}
              required
            />
          </Field>

          <Field>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={onChange("email")}
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
              autoComplete="new-password"
              value={form.password}
              onChange={onChange("password")}
              placeholder="••••••••"
              disabled={loading}
              required
              minLength={6}
            />
          </Field>

          <Field>
            <Label htmlFor="confirm">Confirmer le mot de passe</Label>
            <Input
              id="confirm"
              type="password"
              autoComplete="new-password"
              value={form.confirm}
              onChange={onChange("confirm")}
              placeholder="••••••••"
              disabled={loading}
              required
              minLength={6}
            />
          </Field>

          {error && <ErrorText role="alert">{error}</ErrorText>}

          <SubmitButton type="submit" disabled={loading}>
            {loading ? "Création en cours…" : "Créer mon compte"}
          </SubmitButton>
        </Form>

        <FooterText>
          Déjà inscrit ? <Link to="/login">Se connecter</Link>
        </FooterText>
      </Card>
    </Container>
  );
}
