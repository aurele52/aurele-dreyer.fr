import { RootRoute, Route, Router, redirect } from "@tanstack/react-router";
import App from "./App";
import Auth from "./auth-page/Auth";
import Auth2FA from "./auth-page/2FA-page/Auth2FA";
import SignUp from "./auth-page/SignUp/SignUp";

const rootRoute = new RootRoute();

const appRoute = new Route({
	getParentRoute: () => rootRoute,
	path: "/home",
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
	path: "/auth",
	component: Auth,
});
const authtwofaRoute = new Route({
	getParentRoute: () => rootRoute,
	path: "/auth/2fa/$id",
	component: Auth2FA,
});
const authRedirectRoute = new Route({
	getParentRoute: () => rootRoute,
	path: "auth/redirect/$token",
	beforeLoad: async ({ params }) => {
		if (!!params.token) {
			window.localStorage.setItem("token", params.token);
			throw redirect({
				to: "/home",
			});
		}
	},
});
const signUpRoute = new Route({
	getParentRoute: () => rootRoute,
	path: "/sign-up",
	component: SignUp,
});

const routeTree = rootRoute.addChildren([
	appRoute,
	authRoute,
	authtwofaRoute,
	authRedirectRoute,
	signUpRoute,
]);

export const router = new Router({ routeTree });

declare module "@tanstack/react-router" {
	interface Register {
		// This infers the type of our router and registers it across your entire project
		router: typeof router;
	}
}
