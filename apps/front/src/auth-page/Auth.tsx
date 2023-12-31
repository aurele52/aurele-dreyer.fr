import "./Auth.css";

const handleSignin = () => {
  window.location.href = "/api/auth";
};

function Auth() {
  return (
    <div id="bg-container">
      <div id="purple-container">
        <button type="button" id="signin-btn" onClick={handleSignin}>
          SIGN IN WITH 42AUTH
        </button>
      </div>
    </div>
  );
}

export default Auth;
