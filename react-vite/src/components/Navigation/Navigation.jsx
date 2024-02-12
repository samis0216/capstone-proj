import { NavLink, useNavigate } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function Navigation() {
  const navigate = useNavigate()
  const user = useSelector(state => state.session.user)
  return (
    <div className={user? "navBar" : 'landingBar'}>
      <div style={{display: 'flex', gap: 3, alignItems: "center"}}>
        <img onClick={()=> user ? navigate("/dashboard") : navigate('/')} src="https://cdn-icons-png.flaticon.com/512/3372/3372849.png" style={{width: 32, cursor: "pointer"}}/>
        <NavLink style={{color: user ? "white" : 'black', textDecoration: 'none', font: 'League Spartan', fontSize: 20}}to={user? "/dashboard" : "/"}>Splitti</NavLink>
      </div>
      <span>
        {user ? <ProfileButton /> :
          <div>
            <OpenModalButton modalComponent={<LoginFormModal />} buttonText={'Log In'} buttonStyle={'logInButton'} />
            <OpenModalButton modalComponent={<SignupFormModal />} buttonText={'Sign Up'} buttonStyle={'signUpButton'}/>
          </div>}
      </span>
    </div>
  );
}

export default Navigation;
