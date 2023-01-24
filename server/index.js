const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.use("/auth", require("./routes/jwtAuth"));
app.use("/dashboard", require("./routes/dashboard"));
app.use("/todos", require("./routes/todos"));

app.listen(8000, () => {
  console.log("App is listening on port 8000");
});
