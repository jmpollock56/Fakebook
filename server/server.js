import express from "express"
import { getUser, getUsers, createUser } from "./database/db_connection.js";

const app = express();

function verifyUser(){
  
}

app.get('/api/users', async (req, res) => {
  try{
    const users = await getUsers();
    console.log(users);
    res.send(users);
  } catch (error) {
    console.log(error);
    res.status(500).send('Something Broke');
  }
})

app.listen(3000, () => {
  console.log("Server listening on port 3000");
})