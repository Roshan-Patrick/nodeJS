const express = require("express");
const zod = require("zod");

const app = express();
app.use(express.json());

const users =[{
    name:"Messi",
    kidneys:[{
        healthy:false
    }]
}]

const scheme = zod.array(zod.number());

function validate(obj){
    const schema = zod.object({
        email:zod.string().email(),
        password:zod.string().min(8)
    })

    const response = schema.safeParse(obj);
    // console.log(response)

}

validate({
    email:"messi@gmail.com",
    password:"messi@1234"
})

app.get("/", function(req,res){
    res.send("Hello there");
});

app.post("/healthy-checkup",function(req,res){
        // const kidneys = req.body.kidneys;
        // const kidneyKength = kidneys.length;
        // const response = scheme.safeParse(kidneys);
        // res.send({response})

        const data = {
            email: req.body.email,
            password: req.body.password,
          };

          console.log(typeof(data))

        const schema = zod.object({
            email:zod.string().email(),
            password:zod.string().min(8)
        })

        const response = schema.safeParse(data);
        res.send(response)
        console.log(response.data.email)
})
app.listen(4000);