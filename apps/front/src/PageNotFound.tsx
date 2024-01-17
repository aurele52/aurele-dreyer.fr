import { router } from "./router";
import { Button } from "./shared/ui-components/Button/Button";

export default function PageNotFound() {
  const button_label = (): string => {
    if (!localStorage.getItem("token")) {
      return "sign in";
    } else {
      return "home";
    }
  };

  return (
    <>
      <h2>Page Not Found</h2>
      <Button
        type="button"
        color="red"
        content={button_label()}
        onClick={() => router.navigate({ to: "/" })}
      ></Button>
    </>
  );
}
