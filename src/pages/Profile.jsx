import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container, Form, Button, Card } from "react-bootstrap";

const Profile = () => {
  const user = useSelector(state => state.auth.user);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const fetchProfile = async () => {
    try {
      const res = await fetch(
        `https://buyite-comm-default-rtdb.firebaseio.com/users/${user.uid}/profile.json`
      );
      const data = await res.json();

      if (data) {
        setName(data.name || "");
        setPhone(data.phone || "");
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  const saveProfile = async () => {
    try {
      const body = { name, phone, email: user.email };

      await fetch(
        `https://buyite-comm-default-rtdb.firebaseio.com/users/${user.uid}/profile.json`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }
      );

      alert("Profile updated");
    } catch (err) {
      console.error("Error saving profile:", err);
      alert("Could not update profile");
    }
  };

  useEffect(() => {
    if (user) fetchProfile();
  }, [user]);


  return (
    <Container className="mt-4" style={{ maxWidth: "500px" }}>
      <Card className="p-4 shadow-sm">
        <h3>User Profile</h3>

        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Email (cannot change)</Form.Label>
            <Form.Control type="email" value={user.email} disabled />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control 
              type="text" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              placeholder="Enter your full name" 
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control 
              type="text" 
              value={phone} 
              onChange={e => setPhone(e.target.value)} 
              placeholder="Enter phone number" 
            />
          </Form.Group>

          <Button variant="primary" onClick={saveProfile}>Save Profile</Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Profile;
