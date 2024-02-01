import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useSelector } from "react-redux";

function Navigation() {

  const session = useSelector(state => state.session)
  return (
    <div className="navBar">
      <NavLink to={session? "/dashboard" : "/"}>Home</NavLink>
      <span>
        <ProfileButton />
      </span>
    </div>
  );
}

export default Navigation;
