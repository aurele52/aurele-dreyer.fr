import "./SignIn.css";

function SignIn() {
  const handleSignin = () => {
    window.location.href = "/api/auth";
  };
  const button_label = () => {
    if (!localStorage.getItem("token")) {
      return "Sign in with 42";
    } else {
      return "Back to main page";
    }
  };
  return (
    <button type="button" className="signin-btn" onClick={handleSignin}>
      {button_label()}
    </button>
  );
}

export default SignIn;
