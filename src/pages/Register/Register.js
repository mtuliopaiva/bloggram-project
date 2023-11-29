import styles from "./Register.module.css"

import { useState, useEffect } from "react"

const Register = () => {
  return (
    <div>
      <h1>Sign up</h1>
      <p>Sign up now and share your stories.</p>
      <form>
        <label>
          <span>Name:</span>
          <input 
          type="text" 
          name="displayName" 
          required 
          placeholder="Username" />
        </label>

        <label>
          <span>E-mail:</span>
          <input 
          type="email" 
          name="email" 
          required 
          placeholder="E-mail" />
        </label>

        <label>
          <span>Password:</span>
          <input 
          type="password" 
          name="password" 
          required 
          placeholder="Password" />
        </label>

        <label>
          <span>Cofirm Password:</span>
          <input 
          type="password" 
          name="confirmPassword" 
          required 
          placeholder="Confirm Password" />
        </label>
        <button className="btn">Sign up</button>
      </form>
    </div>
  )
}

export default Register