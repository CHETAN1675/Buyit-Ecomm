import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, setSearch, setCategory } from "../Store/ProductSlice";
import { Container, Row, Col, Card, Form, Button,Spinner } from "react-bootstrap";
import { addToCart as addToCartAction } from "../Store/cartSlice";
import { toggleWishlist } from "../Store/wishlistSlice";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const Products = () => {
  const dispatch = useDispatch();
  const { list, search, category, loading, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = (product) => {
    dispatch(
      addToCartAction({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        description: product.description,
        category: product.category,
      })
    );
  };

  
  const filtered = list.filter(
    (p) =>
      (category === "all" || p.category === category) &&
      (p.title ?? "").toLowerCase().includes(search.toLowerCase())
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
            {[...new Set(list.map((p) => p.category).filter(Boolean))].map(
              (cat) => (
                <option key={cat} value={cat}>
                  {String(cat).charAt(0).toUpperCase() + String(cat).slice(1)}
                </option>
              )
            )}
          </Form.Select>
        </Col>
      </Row>

      {loading && <div><Spinner animation="border" /> <p>Loading products...</p></div> }
      {error && <p className="text-danger">{error}</p>}
      {!loading && filtered.length === 0 && <p>No products found.</p>}

      <Row>
        {filtered.map((product) => (
          <Col md={3} key={product.id} className="mb-3">
            <Card>
              <Link
                to={`/products/${product.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Card.Img variant="top" src={product.image}
                style={{ height: "220px", objectFit: "contain", background: "#fff" }}
                />
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text>₹{product.price}</Card.Text>
                  <Card.Text>Category: {product.category}</Card.Text>
                </Card.Body>
              </Link>

              <Card.Body>
                <Button
                  variant="outline-danger"
                  className="me-2"
                  onClick={() =>
                    dispatch(
                      toggleWishlist({
                        id: product.id,
                        title: product.title,
                        price: product.price,
                        image: product.image,
                        description: product.description,
                        category: product.category,
                      })
                    )
                  }
                >
                  <FaHeart />
                </Button>

                <Button variant="dark" onClick={() => handleAddToCart(product)}>
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
