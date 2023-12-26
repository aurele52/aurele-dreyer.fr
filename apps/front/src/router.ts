import { RootRoute, Route, Router, redirect } from "@tanstack/react-router";
import App from "./App";
import Auth from "./Auth";
import api from "./axios";

const rootRoute = new RootRoute();

const appRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: App,
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
    window.localStorage.setItem("token", params.token);
    api.defaults.headers.common = { Authorization: `Bearer ${params.token}` };
    throw redirect({
      to: "/",
    });
  },
});

const routeTree = rootRoute.addChildren([
  appRoute,
  authRoute,
  authRedirectRoute,
]);

export const router = new Router({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    // This infers the type of our router and registers it across your entire project
    router: typeof router;
  }
}
