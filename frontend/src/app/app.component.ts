import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "hb events";

  gotoTop () {
    console.log('We are going to top');
    window.scroll({left: 0, top: 0, behavior: "smooth"})
  }
}
