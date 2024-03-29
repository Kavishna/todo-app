import { useState } from "react";
import "./Signin.css";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="signin">
      <h1 className="title">Welcome to My Notes</h1>

      <div className="form-signin">
        <h2>Sign Up</h2>
        <form>
          <div className="email input">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="password input">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="submit" type="submit">
            Sign In
          </button>
        </form>
        <p>Don’t have an account?</p>
        <a href="#">Sign Up</a>
      </div>
    </div>
  );
};

export default Signin;
