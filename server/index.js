const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const user = require("./queries/studentsQueries");
const port = 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/students", user.getStudents);
app.get("/students/:id", user.getStudentsById);
app.post("/students", user.createStudent);
app.put("/students/wallet/:id", user.setWalletAmount);
app.put("/students/suspend/:id", user.suspendStudents);

app.get("/", (req, res) => {
  res.json({ docs: "I am a full-stack dev" });
});

app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
