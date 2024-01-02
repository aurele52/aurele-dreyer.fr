import "./Auth.css";
import "./bg.css";

const handleSignin = () => {
  window.location.href = "/api/auth";
};

function Auth() {
  return (
    <div className="bg-container">
      <div className="purple-container">
        <button type="button" className="signin-btn" onClick={handleSignin}>
          Sign in with 42
        </button>
      </div>
    </div>
  );
}

export default Auth;
