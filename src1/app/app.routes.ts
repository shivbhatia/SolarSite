import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { registerComponent } from './register/register.component';
import { loginComponent } from './login/login.component';
import { forgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { checkoutComponent } from './checkout/checkout.component';

//import { newdashboardComponent } from './newdashboard/newdashboard.component';

//import { ForgotPasswordComponent } from './forgotpassword/forgotpassword.component';
//import { ResetPasswordComponent } from './reset-password/resetpassword.component';
//import { UserLoginComponent } from './user-login/user-login.component';
export const appRoutes: Routes = [
 // { path: '', redirectTo: 'admin/users', pathMatch: 'full' },
  { path: '', loadChildren: './home/home.module#HomeModule' },
  { path: 'register', component: registerComponent },
  { path: 'login', component: loginComponent },
  { path: 'forgotpassword', component: forgotpasswordComponent },
  { path: 'checkout', component: checkoutComponent },
  { path: 'users', loadChildren: './users/users.module#UsersModule' },
 // { path: 'login', loadChildren: './login/login.module#LoginModule' },
  //{ path: 'user-login', component: UserLoginComponent},
  //{ path: 'logout', component: UserLoginComponent},
  //{ path: 'forgot-password', component: ForgotPasswordComponent },
  //{ path: 'reset-password/:str', component: ResetPasswordComponent }

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: false });
		