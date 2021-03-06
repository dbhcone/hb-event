/*
SENDGRID_API_KEY=
SENDGRID_SINGLE_SENDER=
URL=http://localhost:4200
MONGODB_URI=
*/

import config from "config";

/**
 * Uses the SENDGRID MAIL
 */
// const sgMail = require("@sendgrid/mail");
import sgMail from "@sendgrid/mail";
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
sgMail.setApiKey(config.get("SENDGRID_API_KEY"));

const accountActivationEmail = async (
  email: string,
  temp_code: string | number,
  token: string
) => {
  const msg = {
    to: email,
    from: `HB Events <${config.get("SENDGRID_SINGLE_SENDER")}>`,
    subject: "Account Activation",
    html: `<div><h1>HB Events &amp; Ushering Services</h1><br><section><h2>Please click the link below and enter the 6-digit PIN to activate your account</h2><br><h2><p>PIN: <b style="color:Green;">${temp_code}</b></p></h2><br><a href="${config.get(
      "URL"
    )}/account-activation?token=${token}" target="__blank">Activate Account</a></section></div>`,
  };

  sgMail.send(msg).then(
    (res) => {
      console.log("Email sent successfully using sendgrid", res);
    },
    (error) => {
      console.log("Sorry, could not send email using sendgrid", error);

      if (error.response) {
        console.error(error.response.body);
      }
    }
  );
};

const passwordResetEmail = async (email: string, token: string) => {
  const msg = {
    to: email,
    from: `HB Events <${config.get("SENDGRID_SINGLE_SENDER")}>`,
    subject: "Password Reset",
    html: `<div> 
    <header> <h1>HB EVENTS</h1> </header> 
    <br> 
    <section> 
        <h2>HB Events has received a request to reset the password for your account</h2> 
        <br> 
        <a href="${config.get(
          "URL"
        )}/forgot-password?token=${token}">Reset Password</a> 
    </section> 
</div>`,
  };

  sgMail.send(msg).then(
    (res) => {
      console.log("Email sent successfully", res);
    },
    (error) => {
      console.log("Sorry, could not send email", error);

      if (error.response) {
        console.error(error.response.body);
      }
    }
  );
};

export { accountActivationEmail, passwordResetEmail };
