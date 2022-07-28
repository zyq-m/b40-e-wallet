const pool = require("./query");

const getTransactions = (request, response) => {
  pool.query("SELECT * FROM transactions", (error, results) => {
    if (error) return response.status(500);
    return response.status(200).json(results.rows);
  });
};

const pay = (request, response) => {
  const id = request.params.id;
  const { sender, amount } = request.body;
  pool.query(
    "INSERT INTO transactions (sender, recipient, amount) VALUES ($1, $2, $3) RETURNING *",
    [sender, id, amount],
    (error, results) => {
      if (error) return response.status(500).send(error);
      return response.status(201).json(results.rows);
    }
  );
};

module.exports = {
  getTransactions,
  pay,
};
