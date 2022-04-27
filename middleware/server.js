       ////////////////////////////////////////////////
      //       inventory management system          //
     //   only admin can update and read the data  //
    ////////////////////////////////////////////////

const express =  require("express");
const app = express()
const bodyParser = require("body-parser")
const PORT = 3000
const logger = require("morgan");


const { test } = require("./middleware/testing")

// File System
const fs = require("fs")

// DB Path
const db = "./public/db/db.json"

// middlewares
app.use(bodyParser.json())
app.use(logger("dev"))

app.get("/", (req, res) => {
    res.send("Welcome to Home!!!")
})

app.get("/read", test, (req, res) => {
    data = JSON.parse(fs.readFileSync(db, "utf-8"))    
    res.json(data)
})

app.get("/find/:item", (req, res) => {
    let data = JSON.parse(fs.readFileSync(db, "utf-8"))    
    const item = req.params.item;

    founddata = data.find(user => {
        return user.item == item
    })

    console.log(typeof founddata);

    res.json( typeof founddata !== "undefined" ? founddata : "User not found")
})

app.get("/update/:item", test, (req, res) => {
    let data = JSON.parse(fs.readFileSync(db, "utf-8"))  
    updatedData = []

    // searching user
    data.forEach((user, i) => {
        if (user.item == req.params.item){
            updatedData = [user, i]
            return true
        } 
    })

    // validating user found or not
    if(updatedData.length > 0){

        console.log("updatedData");
        console.log(updatedData);
        

        // now updating user name if required
        if(typeof req.query.it !== "undefined"){
            data[updatedData[1]].item = req.query.it
        }
        
        // now updating user password if required
        if(typeof req.query.q !== "undefined"){
            data[updatedData[1]].qty = req.query.q
        }

        fs.writeFileSync(db, JSON.stringify(data));

    }

    res.json(updatedData.length > 0 ? {msg: "Data updated", data: updatedData[0] } : "User not found")
})


app.listen(PORT, () => {
    console.log("Server is running at port: " + PORT);
})