const express = require("express");
const converter = require('number-to-words');
const server= express();
const PORT=8000;
var nodemailer = require('nodemailer');

server.listen(PORT,()=>{
    console.log(`Server is running on Localhost:${PORT}`);
})

server.get("/:tagId",async function(request,response){
    try{
        const {tagId}= await request.params;
        response.send(`${tagId}`);
        }
    catch(err){response.send('Error');}

})


server.get("/:number1/plus/:number2/is",async function(request,response){
    // Another way to check if it is a number or not

    // if(isNaN(request.params.number1)||isNaN(request.params.number2)){
    //     response.send('Not a number');
    // }else{
    try{
        result = Number(request.params.number1) + Number(request.params.number2);
        inWord= converter.toWords(result);
        response.send(`The tag is set to : ${inWord}`);
    }catch(err){response.send('Error');}
   // }    
})

server.get("/sendmail/:tagId",function(request,response){

    const tagId=request.params.tagId;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'Your Email',
            pass: 'Your Password'
        }
    });
    
    let MailOptions = {
        from: '"mohammed" <mohammadfradwan@gmail.com',
        to: `${tagId}`,
        subject: 'Hi',
        text: 'Hello there!!',
        html: '<center><h1>Hello Me</h1><p>Awesome!</p><center>'
    };

    transporter.sendMail(MailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }else{
        response.send("The message was sent!");
        console.log(info);
        }
    });

})



