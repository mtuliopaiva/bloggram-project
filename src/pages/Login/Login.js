import styles from "./Login.module.css";

import { Link } from "react-router-dom";

import { useState, useEffect } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";
import ForgotPassword from "../Forgot-password/ForgotPassword";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const user = {
      email,
      password,
    };
    const response = await login(user);
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);
  return (
    <div className={styles.login}>
      <h1>Sign in</h1>
      <p>Sign in and have fun.</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>E-mail:</span>
          <input
            type="email"
            name="email"
            required
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div className={styles["login-links"]}>
          <Link to="/forgot-password">Forgot your password?</Link>
          {!loading && <button className="btn">Sign in</button>}
          {loading && (
            <button className="btn" disabled>
              Waiting...
            </button>
          )}
          {error && <p className="error">{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default Login;
