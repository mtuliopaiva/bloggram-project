import styles from "./ForgotPassword.module.css";
import { useState, useEffect } from 'react';

import { useAuthentication } from "../../hooks/useAuthentication";


const ForgotPassword = () => {
  const { resetPassword, error: authError, loading } = useAuthentication();
  const [email, setEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await resetPassword(email);
      setResetSent(true);
    } catch (error) {
      console.error("Error sending password reset email:", error);
      setError("Error sending password reset email. Please try again later.");
    }
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div className={styles.forgotPassword}>
      <h1>Forgot Password</h1>
      {resetSent ? (
        <p>An email with instructions to reset your password has been sent to {email}.</p>
      ) : (
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
          {!loading && <button className={`${styles["forgot-password-btn"]} btn`}>
  Recover Password
</button>}
          {loading && <button className="btn" disabled>Waiting...</button>}
          {error && <p className="error">{error}</p>}
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;