import {ActivatedRouteSnapshot, CanActivateFn, Router} from '@angular/router';
import {inject, Injectable} from "@angular/core";
import {AuthService} from "../services/auth.service";

@Injectable({providedIn: 'root'})
export class AuthorizationService {

  constructor(private authService: AuthService, private router: Router){
  }
  canActivate(route : ActivatedRouteSnapshot): boolean {
    if(this.authService.isAuthentificated){
      let requiredRoles = route.data['roles'];
      let userRoles = this.authService.roles;
      for (let role of userRoles) {
        if (requiredRoles.includes(role)) {
          return true;
        }
      }
      return false;
    } else {
        this.router.navigateByUrl('/login');
        return false;
    }
  }
}

export const AuthorizationGuard: CanActivateFn = (route, state) => {
  return inject(AuthorizationService).canActivate(route);
};
