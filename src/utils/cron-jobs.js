const cron = require("node-cron");
const emailService = require("../services/email-service");
const sender = require("../config/email-config");

/**
 * 10.00 Am
 * evrry 5 minutes
 * we will check are there any pending emails to be send
 *
 */

const setupJobs = async () => {
  cron.schedule("*/1 * * * *", async () => {
    const response = await emailService.fetchPendingEmails();
    response.forEach((email) => {
      sender.sendMail(
        {
          from: "Reminder@gmail.com",
          to: email.recepientEmail,
          subject: email.subject,
          text: email.content,
        },
        async (err, data) => {
          if (err) {
            console.log(err);
          } else {
            console.log(data);
            await emailService.updateTicket(email.id, { status: "Success" });
          }
        }
      );
    });
    console.log(response);
  });
};

module.exports = setupJobs;

// ## jay shree ram
/***
 *
 *
 * [service 1 (100 query ps) publisher] ----------> message queue [msg1,msg2,msg3...]  --------> [service 2 (20qps) SubScriber]
 * 
*
 */
