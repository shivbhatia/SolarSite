import { homeRoutes } from "./home/routes";
import { registerRoutes } from "./register/routes";
import { registernewRoutes } from "./registernew/routes";
import { registerformRoutes } from "./registerform/routes";
import { loginRoutes } from "./login/routes";
import { checkoutRoutes } from "./checkout/routes";
import { dashboardRoutes } from "./dashboard/routes";
export const appRoutes = [
	...homeRoutes,
	...registerRoutes,
	...registernewRoutes,
	...registerformRoutes,
	...loginRoutes,
	...checkoutRoutes,
	...dashboardRoutes,
];
