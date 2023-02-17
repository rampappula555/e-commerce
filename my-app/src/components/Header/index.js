import "./index.css";
import CartContext from "../../context/CartContext";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  let logoutRef = useRef(null);
  const value = useContext(CartContext);
  const { cartList } = value;
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
      if (logoutRef.current && !logoutRef.current.contains(event.target)) {
        setIsOnClick(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  useEffect(() => {
    const body = document.querySelector("body");
    if (isOnClick) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "initial";
    }
  }, [isOnClick]);

  return (
    <div className="header-container">
      <div>
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            className="header-website-logo"
            alt="img"
          />
        </Link>
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
          {cartList.length > 0 ? (
            <span className="cart-count">{cartList.length}</span>
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
                  autoFocus
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
