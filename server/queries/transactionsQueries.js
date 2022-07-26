const pool = require("./query");

const getTransactions = (request, response) => {
  pool.query("SELECT * FROM transactions", (error, results) => {
    if (error) return response.status(500);
    return response.status(200).json(results.rows);
  });
};

const pay = (request, response) => {
  const id = request.params.id;
  const { amount, date, time, sender } = request.body;

  pool.query(
    "INSERT INTO transactions (amount, date, time, sender, recipient) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [amount, date, time, sender, id],
    (error, results) => {
      if (error) return response.status(500);
      return response
        .status(201)
        .json(results.rows, { message: "Payment successfull" });
    }
  );
};

module.exports = {
  getTransactions,
  pay,
};
