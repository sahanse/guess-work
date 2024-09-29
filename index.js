import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const port=3000;
const app= new express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", async(req,res)=>{
    try{
        const response= await axios.get("https://bored-api.appbrewery.com/random");
        const result= response.data;
        console.log(result);
        res.render("index.ejs",{
            data:result
        })
    }catch(error){
        console.log("the error is:",error.message);
        res.render("index.ejs",{
            error:error.message
        });
    }
});

app.listen(port,()=>{
    console.log("listening to the port",port);
});

app.post("/", async(req,res)=>{
    try{
        let type=req.body.type;
        let party=req.body.party;
        let promise=await axios.get(`https://bored-api.appbrewery.com/filter?type=${type}&participants=${party}`);
        let result=promise.data;
        res.render("index.ejs",{
            data:result[Math.floor(Math.random() *result.length)]
        })
    }catch(error){
        res.render("index.ejs",{
            error:error.message
        })
    }
})



