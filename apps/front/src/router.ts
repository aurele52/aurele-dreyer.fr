import { RootRoute, Route, Router, redirect } from "@tanstack/react-router";
import App from "./App";
import Auth from "./auth-page/Auth";
import TwoFA from "./TwoFA";

const rootRoute = new RootRoute();

const appRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: App,
  beforeLoad: async () => {
    if (!localStorage.getItem("token")) {
      throw redirect({
        to: "/auth",
      });
    }
  },
});
const authRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "auth",
  component: Auth,
});
const authRedirectRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "auth/redirect/$token",
  beforeLoad: async ({ params }) => {
    if (!!params.token) {
      window.localStorage.setItem("token", params.token);
      throw redirect({
        to: "/",
      });
    }
  },
});

const authtwofaRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "auth/2fa",
  component: TwoFA,
});

const routeTree = rootRoute.addChildren([
  appRoute,
  authRoute,
  authRedirectRoute,
  authtwofaRoute,
]);

export const router = new Router({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    // This infers the type of our router and registers it across your entire project
    router: typeof router;
  }
}
