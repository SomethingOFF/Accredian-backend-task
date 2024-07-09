const app = require("./app");
process.on("uncaughtException", (err) => {
  console.log(err.message);
  console.log(`server is down due to UncaughtException error occured`);
  process.exit(1);
});

const server = app.listen(process.env.PORT, () => {
  console.log(`listing on the port localhost:${process.env.PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err);
  console.log(
    `Server is down due to unhadled rejection we are fixing in please contact to admin`
  );
  server.close(() => {
    process.exit(1);
  });
});
