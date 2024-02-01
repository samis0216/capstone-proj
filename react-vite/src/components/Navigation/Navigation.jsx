import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <div className="navBar">
      <NavLink to="/">Home</NavLink>
      <ProfileButton />
    </div>
  );
}

export default Navigation;
