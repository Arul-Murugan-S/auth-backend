const express = require('express');
const { CheckUser} =require("../controllers/login");
var router = express.Router();

const { InsertVerifyUser, InsertSignUpUser } = require("../controllers/signin");

router.get('/:token', async (req, res) => {
    try {
        const response = await InsertSignUpUser(req.params.token);
        res.status(200).send(response);
    } catch(e) {
        console.log(e);
        res.status(200).send(`<html>
        <body>
          <h4> Registration Failed </h4>
          <h4>Link expired....</h4>
          <p>Regards</p>
          <p>Team</p>
         </body>
      <html>`);
    }

});


router.post('/verify', async (req, res) => {
    try {
        const { name, password, email} = await req.body;
        console.log(name, email, password);
        
        const registerCredentilas = await CheckUser(email);
            if (registerCredentilas === false) {
                await InsertVerifyUser(name, email, password);
                res.status(200).send(true);

            } else if (registerCredentilas === true) {
                res.status(200).send(false) ;    
            } else if (registerCredentilas === "Server Busy") {
                res.status(500).send("Server Busy");
            }
    } catch (e) {
        console.log(e);
    }
        
});


module.exports = router;