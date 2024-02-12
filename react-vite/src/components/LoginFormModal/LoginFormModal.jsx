import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";

function LoginFormModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false)
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitted(true)

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
      navigate('/dashboard')
    }
  };

  return (
    <div className="loginModal">
      <h1>Welcome back!</h1>
      <form onSubmit={handleSubmit} className="loginForm">
        <label className="loginLabels">
          Email {submitted && errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
        </label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label className="loginLabels">
          Password {submitted && errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="logInSubmit">Log In</button>
      </form>
      <p style={{margin: '10px 0'}} onClick={()=> alert("Awww that's too bad...")}>Forgot your password?</p>
      <p style={{borderTop: '1px solid black', padding: '5px', fontStyle: 'italic', fontSize: 16}} onClick={()=> {
        setEmail('demo@aa.io')
        setPassword('password')
      }}>Demo Login</p>
    </div>
  );
}

export default LoginFormModal;
