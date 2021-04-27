import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor() {}

  public isAuthenticated(): boolean {
    let jwtHelper = new JwtHelperService();
    const accessToken = localStorage.getItem("access_token");
    return !jwtHelper.isTokenExpired(accessToken);
  }
}
