const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

router.post("/", authorization, async (req, res) => {
  try {
    const { description } = req.body;

    const newTodo = await pool.query(
      "INSERT INTO todos (description, user_id) VALUES ($1, $2) RETURNING id, description;",
      [description, req.user]
    );

    res.status(200).json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/", authorization, async (req, res) => {
  try {
    const allTodos = await pool.query(
      "SELECT id, description FROM todos WHERE user_id = $1 ORDER BY id;",
      [req.user]
    );

    res.status(200).json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/:id", authorization, async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await pool.query(
      "SELECT id, description FROM todos WHERE id = $1 AND user_id = $2",
      [id, req.user]
    );

    res.status(200).json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.put("/:id", authorization, async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    const updatedTodo = await pool.query(
      "UPDATE todos SET description = $1 WHERE id = $2 AND user_id = $3 RETURNING id, description;",
      [description, id, req.user]
    );

    res.status(200).json(updatedTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.delete("/:id", authorization, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTodo = await pool.query(
      "DELETE FROM todos WHERE id = $1 AND user_id = $2 RETURNING id",
      [id, req.user]
    );

    if (deletedTodo.rows.length > 0) {
      res.status(200).json("Todo was deleted succesfully");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
