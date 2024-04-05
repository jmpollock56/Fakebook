import express from "express"
import bodyParser from "body-parser"
import cors from "cors"; 
import { getUser, getUsers, createUser } from "./database/db_connection.js";

const app = express();

app.use(bodyParser.json());


app.get('/api/users', async (req, res) => {
  try{
    

  } catch (error) {
    console.log(error);
    res.status(500).send('Something Broke');
  }
})

app.post('/api/login', async (req, res) => {
  const {emailOrPhone, password} = req.body;
  const users = await getUsers();
  let isUser = false;

  for(let i = 0; i < users.length; i++){

    if(emailOrPhone === users[i].username && password === users[i].password){
      isUser = true;
      break;
    } else {
      isUser = false;
    }
  }

  if(isUser){
    res.status(200).json({message: 'Login success'});
  } else {
    res.status(401).json({message: "Invalid Login"});
  }
})

app.listen(3000, () => {
  console.log("Server listening on port 3000");
})