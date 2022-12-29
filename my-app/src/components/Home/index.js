import "./index.css";
import Header from "../Header";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="homepage-main-container">
      <Header />
      <div className="home-container">
        <div className="home-page-text-container">
          <h1 className="homepage-clothes-heading">
            Clothes That Get You Noticed
          </h1>
          <p className="home-page-text">
            It's no secret that your business needs informative, value-added,
            search engine optimized content that meets the needs of your
            consumers. Our unique content service for fashion shops saves you
            time, resources, and helps you optimize your product presentation,
            categorization, and search function.
          </p>
          <Link to="/products" className="shopnow-button">
            Shop Now
          </Link>
        </div>
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png"
            alt="img"
            className="homepage-image"
          />
        </div>
      </div>
    </div>
  );
};
export default Home;
