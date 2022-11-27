const express = require("express");
const router = express.Router();
const connection = require('../db');

router.post('/login', async (req, res) => {
  const { username, password } = req.body ;
  connection.query(
    "SELECT COUNT(id) AS login_state FROM users WHERE username = ? AND password = ?",
    [username, password],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(400).send();
      }
      if (result[0].login_state < 1) {
        console.log("Username or password is wrong!!");
        return res.json({ login_state: result[0].login_state, message:"Username or password is wrong!!", state:false });
      }
      /* return res.json({ login_state: result[0].login_state, message:"Login sucessfully!!" }); */
      connection.query(
        "SELECT * FROM users WHERE username = ?",
        [username],
        (err, results) => {
          if (err) {
            console.log(err);
            return res.status(400).send();
          }
          console.log("Login Successfull!!");
          return res.json({userdata: results, message:"Login successful!!", state:true});
        }
      );
    }
  );
});

module.exports = router;