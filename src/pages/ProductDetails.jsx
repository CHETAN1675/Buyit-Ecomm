import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../Store/cartSlice";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { useState } from "react";
import "./ProductDetails.css"

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) =>
    state.products.list.find((p) => p.id === id)
  );
  const [quantity, setQuantity] = useState(1);

  if (!product) return <p>Product not found</p>;

  return (
  <Container className="mt-5">
    <Row className="align-items-center">
      <Col md={6} className="text-center">
        <div className="product-image-box">
          <Image
            src={product.image}
            alt={product.title}
            className="product-image"
            fluid
          />
        </div>
      </Col>

      <Col md={6}>
        <h2 className="product-title mb-3">{product.title}</h2>
        <p className="product-description">{product.description}</p>
        <h3 className="product-price my-3">₹{product.price}</h3>

        {product.category && (
          <p className="product-category">
            Category: <span>{product.category}</span>
          </p>
        )}

        <div className="quantity-box my-4">
          <label>Qty:</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="quantity-input"
          />
        </div>

        <Button
          variant="dark"
          size="lg"
          className="add-cart-btn"
          onClick={() => dispatch(addToCart({ ...product, quantity }))}
        >
          Add to Cart
        </Button>
      </Col>
    </Row>
  </Container>
);
};

export default ProductDetails;
