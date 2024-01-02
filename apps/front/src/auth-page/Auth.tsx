import "./Auth.css";
import "./bg.css";

const handleSignin = () => {
  window.location.href = "/api/auth";
};

function Auth() {
  const button_label = () => {
    if (!localStorage.getItem("token")) {
      return "Sign in with 42";
    } else {
      return "Back to main page";
    }
  };
  return (
    <div className="bg-container">
      <div className="purple-container">
        <button type="button" className="signin-btn" onClick={handleSignin}>
          {button_label()}
        </button>
      </div>
    </div>
  );
}

export default Auth;
