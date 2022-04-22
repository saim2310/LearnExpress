const express =  require("express");
const app = express()
const bodyParser = require("body-parser")
const PORT = 3000

// File System
const fs = require("fs")

// DB Path
const db = "./public/db/db.json"

// middlewares
app.use(bodyParser.json())


app.get("/read-db", (req, res) => {
    data = JSON.parse(fs.readFileSync(db, "utf-8"))    
    res.json(data)
})


app.get('/users', (req, res) => {
    var userData = json;
    
    res.send(userData);
        
        }), 
        


app.get("/filter/:pass",(req,res)=>
{
    let data = JSON.parse(fs.readFileSync(db, "utf-8")) 

    pass = req.params.pass

    fildata = data.filter(pwd=>{
        if(pwd.pass==pass)
        {
         return pwd.name   
        }
    })

    console.log(fildata);
res.json(typeof fildata !=='undefined '? fildata : "user not find ")

})






app.get("/find-db/:name", (req, res) => {
    let data = JSON.parse(fs.readFileSync(db, "utf-8"))    
    const name = req.params.name;

    founddata = data.find(user => {
        return user.name == name
    })

    console.log(typeof founddata);

    res.json( typeof founddata !== "undefined" ? founddata : "User not found")
})

app.get("/update-user/:name", (req, res) => {
    let data = JSON.parse(fs.readFileSync(db, "utf-8"))  
    updatedData = []

    // searching user
    data.forEach((user, i) => {
        if (user.name == req.params.name){
            updatedData = [user, i]
            return true
        } 
    })

    
    // validating user found or not
    if(updatedData.length > 0){

        console.log("updatedData");
        console.log(updatedData);
        

        // now updating user name if required
        if(typeof req.query.n !== "undefined"){
            data[updatedData[1]].name = req.query.n
        }
        
        // now updating user password if required
        if(typeof req.query.p !== "undefined"){
            data[updatedData[1]].pass = req.query.p
        }

        fs.writeFileSync(db, JSON.stringify(data));

    }

    res.json(updatedData.length > 0 ? {msg: "Data updated", data: updatedData[0] } : "User not found")
})

app.post("/add-user",(req,res)=>
{
    const user=[
        {
            "name":req.params.n,
            "pass":req.params.p
        }
    ]

    db.push(user)
    res.json(user)
})

app.get("/delete/:name",(req,res)=>
{
let a = JSON.parse(fs.readFileSync(db, "utf-8",{flags : "a"}))
q = a.findIndex(x=> x.name==req.params.name)
console.log(q);    
console.log(a);
if(q==-1)
{
    res.send("user deleted")
}
else if(q>1)
{
    a.splice(q,1)
    res.send("deleted")
}
fs.writeFileSync(db, JSON.stringify(a));
})


app.listen(PORT, () => {
    console.log("Server is running at port: " + PORT);
})
