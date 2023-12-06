const express = require("express");
const connectDb = require("./db/db");
const app = express();
const port = 3000;
const menuRouter = require("./routes");
const cors = require("cors");

connectDb();

app.use(cors());
app.use(express.json());
app.use("/api", menuRouter);
app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
