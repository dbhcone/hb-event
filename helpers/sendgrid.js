
// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
//javascript

const sgMail = require('@sendgrid/mail');

//
const accountActivation = async (email, temp_code, token)=>{
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);

        const msg = {
        to: `${email}`, // Change to your recipient
        from: 'ddake2g@yahoo.com', // Change to your verified sender
        subject: 'Account Activation',
        html: `<body> 
                    <header> <h1>Banner Mart</h1> </header> 
                    <br> 
                    <section> 
                        <h2>Please click the link below and enter the four digit pin to activate your account</h2> 
                        <br> 
                        <h2><p>PIN: <b style="color:Green;">${temp_code}</b></p></h2> 
                        <br> 
                        <form action="http://localhost:3000/account-activation/token=${token}"><input type="submit" value="Activate Account" /></form> 
                    </section> 
              </body>`
        };

        sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.log(error.response.body.errors);
        });
};

//
const forgotPassword = async ()=>{};


  //Export Modules
  module.exports = {
      accountActivation, forgotPassword
  };