import Button from "./modules/Button";

function Auth() {

  return (
    <div>
      <Button
        content="Sign In with 42Auth"
        color="purple"
        onClick={event =>  window.location.href='http://localhost:3000/api/auth'}
      />
    </div>
  );
}

export default Auth;
