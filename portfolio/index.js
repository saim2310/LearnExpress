const express = require('express')
const app = express()
const port = 2001
const pss = "asdsad"
const path = require('path');




app.get('/portfolio', (req, res) => {
    res.sendFile(path.join(__dirname, '/CV.html'))

})
app.get('/skills', (req, res) => {
    res.json({
        Skill1: "HTML 5",
        Skill2: "CSS 3",
        Skill3: "JAVASCRIPT",
        Skill4: "NODE.JS",
        Skill5: "EXPRESS.JS",
        Skill6: "REACT.JS",
        Skill7: "MONGODB",
        Skill8: "SQL",
        Skill9: "ORACLE"



    })
   
  })



app.listen(port, () => {
  console.log(`Example app listening on port ${port} fsdfd ${pss}`)
})