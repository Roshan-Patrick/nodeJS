const express = require("express")
const app = express();


app.use(express.json());
app.listen(4100,()=>{
    console.log("Server running on port 4100")
});

let requestCount = 0;

function isOldEnough(req,res,next){
    const age = req.query.age;
    if(age>=14){
        next();
    }else{
        res.json({
            msg:"Sorry you're not of age yet"
        });
    }
}

// app.use(isOldEnough);
app.use((req,res,next) =>{
    requestCount +=1;
    next();
})

app.get("/ride",isOldEnough,function(req,res){
        res.json({
            msg:"You have successfully ridden the ride"
        })
})

app.get("/ride2",isOldEnough,function(req,res){
    res.json({
        msg:"You have successfully ridden the ride"
    })
})

app.get("/requestCount",(req,res)=>{
    res.json({
        msg:requestCount
    })
})

