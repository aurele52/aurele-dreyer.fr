import { Outlet } from "@tanstack/react-router";
import "./Auth.css";

function Auth() {
  return (
    <div className="bg-container">
      <div className="purple-container">
        <Outlet/>
      </div>
    </div>
  );
}

export default Auth;
