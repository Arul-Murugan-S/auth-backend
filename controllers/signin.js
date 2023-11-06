const User = require("../models/User");
const { sendMail } = require('./sendMail');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
const verifyUser = require("../models/verifyUser");

dotenv.config();

async function InsertVerifyUser(name, email, password) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const token = generateToken(email);

        const newUser = new verifyUser({
            name: name,
            email: email,
            password: hashedPassword,
            token: token
        });

        const activationLink = `https://auth-backend-fytz.onrender.com/signin/${token}`;     // for local,   `http://localhost:4000/signin/${token}`;
        const content = `<h4> hi, there </h4>
        <h4>You are Welcome to the app</h4>
        <p>Thank you for signing up click on the below link to activate your account</p>
        <a href='${activationLink}'>click here to activate</a>
        <p>Regards</p>
        <p>sa</p>`;

        await newUser.save();
        sendMail(email, "VerifyUser", content) 

        console.log(newUser);
    } 
    catch(e) {
        console.log(e);
    }
}

const generateToken = (email) => {
    const token = jwt.sign(email, process.env.signup_secret_token);
    return token;
};

async function InsertSignUpUser(token) {
    try {
        const userVerify = await verifyUser.findOne({
            token: token
        });
        if (userVerify) {
            const newUser = new User({
                name: userVerify.name,
                email: userVerify.email,
                password: userVerify.password,
                forgetPassword: {}
            });
            await newUser.save();
            await userVerify.deleteOne({token: token});

            const successMessage = `<h4> Registration Successful </h4>
            <h4>You are Welcome to the app</h4>
            <p>You are successfully registered</p>`;

            sendMail(newUser.email, "Registration Successful", successMessage);   // content or successMessage
            return successMessage;
        }
      return   `<h4> Registration Failed </h4>
                <h4>Link expired...</h4>
                <p>Regards</p>
                <p>sa</p>`;
    } catch(e) {
        console.log(e);
        return `<html>
                  <body>
                    <h4> Registration Failed </h4>
                    <h4>Unexpected Error...</h4>
                    <p>Regards</p>
                    <p>sa</p>
                   </body>
                <html>`;
    }
    
};

module.exports = { InsertVerifyUser, InsertSignUpUser }