//----------------------------------
// lib
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const cors = require("cors");

// --------------------------------------------
// env
const envJson = require(`${__dirname}/env/env.json`);
const uploadFilePath = envJson.uploadFilePath;
const port = envJson.port ? envJson.port : 3001;

//----------------------------------
// middleware

// cors
app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
  })
);
// bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { swaggerUi, specs } = require("./swagger/swagger")

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs))

// db
app.use(require(`${__dirname}/middleware/db`));


//----------------------------------
// routes
app.use(uploadFilePath, express.static(path.join(__dirname + uploadFilePath)));
app.use("/base", require(`${__dirname}/routes/base/base`));
app.use("/user", require(`${__dirname}/routes/base/auth`));

app.get("/", function (req, res) {
  res.send("Hello node.js");
});

//----------------------------------
//
app.listen(port, () => {
  console.log(`{init : ${port}}`);
});
