const { response, urlencoded } = require('express');
const express = require('express');
const app = express();
const body_parser = require('body-parser');

app.use(body_parser.urlencoded({extended: true}));

const https = require('https');
const { futimes } = require('fs');

app.get("/", function(req, res){
    res.sendFile(__dirname+"/index.html"); 
});

app.post("/", function(req, res){
    const cityName = req.body.cityName;
    https.get("https://api.openweathermap.org/data/2.5/forecast?q="+cityName+"&appid=df35e93d4d303e88ba9f4b99e9f7cb83&units=metric&id=524901", function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const weatherCondition= weatherData.list[0].weather[0].description;
            const temp = weatherData.list[0].main.temp;
            const icon = "http://openweathermap.org/img/wn/"+weatherData.list[0].weather[0].icon+"@2x.png ";
            res.write("<p>The weather is currently "+weatherCondition+".</p>")
            res.write("<h1>The temperature in "+cityName+" is "+temp+" degree celcius.</h1>");
            res.write("<img src= "+icon+">");
            console.log(temp);
            res.send();
        })
    })
});




app.listen(3000, function(){
    console.log("server is running on port 3000");
})