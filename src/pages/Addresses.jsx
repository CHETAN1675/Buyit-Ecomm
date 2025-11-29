import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";

const Addresses = () => {
  const user = useSelector(state => state.auth.user);
  const [address, setAddress] = useState("");
  const [addresses, setAddresses] = useState([]);

  // Fetch existing addresses
  const fetchAddresses = async () => {
    try {
      const res = await fetch(
        `https://buyite-comm-default-rtdb.firebaseio.com/users/${user.uid}/addresses.json`
      );
      const data = await res.json();

      if (!data) {
        setAddresses([]);
        return;
      }

      const list = Object.keys(data).map(id => ({
        id,
        ...data[id]
      }));

      setAddresses(list);
    } catch (err) {
      console.error("Error fetching addresses:", err);
    }
  };

  // Add new address
  const addAddress = async () => {
    if (!address.trim()) return alert("Please enter a valid address");

    try {
      await fetch(
        `https://buyite-comm-default-rtdb.firebaseio.com/users/${user.uid}/addresses.json`,
        {
          method: "POST",
          body: JSON.stringify({ text: address }),
        }
      );

      setAddress("");
      fetchAddresses();
    } catch (err) {
      console.error("Error adding address:", err);
    }
  };

  // Delete an address
  const deleteAddress = async (id) => {
    try {
      await fetch(
        `https://buyite-comm-default-rtdb.firebaseio.com/users/${user.uid}/addresses/${id}.json`,
        { method: "DELETE" }
      );

      fetchAddresses();
    } catch (err) {
      console.error("Error deleting address:", err);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, [user]);

  return (
    <Container className="mt-4">
      <Card className="p-4 shadow-sm">
        <h3>Saved Addresses</h3>

       
        <Form className="mb-4">
          <Form.Label>Add New Address</Form.Label>    {/* Add Address */}
          <Form.Control
            placeholder="Enter address"
            value={address}
            onChange={e => setAddress(e.target.value)}
          />
          <Button className="mt-2" onClick={addAddress}>
            Save Address
          </Button>
        </Form>

       
        <h5>Your Addresses</h5>    {/* List of Addresses */}
        {addresses.length === 0 && <p>No saved addresses found.</p>}

        {addresses.map(addr => (
          <Card key={addr.id} className="p-3 mb-2">
            <Row>
              <Col>{addr.text}</Col>
              <Col md="auto">
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => deleteAddress(addr.id)}
                >
                  Delete
                </Button>
              </Col>
            </Row>
          </Card>
        ))}
      </Card>
    </Container>
  );
};

export default Addresses;
