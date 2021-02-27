import express from "express";

import serverRenderer from "./middleware/renderer";

let PORT = 3000;
if (process.env.NODE_ENV === "production") PORT = process.env.PORT;
const path = require("path");

const app = express();
const router = express.Router();

router.use("^/$", serverRenderer);

router.use(express.static(path.resolve(__dirname, "..", "build")));

app.use(router);

app.listen(PORT, (error) => {
  if (error) {
    return console.log("something bad happened", error);
  }

  console.log("listening on " + PORT + "...");
});
