import styles from "./Register.module.css"

import { useState, useEffect } from "react"
import { useAuthentication } from "../../hooks/useAuthentication";

const Register = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const {createUser, error: authError, loading} = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const user = {
      displayName,
      email,
      password
    }
    if(password !== confirmPassword) {
      setError("Sorry, the entered passwords do not match.");
      return;
    }

    const response = await createUser(user);
    console.log(response);
  };

  useEffect(() => {
    if(authError){
      setError(authError);
    }

  }, [authError]);

  return (
    <div className={styles.register}>
      <h1>Sign up</h1>
      <p>Sign up now and share your stories.</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Name:</span>
          <input 
          type="text" 
          name="displayName" 
          required 
          placeholder="Username" 
          value={displayName}
          onChange={(e)=> setDisplayName(e.target.value)}
          />
        </label>

        <label>
          <span>E-mail:</span>
          <input 
          type="email" 
          name="email" 
          required 
          placeholder="E-mail"
          value={email}
          onChange={(e)=> setEmail(e.target.value)}
          />
        </label>

        <label>
          <span>Password:</span>
          <input 
          type="password" 
          name="password" 
          required 
          placeholder="Password"
          value={password}
          onChange={(e)=> setPassword(e.target.value)}
          />
        </label>

        <label>
          <span>Cofirm Password:</span>
          <input 
          type="password" 
          name="confirmPassword" 
          required 
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e)=> setConfirmPassword(e.target.value)}
          />
        </label>
        {!loading && <button className="btn">Sign up</button>}
        {loading && <button className="btn" disabled>Waiting...</button>}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  )
}

export default Register