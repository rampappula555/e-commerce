import "./index.css";
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { BiShow } from "react-icons/bi";

const LoginForm = () => {
  const navigate = useNavigate();
  const logInButtonRef = useRef(null);

  const [username, setUserName] = useState("rahul");
  const [password, setPassword] = useState("rahul@2021");
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const onChangeUsername = (event) => setUserName(event.target.value);
  const onChangePassword = (event) => setPassword(event.target.value);
  const onClickShowPassword = () => setShowPassword((prevState) => !prevState);
  const onSubmitForm = async (event) => {
    event.preventDefault();
    const userDetails = { username, password };
    const options = {
      method: "POST",
      body: JSON.stringify(userDetails),
    };
    const response = await fetch("https://apis.ccbp.in/login", options);
    const data = await response.json();

    if (response.ok) {
      Cookies.set("jwt_token", data.jwt_token, { expires: 30 });
      navigate("/", { replace: true });
    } else if (response.ok === false) {
      setErrorMessage(data.error_msg);
      setShowErrorMessage(true);
    }
  };
  useEffect(() => {
    if (logInButtonRef.current) {
      logInButtonRef.current.focus();
    }
  }, []);

  const jwtToken = Cookies.get("jwt_token");

  if (jwtToken !== undefined) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <div className="loginpage-container">
      <div className="shopping-image-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
          alt="img"
          className="shopping-image"
        />
      </div>
      <div>
        <div>
          <div className="form-details-container">
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
                alt="img"
                className="website-logo"
              />
            </div>
            <form onSubmit={onSubmitForm} className="form-details">
              <label htmlFor="username">USERNAME</label>
              <br />
              <input
                onChange={onChangeUsername}
                id="username"
                type="text"
                value={username}
              />
              <br />
              <label htmlFor="password">PASSWORD</label>
              <br />
              <input
                onChange={onChangePassword}
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
              />
              {password.length > 0 && (
                <div className="show-password-icon-btn-container">
                  <button
                    className="show-password-icon-btn"
                    onClick={onClickShowPassword}
                    type="button"
                  >
                    <BiShow />
                  </button>
                </div>
              )}
              <br />
              <button
                className="login-button"
                type="submit"
                ref={logInButtonRef}
              >
                Login
              </button>

              {showErrorMessage && (
                <p className="error-message">*{errorMessage}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginForm;
