const express = require('express');
const { AuthendicateUser } = require('../controllers/login');
var router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { email, password} = await req.body;

    var loginCredentials = await AuthendicateUser(email, password);
    console.log(loginCredentials);

    if (loginCredentials === "Invalid user name and password") {
        res.status(200).send("Invalid user name and password!")
    } else if (loginCredentials === "Server Busy") {
        res.status(200).send("Server Busy!") 
    } else {
        res.status(200).json({ token: loginCredentials.token})
    }
  } catch (e) {
    console.log(e);
    res.status(500).send("Server Busy");
  }
});


module.exports = router

