import {NgModule} from '@angular/core';
import {Router, RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "../components/login/login.component";
import {AuthGuardService} from "../security/auth-guard.service";
import {StudentsComponent} from "../components/students/students.component";
import {RoutesComponent} from "../components/routes/routes.component";
import {RoutesPlayComponent} from "../components/routes-play/routes-play.component";


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'students', component: StudentsComponent, canActivate: [AuthGuardService]},
  { path: 'routes', component: RoutesComponent, canActivate: [AuthGuardService]},
  { path: 'play', component: RoutesPlayComponent, canActivate: [AuthGuardService]},
  { path: '**', redirectTo: 'routes', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollOffset: [0, 0],
      scrollPositionRestoration: 'top', // Add options right here
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
  constructor(private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
}
