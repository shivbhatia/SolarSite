import { Routes, RouterModule }  from '@angular/router';
import { homeComponent } from './home.component';
import { ModuleWithProviders } from '@angular/core';

//import { ActiveRouteGuard } from './../services/activate-route-guard';
//import { DeactiveRouteGuard } from './../services/deactivate-route-guard';


//import { UsersComponent } from './users/users.component';
//import { AddUserComponent } from './users/add-user/adduser.component';
//import { ProfileComponent } from './profile/profile.component';
//import { cashFlowInvestmentComponent } from './cash-flow-investment/cash-flow-investment.component';
const routes: Routes = [
	// { 
	// 	path: 'cf_investment', 
	// 	component:adminComponent, 
	// 	loadChildren: './cf_investment/cf_investment.module#CFInvestmentModule'
	// },
	// { 
	// 	path: 'cash-flow-investment', 
	// 	component:adminComponent, 
	// 	loadChildren: './cash-flow-investment/cash-flow-investment.module#CashFlowInvestmentModule',
	// 	canActivate: [DeactiveRouteGuard]
	// },

	//{ path: 'admin', component: adminComponent ,canActivate: [DeactiveRouteGuard], children: 

    //[
   
    { path: '', component: homeComponent },
    //{ path: 'profile', component: ProfileComponent },
    //{ path: 'cash-flow-investment', component: cashFlowInvestmentComponent },
    //{ path: 'users/adduser', component: AddUserComponent },

    
    
    
  //  ]
    
    //}
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
