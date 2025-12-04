import { useState } from "react";
import { Card, Container, Form, Button } from "react-bootstrap";
import { loginRequest } from "../api/authService";
import { useDispatch } from "react-redux";
import { login as loginAction } from "../Store/authSlice";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const res = await loginRequest(email, password);

    if (res.error) {
      setError(res.error.message);
    } else {
      dispatch(loginAction({ email: res.email, uid: res.localId, token: res.idToken }));
      navigate("/");
    }
  };

  return (
    <Container className="d-flex justify-content-center mt-5">
      <Card style={{ width: "380px" }} className="p-4 shadow">
        <h3 className="text-center mb-3">Login</h3>
        {error && <p className="text-danger text-center">{error}</p>}
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control name="email" type="email" required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control name="password" type="password" required />
          </Form.Group>
          <Button type="submit" className="w-100">Login</Button>
        </Form>

        <div className="text-center mt-2">
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>

        <div className="text-center mt-3">
          New here? <Link to="/signup">Create an account</Link>
        </div>
      </Card>
    </Container>
  );
}
