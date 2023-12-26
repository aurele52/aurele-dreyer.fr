import Button from "./shared/ui-components/Button/Button";

function Auth() {
  return (
    <div>
      <Button
        content="Sign In with 42Auth"
        color="purple"
        onClick={(event) => (window.location.href = "/api/auth")}
      />
    </div>
  );
}

export default Auth;
