import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  Validators,
  FormControl,
  AbstractControl,
} from "@angular/forms";
import { UserAccountHelper } from "../../helpers/useraccount.helper";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {
  /**
   * Properties
   */
  maxAddressCharacters = 255;
  minAddressCharacters = 15;

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
      Validators.minLength(this.minAddressCharacters),
      Validators.maxLength(this.maxAddressCharacters),
    ]),
    mobilenumber: new FormControl("", Validators.required),
    username: new FormControl("", [
      Validators.required,
      Validators.minLength(8),
    ]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(64),
      Validators.pattern(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]))/g),
    ]),
    confirmpassword: new FormControl("", [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(64),
      Validators.pattern(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]))/g),
    ]),
    acceptedterms: new FormControl(false, [
      Validators.required,
      Validators.requiredTrue,
    ]),
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

  get surname(): AbstractControl {
    return this.signUpForm.get("surname");
  }

  get firstname(): AbstractControl {
    return this.signUpForm.get("firstname");
  }

  get othernames(): AbstractControl {
    return this.signUpForm.get("othernames");
  }

  get address(): AbstractControl {
    return this.signUpForm.get("address");
  }

  get username(): AbstractControl {
    return this.signUpForm.get("username");
  }

  disableConfirmPassword() {
    this.signUpForm.get("confirmpassword").disable({ onlySelf: true });
    this.signUpForm.updateValueAndValidity();
  }

  /**
   * Event listeners and handlers
   */
  othernameschanged(e) {
    console.log("other names changed", e.value);
    this.suggestUsername(e.value);
  }

  suggestUsername(name) {
    this.signUpForm.get("username").setValue(name);
  }

  handleUsernameSuggestion() {
    const firstname: string = this.firstname.value.trim();
    const surname: string = this.surname.value.trim();
    const othernames: string = this.othernames.value.trim();

    const username = new UserAccountHelper().generateUsername({
      firstname,
      surname,
      othernames,
    });
    this.signUpForm.get("username").setValue(username);
  }
}
