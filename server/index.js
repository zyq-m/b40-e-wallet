const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const user = require("./queries/studentsQueries");
const cafe = require("./queries/cafeOwnersQueries");
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
app.put("/students/:id/wallet", user.setWalletAmount);
app.put("/students/:id/suspend", user.suspendStudents);

app.get("/cafe", cafe.getCafe);
app.get("/cafe/:id", cafe.getCafeById);
app.post("/cafe", cafe.createCafe);
app.put("/cafe/:id/suspend", cafe.suspendCafe);
app.get("/cafe/:id/transactions", cafe.getTransactions);

app.get("/", (req, res) => {
  res.json({ docs: "I am a full-stack dev" });
});

app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
