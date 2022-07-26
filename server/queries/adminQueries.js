const pool = require("./query");

const loginAdmin = (request, response) => {
  const { email, password } = request.body;

  pool.query(
    "SELECT email FROM admin_b40 WHERE email = $1 AND password = $2",
    [email, password],
    (error, results) => {
      if (error) return response.sendStatus(500);
      if (results.rowCount === 0) return response.sendStatus(404);
      return response.sendStatus(200);
    }
  );
};

module.exports = {
  loginAdmin,
};
