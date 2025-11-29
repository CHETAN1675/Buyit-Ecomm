import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, setSearch, setCategory } from "../Store/ProductSlice";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { addToCart } from "../Store/cartSlice";

const Products = () => {
  const dispatch = useDispatch();
  const { list, search, category, loading, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  
  const filtered = list.filter(
    (p) =>
      (category === "all" || p.category === category) &&
      p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container className="mt-4">
      <h3>Products</h3>

    
      <Row className="my-3">
        <Col md={6}>
          <Form.Control
            placeholder="Search products..."
            value={search}
            onChange={(e) => dispatch(setSearch(e.target.value))}
          />
        </Col>
        <Col md={3}>
          <Form.Select
            value={category}
            onChange={(e) => dispatch(setCategory(e.target.value))}
          >
            <option value="all">All Categories</option>
            {[...new Set(list.map((p) => p.category))].map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>

     
      {loading && <p>Loading products...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && filtered.length === 0 && <p>No products found.</p>}

     
      <Row>
        {filtered.map((product) => (
          <Col md={3} key={product.id} className="mb-3">
            <Card>
              <Card.Img variant="top" src={product.image} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>₹{product.price}</Card.Text>
                <Card.Text>Category: {product.category}</Card.Text>
                <Button
                  variant="dark"
                  onClick={() => dispatch(addToCart(product))}
                >
                  Add to Cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Products;
