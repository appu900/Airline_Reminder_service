const { StatusCodes } = require("http-status-codes");
const TicketService = require("../services/email-service");

const create = async (req, res) => {
  try {
    console.log(req.body)
    const response = await TicketService.createNotification(req.body);
    return res.status(StatusCodes.CREATED).json({
      success: true,
      data: response,
      message: "Notification Scheduled Sucessfully",
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: error.message,
      message: "Something Went Wrong",
    });
  }
};

module.exports = { create };







