import { useAuth } from "@/auth/AuthContext";
import { Container } from "./style";
import { Link } from 'react-router-dom';

export default function TopNav() {
  const { isAuthenticated } = useAuth();
  return (
    <Container>
      {isAuthenticated && <Link to="/dashboard">Dashboard</Link>}
      <Link to="/">Home</Link>
      <Link to="/posts">Posts</Link>
      <Link to="/demo">Demo React</Link>
    </Container>
  );
}