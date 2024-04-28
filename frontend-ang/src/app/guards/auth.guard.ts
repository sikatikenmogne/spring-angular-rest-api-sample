import {ActivatedRouteSnapshot, CanActivateFn, Router} from '@angular/router';
import {inject, Injectable} from "@angular/core";
import {AuthService} from "../services/auth.service";

@Injectable({providedIn: 'root'})
export class PermissionService {

  constructor(private authService: AuthService, private router: Router){
  }
  canActivate(route : ActivatedRouteSnapshot): boolean {
    if(this.authService.isAuthentificated){
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}

export const authGuard: CanActivateFn = (route, state) => {
  return inject(PermissionService).canActivate(route);
};
