import { Component, OnInit } from "@angular/core";
import { Validators, FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  /**
   * Properties
   */
  errorMsg = "some error message to be fetched from server";
  invalidLogin = false;
  loginForm = new FormGroup({
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(8),
    ]),
  });
  constructor() {}

  ngOnInit() {}

  onSubmit() {
    alert("You are about to submit the form");
  }
}
