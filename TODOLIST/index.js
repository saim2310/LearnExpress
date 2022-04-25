const express =  require("express");
const app = express()
const bodyParser = require("body-parser")
const PORT = 3000

// File System
const fs = require("fs")

// DB Path
const db = "./data.json"
console.log(db);


// middlewares
app.use(bodyParser.json())

app.get("/readtodo", (req, res) => {
    data = JSON.parse(fs.readFileSync(db, "utf-8"))    
    res.json(data)
    

})

//create todo
app.get("/addtodo", (req, res) => {
    data = JSON.parse(fs.readFileSync(db, "utf-8"))    
    newtask = {
        task: req.query.task ,
         prog: req.query.prog}
    data.push(newtask)
    res.send('New task Added')
    fs.writeFileSync(db, JSON.stringify(data));

})

//update
app.get("/updatetodo/:task", (req, res) => {
    let data = JSON.parse(fs.readFileSync(db, "utf-8"))  
    updatedData = []

    // searching user
    data.forEach((task, i) => {
        if (task.task == req.params.task){
            updatedData = [task, i]
            return true
        } 
    })

    // validating user found or not
    if(updatedData.length > 0){

        console.log("updatedData");
        console.log(updatedData);
        

        // now updating user name if required
        if(typeof req.query.task !== "undefined"){
            data[updatedData[1]].task = req.query.task
        }
        
        // now updating user password if required
        if(typeof req.query.prog !== "undefined"){
            data[updatedData[1]].prog = req.query.prog
        }

        fs.writeFileSync(db, JSON.stringify(data));

    }

    res.json(updatedData.length > 0 ? {msg: "Data updated", data: updatedData[0] } : "User not found")
})


app.get("/delete/:task",(req,res)=>
{
data= JSON.parse(fs.readFileSync(db, "utf-8"))
index = data.findIndex((x=> x.task==req.params.task))

if(index>=0)
{
    data.splice(index,1)
    res.send("deleted")
}
else 
{
    
    res.send("not found")
}
fs.writeFileSync(db, JSON.stringify(data));
})



app.listen(PORT, () => {
    console.log("Server is running at port: " + PORT);
})
