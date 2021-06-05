const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")
const app = express()
const https = require("https")

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))

app.get("/", function(req, res){
    res.sendFile(__dirname+"/signup.html")
})

app.post("/failure", function(req,res){
    res.redirect("/")
})


app.post("/", function(req,res){
    var fname = req.body.fname;
    var lname = req.body.lname;
    var email = req.body.email;
    
    var data = {
        members : [
            {
                email_address : email,
                status : "subscribed",
                merge_fields : {
                    FNAME : fname,
                    LNAME : lname
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data)
    const url ='https://us2.api.mailchimp.com/3.0/lists/a651e275c4'
    
    const options = {
        method : "POST",
        auth : "rohit1:a4ea5de11b14af73d41624be33bbabfe-us2"
    }
    
    
    const request = https.request(url, options, function(response){
        
        if(response.statusCode===200 && email != "" && fname !="" && lname !=""){
            res.sendFile(__dirname+"/success.html")
        }else{
            res.sendFile(__dirname+"/failure.html")
        }
        
        response.on("data", function(data){
            console.log(JSON.parse(data))
        })
    })

    request.write(jsonData);
    request.end();
    
})

app.listen(process.env.PORT || 3000, function(){
    console.log("ur app is running on 3000 port")
})

//api key a4ea5de11b14af73d41624be33bbabfe-us2

// list id a651e275c4