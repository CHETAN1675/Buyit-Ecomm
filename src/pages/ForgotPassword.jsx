import { useState } from "react";
import { Card, Container, Form, Button } from "react-bootstrap";
import { resetPasswordRequest } from "../api/authService";

export default function ForgotPassword() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;

    const res = await resetPasswordRequest(email);

    if (res.error) {
      setError(res.error.message);
      setMessage("");
    } else {
      setMessage("Password reset email sent");
      setError("");
    }
  };

  return (
    <Container className="d-flex justify-content-center mt-5">
      <Card style={{ width: "380px" }} className="p-4 shadow">
        <h3 className="text-center mb-3">Reset Password</h3>
        {error && <p className="text-danger text-center">{error}</p>}
        {message && <p className="text-success text-center">{message}</p>}
        <Form onSubmit={handleReset}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control name="email" type="email" required />
          </Form.Group>
          <Button type="submit" className="w-100">Send Reset Link</Button>
        </Form>
      </Card>
    </Container>
  );
}
