const express = require("express");
const router = express.Router();
const connection = require('../db');

// Register
router.post('/users/register', async (req, res) => {
  const { username, password, title, firstname, lastname, email, position, department, mobile, tax_id, token } = req.body;
  
  connection.query(
    "SELECT COUNT(id) AS userCheck FROM users WHERE username = ? OR email = ? ",
    [username, email],
    (err, results, fields) => {
      if (err) {
        console.log("Error while inserting a user into database", err);
        return res.status(400).send();
      }
      /* console.log(typeof(results[0].userCheck)); */
      if (results[0].userCheck >= 1){
        console.log("Unable to register because this username or email already exists");
        res.status(200).json({haveUser: results[0].userCheck, registerStatus: "Unable to register because this username or email already exists"});
        return;
      }
        try {
          connection.query(
            "INSERT INTO users(username, password, title, firstname, lastname, email, position, department, mobile, tax_id, token) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [username, password, title, firstname, lastname, email, position, department, mobile, tax_id, token],
            (err, results, fields) => {
              if (err) {
                console.log("Error while inserting a user into database", err);
                return res.status(400).send();
              }
              return res.status(200).json({ message: "Register successfully!!" })
            }
          )
        } catch(err) {
          console.log(err);
          return res.status(500).send();
        }
          }
        );
    });

module.exports = router;