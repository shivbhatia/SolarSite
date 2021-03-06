import { Routes, RouterModule }  from '@angular/router';
import { usersComponent } from './users.component';
import { ModuleWithProviders } from '@angular/core';

//import { ActiveRouteGuard } from './../services/activate-route-guard';
//import { DeactiveRouteGuard } from './../services/deactivate-route-guard';

import { marketplaceComponent } from './marketplace/marketplace.component';
import { dashboardComponent } from './dashboard/dashboard.component';
import { mydashboardComponent } from './mydashboard/mydashboard.component';
import { quickinspectionComponent } from './quickinspection/quickinspection.component';
import { addsitevisitComponent } from './addsitevisit/addsitevisit.component';
import { addmarketComponent } from './addmarket/addmarket.component';
import { editprofileComponent } from './editprofile/editprofile.component';
import { sitevisitlistingComponent } from './sitevisitlisting/sitevisitlisting.component';
import { marketlistingComponent } from './marketlisting/marketlisting.component';

import { inspectionreportComponent } from './inspectionreport/inspectionreport.component';
import { mytrackedprojectsComponent } from './mytrackedprojects/mytrackedprojects.component';
import { mysolarprojectsComponent } from './mysolarprojects/mysolarprojects.component';
import { transfertokensComponent } from './transfertokens/transfertokens.component';
import { tokenlistingComponent } from './tokenlisting/tokenlisting.component';
import { projectdetailComponent } from './projectdetail/projectdetail.component';




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

	//{ path: 'users/dashboard', component: dashboardComponent  },

	//{ path: 'users/marketplace', component: marketplaceComponent  },



	{ path: 'users', component: usersComponent , children: 

    [
   
    { path: 'marketplace', component: marketplaceComponent },
    { path: 'dashboard', component: dashboardComponent },
    { path: 'mydashboard', component: mydashboardComponent },
    { path: 'quick_inspection', component: quickinspectionComponent },
    { path: 'addsitevisit', component: addsitevisitComponent },
    { path: 'addmarket', component: addmarketComponent },
    { path: 'sitevisitlisting', component: sitevisitlistingComponent },
    { path: 'marketlisting', component: marketlistingComponent },
    { path: 'inspectionreport', component: inspectionreportComponent },
    { path: 'mytrackedprojects', component: mytrackedprojectsComponent },
    { path: 'mysolarprojects', component: mysolarprojectsComponent },
    { path: 'editprofile', component: editprofileComponent },
    { path: 'transfertokens', component: transfertokensComponent },
    { path: 'tokenlisting', component: tokenlistingComponent },
    { path: 'projectdetail', component: projectdetailComponent },
    //{ path: 'profile', component: ProfileComponent },
    //{ path: 'cash-flow-investment', component: cashFlowInvestmentComponent },
    //{ path: 'users/adduser', component: AddUserComponent },

     
    ]
    
    }
	

];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
