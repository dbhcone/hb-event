import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.scss"],
})
export class ContactComponent implements OnInit {
  /**
   * Properties
   */
  contactUsForm = new FormGroup({
    username: new FormControl("", [
      Validators.required,
      Validators.minLength(5),
    ]),
    email: new FormControl("", [
      Validators.required,
      Validators.minLength(8),
      Validators.email,
    ]),
    subject: new FormControl(""),
    message: new FormControl("", [
      Validators.required,
      Validators.maxLength(255),
      Validators.minLength(25),
    ]),
  });

  constructor() {}

  ngOnInit() {}

  /**
   * Methods
   */
  onSubmit() {
    alert("You are about to submit the form");
  }
}
