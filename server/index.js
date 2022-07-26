const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const student = require("./queries/studentsQueries");
const cafe = require("./queries/cafeOwnersQueries");
const transaction = require("./queries/transactionsQueries");
const admin = require("./queries/adminQueries");
const port = 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/students", student.getStudents);
app.get("/students/:id", student.getStudentsById);
app.post("/students", student.createStudent);
app.post("/students/login", student.loginStudents);
app.put("/students/:id/wallet", student.setWalletAmount);
app.put("/students/:id/suspend", student.suspendStudents);

app.get("/cafe", cafe.getCafe);
app.get("/cafe/:id", cafe.getCafeById);
app.post("/cafe", cafe.createCafe);
app.post("/cafe/login", cafe.loginCafe);
app.put("/cafe/:id/suspend", cafe.suspendCafe);
app.get("/cafe/:id/transactions", cafe.getTransactions);

app.get("/transactions", transaction.getTransactions);
app.post("/transactions/cafe/:id", transaction.pay);

app.post("/admin", admin.loginAdmin);

app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
