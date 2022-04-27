module.exports = {
    test:function  (req, res, next){    
        console.log(req.query.admin);
        if ("saim" !== req.query.admin){
            return res.redirect("/")
        } 
        next();
    }
}