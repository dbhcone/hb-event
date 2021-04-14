/**
 * Uses the SENDGRID MAIL
 */
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const accountActivationEmail = async (email, temp_code, token) =>{
    const msg = {
        to: email,
        from: `Banner Mart <${process.env.SENDGRID_SINGLE_SENDER}>`, 
        subject: 'Account Activation',
        html: `<div><h1>Banner Mart</h1><br><section><h2>Please click the link below and enter the four digit pin to activate your account</h2><br><h2><p>PIN: <b style="color:Green;">${temp_code}</b></p></h2><br><a href="${process.env.URL}/account-activation?token=${token}" target="__blank">Activate Account</a></section></div>`
    };

    sgMail
    .send(msg)
    .then((res) => {
      console.log('Email sent successfully using sendgrid', res);
    }, error => {
      console.log('Sorry, could not send email using sendgrid', error);

      if (error.response) {
        console.error(error.response.body)
      }
    });
};

const passwordResetEmail = async (email, token) =>{
  const msg = {
    to: email,
    from: `Banner Mart <${process.env.SENDGRID_SINGLE_SENDER}>`, 
    subject: 'Password Reset',
    html: `<div> 
    <header> <h1>Banner Mart</h1> </header> 
    <br> 
    <section> 
        <h2>Banner Mart has received a request to reset the password for your account</h2> 
        <br> 
        <a href="${process.env.URL}/forgot-password?token=${token}">Reset Password</a> 
    </section> 
</div>`
  };

  sgMail
    .send(msg)
    .then((res) => {
      console.log('Email sent successfully using sendgrid', res);
    }, error => {
      console.log('Sorry, could not send email using sendgrid', error);

      if (error.response) {
        console.error(error.response.body)
      }
    });
};

module.exports = {
    accountActivationEmail, passwordResetEmail
}