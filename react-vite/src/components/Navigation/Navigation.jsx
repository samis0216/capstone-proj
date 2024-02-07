import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useSelector } from "react-redux";

function Navigation() {

  const user = useSelector(state => state.session.user)
  return (
    <div className="navBar">
      <NavLink to={user? "/dashboard" : "/"}>Home</NavLink>
      <span>
        <ProfileButton />
      </span>
    </div>
  );
}

export default Navigation;
