import { Link } from "react-router-dom";
const Header = () => (
  <>
    <Link to="/feedback">
      <p>Feeedback</p>
    </Link>
    <Link to="/help">
      <p>Help</p>
    </Link>
    <Link to="about">
      <p>About</p>
    </Link>
  </>
);
export default Header;
