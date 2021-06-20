import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {

  constructor(private _authService: AuthService,
    private _router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean> | boolean {

    //   if( this._authService.auth.id ){
    //     return true;
    //   }
    //   console.log('Bloqueado por el authguard - canActivate');

    // return false;

    return this._authService.verificarAutenticacion()
      .pipe(
        tap(estaAunteticado => {
          if (!estaAunteticado) {
            this._router.navigate(['./auth/login'])
          }
        })
      );
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | boolean {

    return this._authService.verificarAutenticacion()
      .pipe(
        tap(estaAunteticado => {
          if (!estaAunteticado) {
            this._router.navigate(['./auth/login'])
          }
        })
      );

    // if( this._authService.auth.id ){
    //   return true;
    // }

    // console.log('canLoad', true);
    // console.log(route);
    // console.log(segments);

    // console.log('Bloqueado por el authguard - canLoad');

    // return false;
  }
}
