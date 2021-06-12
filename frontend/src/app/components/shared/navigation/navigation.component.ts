import { Component } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.scss"],
})
export class NavigationComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  isTokenExpired = true;
  menuItems = [
    // { name: "dashboard", icon: "dashboard" },
    { name: "events", icon: "event" },
    { name: "contact-us", icon: "contact_page" },
    { name: "signup", icon: "manage_accounts" },
    { name: "about", icon: "manage_accounts" },
    { name: "login", icon: "login" },
  ];

  // left and right
  leftMenuItems = [
    { displayName: "Events", route: "events", icon: "event" },
    { displayName: "Gallery", route: "gallery", icon: "gallery" },
    { displayName: "About Us", route: "about", icon: "about" },
    { displayName: "Contact Us", route: "contact-us", icon: "contact_page" },
  ];

  rightMenuItems = [
    { displayName: "Login", route: "login", icon: "login" },
    { displayName: "Register", route: "signup", icon: "manage_accounts" },
  ];

  constructor(private breakpointObserver: BreakpointObserver) {}
  logout() {
    console.log("We are logging out");
  }
}
