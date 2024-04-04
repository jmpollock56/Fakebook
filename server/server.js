import express from "express"



const app = express();

app.get('/api/users', (req, res) => {

  
  res.json({"users": ["user1", "user2", "user3"]});
})

app.use((err, req, res, next) => {
  console.log(err)
  res.status(500).send('Something Broke!')
})

app.listen(3000, () => {
  console.log("Server listening on port 3000");
})