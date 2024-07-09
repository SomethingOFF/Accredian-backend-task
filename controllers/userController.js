const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/ErrorHandler");

const prisma = require("../lib/prisma.js");
const AsyncError = require("../middleware/AsyncError.js");

exports.registerUser = AsyncError(async (req, res, next) => {
  try {
    const { name, email, password, describe, contact, position } = req.body;
    if (!name && !email && !password && !describe && !contact && !position) {
      return next(new ErrorHandler("credentials fied should be required", 400));
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        describe,
        contact,
        position,
      },
    });

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );
    res
      .status(200)
      .cookie("auth", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: age,
      })
      .json({
        message: "user has been created",
      });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler("User creation problem", 400));
  }
});
exports.LoginUser = AsyncError(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email && !password) {
      return next(new ErrorHandler("credentials fied should be required", 400));
    }
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) return next(new ErrorHandler("check your credentials", 400));
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      return next(new ErrorHandler("check your credentials", 400));

    const age = 1000 * 60 * 60 * 24 * 7;
    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );
    res
      .status(200)
      .cookie("auth", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: age,
      })
      .json({
        message: "user logged in successfully",
        user,
      });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler("User login problem", 400));
  }
});

exports.logout = AsyncError(async (req, res, next) => {
  res.status(200).clearCookie("auth").json({ message: "Logout Successful" });
});
