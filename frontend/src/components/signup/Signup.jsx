import "./SignUp.css";

const SignUp = () => {
  return (
    <div style={{ backgroundColor: "#222533", height: "100vh" }}>
      <h1 className="title">Create An Account</h1>

      <div className="form-signup">
        <h2>Sign Up</h2>
        <form>
          <div className="name input">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" autoComplete="off" />
          </div>
          <div className="email input">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" />
          </div>
          <div className="password input">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" />
          </div>
          <button className="submit" type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
