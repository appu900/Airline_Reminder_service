const sender = require("../config/email-config");
const TicketRepository = require("../Repository/ticket-repository");

const sendBasicEmail = async (from, to, subject, mailBody) => {
  const response = await sender.sendMail({
    from: from,
    to: to,
    subject: subject,
    text: mailBody,
  });
  console.log(response);
};

const fetchPendingEmails = async (timestamp) => {
  try {
    const repo = new TicketRepository();
    const response = await repo.get({ status: "Pending" });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const updateTicket = async (ticketId, data) => {
  try {
    const repo = new TicketRepository();
    const res = await repo.update(ticketId, data);
    return res;
  } catch (error) {
    throw error;
  }
};

const createNotification = async (data) => {
  try {
    const repo = new TicketRepository();
    const notification = await repo.create(data);
    return notification;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const subscribedEvents = async (payload) => {
  try {
    let service = payload.service;
    const data = payload.data;
    console.log(service);

    switch (service) {
      case "CREATE_TICKET":
        await createNotification(data);
        break;
      case "SEND_BASIC_EMAIL":
        await sendBasicEmail(data);
        break;
      default:
        console.log("No valid event recived");
        break;
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  fetchPendingEmails,
  sendBasicEmail,
  createNotification,
  updateTicket,
  subscribedEvents,
};
