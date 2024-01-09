//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming

import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

// We can also use app.use(express.urlencoded({ extended: true })); and erase the import bodyParser from "body-parser"


const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

var userIsAuthorised = false;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
})


function passwordCheck(req, res, next) {
    const password = "ILoveProgramming";
    if (password === req.body["password"]){
        userIsAuthorised = true;
    }
    next();
}

app.use(passwordCheck);

app.post("/check" , (req, res) => {
    if (userIsAuthorised){
        res.sendFile(__dirname + "/public/secret.html");
    }
    else {
        res.redirect("/");
    }
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})