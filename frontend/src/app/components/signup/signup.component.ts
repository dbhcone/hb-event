import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  Validators,
  FormControl,
  AbstractControl,
} from "@angular/forms";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {
  /**
   * Properties
   */

  signUpForm = new FormGroup({
    surname: new FormControl("", [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15),
    ]),
    firstname: new FormControl("", [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15),
    ]),
    othernames: new FormControl(""),
    gender: new FormControl("", Validators.required),
    email: new FormControl("", [
      Validators.minLength(8),
      Validators.email,
      Validators.required,
    ]),
    address: new FormControl("", [
      Validators.required,
      Validators.minLength(15),
    ]),
    mobilenumber: new FormControl("", Validators.required),
  });
  constructor() {}

  ngOnInit() {}

  onSubmit() {
    alert("You are about to submit the form");
  }

  /**
   * Getters
   */
  get email(): AbstractControl {
    return this.signUpForm.get("email");
  }
}
