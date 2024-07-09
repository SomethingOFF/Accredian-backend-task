const jwt = require("jsonwebtoken");

const prisma = require("../lib/prisma");
const AsyncError = require("./AsyncError");
const ErrorHandler = require("../utils/ErrorHandler");

exports.isAuthenticated = AsyncError(async (req, res, next) => {
  const { auth } = req.cookies;
  console.log(auth);
  if (!auth) return next(new ErrorHandler("login again!", 400));
  const data = jwt.verify(auth, process.env.SECRET_KEY);
  req.user = await prisma.user.findUnique({
    where: {
      id: data.id,
    },
  });
  next();
});
