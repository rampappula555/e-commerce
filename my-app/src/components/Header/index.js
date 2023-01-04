import "./index.css";
import CartContext from "../../context/CartContext";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  let logoutRef = useRef();
  const value = useContext(CartContext);
  const { updatedArray } = value;
  const [isOnClick, setIsOnClick] = useState(false);

  const onClickLogout = () => {
    setIsOnClick(true);
  };
  const onClickClosePopUp = () => setIsOnClick(false);
  const onClickYesButton = () => {
    Cookies.remove("jwt_token");

    navigate("/login", { replace: true });
  };
  useEffect(() => {
    let handler = (event) => {
      if (logoutRef.current) {
        if (!logoutRef.current.contains(event.target)) {
          setIsOnClick(false);
        }
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="header-container">
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          className="header-website-logo"
          alt="img"
        />
      </div>
      <div className="header-buttons-container">
        <Link to="/" className="link">
          Home
        </Link>
        <Link to="/products" className="link">
          Products
        </Link>
        <Link to="/cart" className="link cart-link">
          Cart
          {updatedArray.length > 0 ? (
            <span className="cart-count">{updatedArray.length}</span>
          ) : null}
        </Link>
        <button
          title="logout"
          className="logout-button"
          onClick={onClickLogout}
        >
          Logout
        </button>
        {!isOnClick ? null : (
          <div className="logout-popup-container">
            <div className="logout-popup" ref={logoutRef}>
              <p>are you sure to want to exit</p>
              <div>
                <button
                  className="yes-button button"
                  onClick={onClickYesButton}
                >
                  Yes
                </button>
                <button
                  className="no-button button"
                  onClick={onClickClosePopUp}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Header;
