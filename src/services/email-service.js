const sender = require("../config/email-config");

const sendBasicEmail = async (from, to, subject, mailBody) => {
  const response = await sender.sendMail({
    from: from,
    to: to,
    subject: subject,
    text: mailBody,
  });
  console.log(response)
};

module.exports = sendBasicEmail;
