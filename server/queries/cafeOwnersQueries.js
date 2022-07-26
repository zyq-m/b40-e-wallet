const pool = require("./query");

const getCafe = (request, response) => {
  pool.query("SELECT * FROM cafe_owners", (error, results) => {
    if (error) return response.status(401);
    return response.status(200).json(results.rows);
  });
};

const getCafeById = (request, response) => {
  const id = request.params.id;

  pool.query(
    "SELECT * FROM cafe_owners WHERE username = $1",
    [id],
    (error, results) => {
      if (error) return response.status(404);
      return response.status(200).json(results.rows);
    }
  );
};

const createCafe = (request, response) => {
  const { username, password, owner_name, cafe_name } = request.body;

  pool.query(
    "INSERT INTO cafe_owners (username, password, owner_name, cafe_name) VALUES ($1, $2, $3, $4) RETURNING *",
    [username, password, owner_name, cafe_name],
    (error, results) => {
      if (error) response.status(400);
      return response
        .status(201)
        .send(`User added with ID: ${results.rows[0].username}`);
    }
  );
};

const suspendCafe = (request, response) => {
  const id = request.params.id;
  const { active } = request.body;

  pool.query(
    "UPDATE cafe_owners SET active = $1 WHERE username = $2",
    [active, id],
    (error, results) => {
      if (error) return response.status(404);
      return response.status(200).send(`Cafe suspended with username: ${id}`);
    }
  );
};

const getTransactions = (request, response) => {
  const id = request.params.id;

  pool.query(
    "SELECT * FROM transactions WHERE recipient = $1",
    [id],
    (error, results) => {
      if (error) return response.status(404);
      return response.status(200).json(results.rows);
    }
  );
};

module.exports = {
  getCafe,
  getCafeById,
  createCafe,
  suspendCafe,
  getTransactions,
};
