import { router } from "../../router";
import { Button } from "../../shared/ui-components/Button/Button";
import "./Initialise.css";

export default function Initialise() {
  const handleContinue = () => {
    router.navigate({ to: "/home" });
  };

  return (
    <div className="bg-container">
      <div className="purple-container">
        <Button content="continue" color="pink" onClick={handleContinue} />
      </div>
    </div>
  );
}
