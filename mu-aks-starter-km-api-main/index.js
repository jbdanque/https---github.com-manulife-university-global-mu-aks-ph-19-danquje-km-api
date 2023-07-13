const express = require("express"); // importing the module
const bodyParser = require("body-parser");
const cors = require("cors");
const carRepository = require("./repository");

const localData = require("./data");
const port = 4000;
const app = express(); // creating an Express app

app.use(bodyParser.json()).use(cors());
const _carRepository = new carRepository();

app.get("/", (req, res) => res.send("REST API is running 🚀"));

// set up route for '/', http://expressjs.com/en/5x/api.html#res.send
// this will show up on `localhost:4000` in the browser
app.get("/api/v1/cars", async (request, response) => {
  try {
    let data = localData.topCarBrands;
    if (process.env.APP_DB_HOST) {
      const result = await _carRepository.getTopCarBrands();
      data = result.recordset;
    }
    return response.json(data);
  } catch (err) {
    console.error("Error happened when retrieving top car brands from db", err);
    response.sendStatus(500);
  }
});

// server will start listening for requests, the function is called immediately once the server is ready. Console.logs show up in your terminal.
app.listen(port, () =>
  console.log(`Hello World, I'm listening on port ${port}!`)
);
