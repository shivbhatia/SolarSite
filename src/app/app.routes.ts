import { homeRoutes } from "./home/routes";
import { registerRoutes } from "./register/routes";
export const appRoutes = [
	...homeRoutes,
	...registerRoutes,
];
