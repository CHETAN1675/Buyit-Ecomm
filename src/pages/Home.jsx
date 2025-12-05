import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">

      {/* Hero Banner */}
      <section className="hero">
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
          <Link to="/products?cat=Men"><img src="/images/Men.webp" /><span>Men</span></Link>
          <Link to="/products?cat=Women"><img src="/images/women.webp" /><span>Women</span></Link>
          <Link to="/products?cat=boys"><img src="/images/boys.webp" /><span>Boys</span></Link>
          <Link to="/products?cat=girls"><img src="/images/Girls.webp" /><span>Girls</span></Link>
        </div>
      </section>

      {/* Popular Products */}
      <section className="popular">
        <h2>SHOP TRENDS</h2>
        <p>Check out our hot selling and trending products</p>
        <div className="popular-grid">
          {/* Map real products later */}
          <img src="/images/trending1.webp" />
          <img src="/images/trending2.webp" />
          <img src="/images/trending3.webp" />
          <img src="/images/trending4.webp" />
        </div>
      </section>

      {/* Offer Banner */}
      <section className="offer-banner">
        <img src="/images/offer-banner.jpg" />
      </section>

    </div>
  );
};

export default Home;
