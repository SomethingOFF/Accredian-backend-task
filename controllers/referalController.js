const prisma = require("../lib/prisma.js");
const AsyncError = require("../middleware/AsyncError.js");
const ErrorHandler = require("../utils/ErrorHandler");
const Mailservice = require("../utils/MailService.js");

exports.CreateReferal = AsyncError(async (req, res, next) => {
  try {
    const { program, message, userEmails } = req.body;
    const user = req.user;
    console.log(user)
    if (!program && !message && !userEmails) {
      return next(new ErrorHandler("missing fields", 400));
    }
    const referal = await prisma.referal.create({
      data: {
        userId: user.id,
        message,
        program,
      },
    });
    if (!referal) {
      return next(new ErrorHandler("post referal issue", 400));
    }
    await Mailservice({
      sender: user.email,
      receiver: userEmails,
      subject: program,
      text: message,
    });
    res.status(200).json({
      success: true,
      message: `sent mails to users`,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "mail service Error",
    });
  }
});
