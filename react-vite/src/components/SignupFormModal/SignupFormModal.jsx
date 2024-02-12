import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";
import { useNavigate } from "react-router-dom";

function SignupFormModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const [submitted, setSubmitted] = useState(false)

  useEffect(()=> {

    const newErrors = {}
    if (!email) {
      newErrors.email = 'Email is required.'
    }
    if (!username) {
      newErrors.username = 'Username is required.'
    }
    if (!password) {
      newErrors.password = 'Password is required.'
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm password.'
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match. Try again.'
    }

    setErrors(newErrors)
  }, [username, email, password, confirmPassword])

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitted(true)

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
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
    <div className="signUpModal">
      <h1>Welcome!</h1>
      <p>Please input the following information to sign up.</p>
      {errors.server && <p>{errors.server}</p>}
      <form className='signUpForm' onSubmit={handleSubmit}>
        <label className="signUpLabels">
          Email {submitted && errors.email && <p style={{color: 'red'}}>{errors.email}</p>}
        </label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="signUpLabels">
          Username {submitted && errors.username && <p style={{color: 'red'}}>{errors.username}</p>}
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label className="signUpLabels">
          Password {submitted && errors.password && <p style={{color: 'red'}}>{errors.password}</p>}
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label className="signUpLabels">
          Confirm Password {submitted && errors.confirmPassword && <p style={{color: 'red'}}>{errors.confirmPassword}</p>}
        </label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </form>
      <button className='signUpButton' type="submit" onClick={(e)=> handleSubmit(e)}>Sign Up</button>
    </div>
  );
}

export default SignupFormModal;
