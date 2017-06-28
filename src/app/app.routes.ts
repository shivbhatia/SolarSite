import { homeRoutes } from "./home/routes";
import { registerRoutes } from "./register/routes";
import { registernewRoutes } from "./registernew/routes";
export const appRoutes = [
	...homeRoutes,
	...registerRoutes,
	...registernewRoutes,
];
