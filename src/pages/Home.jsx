import "./Home.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCategory } from "../Store/ProductSlice";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const goToCategory = (cat) => {
    dispatch(setCategory(cat));
    navigate("/products");
  };

  return (
    <div className="home">

      {/* Hero Banner */}
      <section className="hero">
          <div className="overlay"></div>
        <div className="hero-text">
          <h1>BIG WINTER SALE</h1>
          <p>Flat 50% off on all premium fashion brands</p>
          <Link to="/products" className="shop-btn">Shop Now</Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories">
        <h2>BROWSE OUR CURATED SELECTIONS</h2>
        <div className="category-grid">
          <div onClick={() => goToCategory("Mens")}>
            <img src="/images/Men.webp" />
            <span>Men</span>
          </div>

          <div onClick={() => goToCategory("Women")}>
            <img src="/images/women.webp" />
            <span>Women</span>
          </div>

          <div onClick={() => goToCategory("Boys")}>
            <img src="/images/boys.webp" />
            <span>Boys</span>
          </div>

          <div onClick={() => goToCategory("Girls")}>
            <img src="/images/Girls.webp" />
            <span>Girls</span>
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section className="popular">
        <h2>SHOP TRENDS</h2>
        <p>Check out our hot selling and trending products</p>
        <div className="popular-grid">
          <img src="/images/trending1.webp" onClick={() => goToCategory("Mens")} />
          <img src="/images/trending2.webp" onClick={() => goToCategory("Women")} />
          <img src="/images/trending3.webp" onClick={() => goToCategory("Mens")} />
          <img src="/images/trending4.webp" onClick={() => goToCategory("Women")} />
        </div>
      </section>

      {/* Offer Banner */}
      <section className="offer-banner">
        <img src="/images/offerbanner.webp" />
      </section>

    </div>
  );
};

export default Home;
