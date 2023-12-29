import "./Auth.css";

const handleSignin = () => {
  window.location.href = "/api/auth";
};

function Auth() {
  return (
    <div>
      <div id="centered-container">
        <div>
          <div id="signin-button" onClick={handleSignin}>
            <div>
              <div>
                <div>SIGN IN WITH 42AUTH</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
