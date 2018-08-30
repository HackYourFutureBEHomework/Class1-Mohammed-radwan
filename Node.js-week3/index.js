const express = require("express");
const cors =require("cors");
const server =express();
const bodyParser =require("body-parser");
const {connection}= require("./Connection");
const uuidv4 =require("uuid/v4");
const fs =require("fs");
const compression = require("compression");
const helmet = require("helmet");
// const {SHA256,AES,enc} =  require('crypto-js');
const cryptojs= require('crypto-js');
const PORT = process.env.PORT||8000;

server.listen(PORT,()=>{
    console.log(`Server is running on Localhost: ${PORT}`);
})

server.use(express.static('public'));
server.use(bodyParser.json());
server.use(cors({origin:"http://localhost:3000"}));
server.use(compression());
server.use(helmet());


server.get("/regestration/:username/:password",(request,response)=>{
const {username,password}=request.params;
const hashedPassword =cryptojs.SHA256(password).toString();
const salt =uuidv4();
const encryptedPassword = cryptojs.AES.encrypt(hashedPassword,salt).toString();
const sql ="insert into user set ?";
const values ={
    username,
    password: encryptedPassword,
    salt
}
connection.query(sql,values,(error,results)=>{
    if(error) showError(error,response);
    else{
        response.json({status:"Success", message:"Registered"})
    }
})

})

server.get("/login/:username/:password",(request,response)=>{
    const {username,password:password}=request.params;
    const hashedPassword=cryptojs.SHA256(password).toString();
    
    const sql = `select username,password,salt from user where username= ?`;
    const values =[username];

    connection.query(sql,values,(error,results)=>{
        if(error) showError(error,response);
        else{
            if(results[0]){  // I used this condition to throw an error if the username is wrong 
                const decryptedPassword  = cryptojs.AES.decrypt(results[0].password,results[0].salt);
                const hashedDatabasePassword = decryptedPassword.toString(cryptojs.enc.Utf8);

                if(hashedDatabasePassword==hashedPassword){

                    response.json({status:"Sucsess",message:"login succesfull"})

                }else showAccessError(error,response);
        
            }else showAccessError(error,response);
        
        }
    })
})
function showAccessError(error,response){
    console.log(error);
    response.json({status:"Failed",message:"Wrong username or password "});
}

server.get("/get/jokes",(request,response)=>{
    connection.query(`select * from joke `,(error,results)=>{
    if(error){
        showError(error,response);
    }
    response.json(results);
    })
})


// server.get('/login/:username/:password', (req, res) => {
//     const {
//       username,
//       password,
//     } = req.params;
//     const sql = `SELECT * FROM user WHERE ?`;
//     const values = {
//       username
//     };
//     connection.query(sql, values, (error, results) => {
//       const aesPassword = results[0].password;
//       const aesDecrypt = AES.decrypt(aesPassword.toString(), results[0].salt);
//       const shaSqlPassword = aesDecrypt.toString(enc.Utf8);
//       const shaPassowrd = SHA256(req.params.password).toString();
//       if (shaPassowrd === shaSqlPassword) {
//         res.json({
//           status: 'Success',
//           message: 'Successfully logged in'
//         });
//       } else {
//         res.json({
//           status: 'Error',
//           message: 'Password is not correct'
//         });
//       }
//     });
//   });
  
  

server.post("/update/joke/:vote",(request,response)=>{
    const { body } = request;
    if(body){
        const { id } = body;
        if(id){
            let sql;
            const vote= request.params.vote;
            if(vote==="upvote")
             sql ="update joke set up_votes =up_votes + 1 where id = ? ";
            else
             sql ="update joke set down_votes =down_votes + 1 where id = ? ";
            let values = [id];
            connection.query(sql,values,(error,results)=>{
                if(error){
                    showError(error,response);
                }
                response.json({status: "succes",  message: "joke voted"})
            })
        }
    }
})
function showError(error,response){
    console.log(error);
    response.json({status:"error",message:"something went wrong "});
}

server.post("/post/joke",(request,response)=>{
    const {body}= request;
    if(body){
        const{title,file} = body;
        if(file){
            const {base64}=file;
            const fileName =uuidv4();
            fs.writeFile(`./public/images/${fileName}.jpeg`,base64,'base64',(error)=>{
                if(error){
                    console.log(error);
                }
            })
            const sql = "INSERT into joke set ?";
            const values ={
                image_location:`http://10.20.0.48:8000/images/${fileName}.jpeg`,
                title
            }
        
            connection.query(sql,values,(error,result)=>{
            if(error) showError(error,response);
            response.json({status: "succes",  message: "joke uploaded"})
            })
        }   
    }
})

//Get a single joke
server.get("/get/joke/:id",(request,response)=>{
    const {id}= request.params;
    const values=[id];
    connection.query(`select * from joke where id =? `,values,(error,results)=>{
    if(error){
        showError(error,response);
    }
    response.json(results[0]);
    })
});

//Get comments per joke
server.get("/get/comments/:jokeId",(request,response)=>{
    const {jokeId} = request.params;
    const values = [jokeId];
    connection.query(`select * from comment where joke_id=?`,values,(error,results)=>{
        if(error)
        showError(error.response);
        response.json(results);
    });
});

//Post a comment
server.post("/post/comment",(request,response)=>{
    const {body} = request;
    if(body){
        const{text,username,joke_id} = body;
        const sql ="insert into comment set ?";
        const values = {
            text,
            username,
            joke_id
        }
        connection.query(sql,values,(error,result)=>{
            if(error){
                showError(error,response);
            }
            response.json({status: "succes",  message: "comment posted"})
        });
    }
});
