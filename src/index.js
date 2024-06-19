const express = require("express");
const bodyParser = require("body-parser");
const { PORT } = require("./config/serverConfig");

const TicketController = require("./controller/ticket-controller");

// const sendBasicEmail = require("./services/email-service");
// var cron = require("node-cron");

const jobs = require("./utils/cron-jobs");

const setUpAndStartServer = async () => {
  const app = express();
  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.post("/api/v1/tickets", TicketController.create);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    jobs();

    // sendBasicEmail(
    //   "pabitrasundardakua@gmail.com",
    //   "pabitradakua85@gmail.com",
    //   "this is a testing email",
    //   "ur application is approved"
    // );

    // cron.schedule("*/2 * * * *", () => {
    //   console.log("running a task every two minutes");
    // });
  });
};

setUpAndStartServer();
