import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { AboutComponent } from "./components/about/about.component";
import { ContactComponent } from "./components/contact/contact.component";

import { LoginComponent } from "./components/login/login.component";
import { SignupComponent } from "./components/signup/signup.component";
import { FourZeroFourComponent } from "./components/shared/four-zero-four/four-zero-four.component";
import { AuthGuardService } from "./services/guards/auth-guard.service";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { EventsComponent } from "./components/events/events.component";
import { EventComponent } from "./components/events/event.component";
import { CartComponent } from "./components/cart/cart.component";
import { NavigationComponent } from "./components/shared/navigation/navigation.component";
import { GalleryComponent } from "./components/gallery/gallery.component";

const routes: Routes = [
  { path: "home", redirectTo: "", pathMatch: "full" },
  {
    path: "",
    component: NavigationComponent,
    children: [
      { path: "", component: HomeComponent },
      { path: "events", component: EventsComponent },
      { path: "events/:id", component: EventComponent },
      { path: "cart", component: CartComponent },
      { path: "about", component: AboutComponent },
      { path: "signup", component: SignupComponent },
      { path: "login", component: LoginComponent },
      { path: "logout", redirectTo: "login" },
      { path: "contact-us", component: ContactComponent },
      { path: "gallery", component: GalleryComponent },
    ],
  },
  { path: "dashboard", component: DashboardComponent },
  { path: "404", component: FourZeroFourComponent },
  { path: "**", redirectTo: "/404" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
