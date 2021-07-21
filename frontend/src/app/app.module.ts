import { BrowserModule } from "@angular/platform-browser";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";

import { AngularMaterialModule } from "./angular-material.module";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { SignupComponent } from "./components/signup/signup.component";
import { FooterComponent } from "./components/shared/footer/footer.component";
import { AboutComponent } from "./components/about/about.component";
import { ContactComponent } from "./components/contact/contact.component";
import { FourZeroFourComponent } from "./components/shared/four-zero-four/four-zero-four.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LayoutModule } from "@angular/cdk/layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
// import { ChartsModule } from "ng2-charts";
import { NavigationComponent } from "./components/shared/navigation/navigation.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { EventsComponent } from "./components/events/events.component";
import { EventComponent } from "./components/events/event.component";
import { CartComponent } from "./components/cart/cart.component";
import { ShoppingCartModule } from "ng-shopping-cart";
import { PurchaseItem } from "./helpers/purchaseitem.helper";
import { GalleryComponent } from "./components/gallery/gallery.component";
import { UpcomingComponent } from "./components/events/upcoming/upcoming.component";
import { SuggestedComponent } from "./components/events/suggested/suggested.component";
import { LatestComponent } from "./components/events/latest/latest.component";
import { PastComponent } from "./components/events/past/past.component";
// import { SwiperModule } from "swiper/angular";
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    FooterComponent,
    AboutComponent,
    ContactComponent,
    FourZeroFourComponent,
    NavigationComponent,
    DashboardComponent,
    EventsComponent,
    EventComponent,
    CartComponent,
    GalleryComponent,
    UpcomingComponent,
    SuggestedComponent,
    LatestComponent,
    PastComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    // ChartsModule,
    ShoppingCartModule.forRoot({
      itemType: PurchaseItem,
      serviceType: "localStorage",
      serviceOptions: {
        storageKey: "NgShoppingCart",
        clearOnError: true,
      },
    }),
    // SwiperModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
