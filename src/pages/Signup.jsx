import { useState } from "react";
import { Card, Container, Form, Button } from "react-bootstrap";
import { signupRequest } from "../api/authService";
import useAuth from "../hooks/useAuth";

export default function Signup() {
  const { login } = useAuth();
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const res = await signupRequest(email, password);

    if (res.error) {
      setError(res.error.message);
    } else {
      login({ email: res.email, localId: res.localId }, res.idToken);
    }
  };

  return (
    <Container className="d-flex justify-content-center mt-5">
      <Card style={{ width: "380px" }} className="p-4 shadow">
        <h3 className="text-center mb-3">Create Account</h3>
        {error && <p className="text-danger text-center">{error}</p>}
        <Form onSubmit={handleSignup}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control name="email" type="email" required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control name="password" type="password" required />
          </Form.Group>
          <Button type="submit" className="w-100">Sign Up</Button>
        </Form>
      </Card>
    </Container>
  );
}
