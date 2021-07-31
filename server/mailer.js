const nodemailer =  require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'huufuks99@gmail.com',
    pass: 'le6minhhuu74phuc1'
  }
});

var mailOptions = {
  from: 'huufuks99@gmail.com',
  to: 'phucle11299@gmail.com',
  subject: 'Sending Email using Node.js',
  html: '<h1>Report Daily</h1><p>That was easy!</p>'  
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
