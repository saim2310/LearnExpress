

const express = require('express')
const students = require('./students')

const app=express()
app.use(express.json())

app.get('/api/students',(req,res)=>
{
res.json(students)

})
app.post("/api/students",(req,res)=>
{

    // if(!req.body.email)
    // {
    //     res.status(400)
    //    return res.json({error:"email requires!"})
    // }

    const user=
        {
            name:req.body.name,
            pass:req.body.pass
        }
    
    students.push(user)
    res.json(user)
})
app.delete("/api/delete/:pass",(req,res)=>
{
    let pass = req.params.pass;
    let index = students.findIndex((students)=>
    {
        return(students.pass==Number.parseInt(pass))
    } )
if(index>=0)
{
    let std = students[index]
    students.splice(index,1)
    res.json(std)
}
else{
    res.status(400)
}



})





app.listen(1000,()=>
{
console.log("server is running !")
})



