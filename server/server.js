import express from "express"
import bodyParser from "body-parser"
import { v4 as uuidv4 } from "uuid";
import { getUser, getUsers, createUser, getPosts, createPost, getLikes, addLike, removeLike, getComments, createComment } from "./database/db_connection.js";

const app = express();
let currentUser = {};

app.use(bodyParser.json());

function createCompletePosts(users, posts, likes, comments){
  let objectPosts = [];

  for(let i = 0; i < users.length; i++){
    for(let j =0; j < comments.length; j++){
      if(users[i].user_id === comments[j].comment_user_id){
        comments[j].user_name = `${users[i].first_name} ${users[i].last_name}`;
      }
    }
  }

 
  for(let i = 0; i < users.length; i++){ 
    for(let j = 0; j < posts.length; j++){
      if(users[i].user_id === posts[j].user_id){
        
        objectPosts.push({
          post_id: posts[j].post_id, 
          user_id: users[i].user_id, 
          user_name: `${users[i].first_name} ${users[i].last_name}`,
          post_content: posts[j].content,
          post_age: posts[j].create_date,
          likes: 0
          });
      }
    }
  }

  for(let i = 0; i < objectPosts.length; i++){
    for(let j = 0; j < likes.length; j++){
      if(objectPosts[i].post_id === likes[j].likes_post_id){
        
        objectPosts[i].likes++;
      }
    }
  }

  
  let fullPosts = [];
  for(let i = 0; i < objectPosts.length; i++){
    let postComments = [];
    for(let j = 0; j < comments.length; j++){
      
      if(objectPosts[i].post_id === comments[j].comment_post_id){
        postComments.push(comments[j]);
      }
    }
    
    fullPosts.push({...objectPosts[i], postComments: postComments}); 
  }

  return fullPosts;
}

function createCompleteUsers(currentUser, likes){
  let currentUserLikes = [];

  for(let i = 0; i < likes.length; i++){
    
    if(currentUser.user_id === likes[i].likes_user_id){
      
       currentUserLikes.push(likes[i]);
    }
  }



  return {...currentUser, userLikes: currentUserLikes};
}

app.get('/api/posts', async (req, res) => {
  const allUsers = await getUsers();
  const allPosts = await getPosts();
  const allLikes = await getLikes();
  const allComments = await getComments();

  
  let completePosts = createCompletePosts(allUsers, allPosts, allLikes, allComments);
  
  res.send(completePosts);

})

app.post('/api/login', async (req, res) => {
  const {emailOrPhone, password} = req.body;
  const users = await getUsers();
  const likes = await getLikes();
  
  let isUser = false;

  for(let i = 0; i < users.length; i++){
    if(emailOrPhone === users[i].email && password === users[i].password){
      isUser = true;
      currentUser = users[i];
      break;
    } else {
      isUser = false;
    }
  }

  const completeUser = createCompleteUsers(currentUser, likes);
  
  
  if(isUser){
    
    res.status(200).json({message: 'Login success', currentUser: completeUser});
    
  } else {
    res.status(401).json({message: "Invalid Login"});
  }
  
})

app.post('/api/posts/create', async (req, res) => {

  if(req.body){
    const {post_id, content, user_id} = req.body;

    const affectedRows = await createPost(post_id, user_id, content);
    
    affectedRows < 1 ? res.status(400).json({ message: 'Failed to create post' , newPost}) : res.status(201).json({ message: 'Post created successfully' });
  } else {
    console.error("Post is null");
  }
})

app.post('/api/account/create', async (req, res) => {

  if(req.body){
    const { firstName, lastName, email, password, birthdayMonth, birthdayDay, birthdayYear, gender } = req.body;
    const date = new Date();
    const createDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
    const birthdayFull = `${birthdayYear}-${birthdayMonth}-${birthdayDay}`;
    let random_id = Math.floor(1000000 + Math.random() * 9000000);
    
    const affectedRows = await createUser(random_id, firstName, lastName, email, gender, createDate, password, birthdayFull);

    affectedRows < 1 ? res.status(400).json({message: 'Failed to create user'}) : res.status(201).json({message: 'User was created'});
  } else {
    console.error("Some part of the user data is null");
  }
  

  
  
})

app.post('/api/posts/like/add', async (req, res) => {
  if(req.body){
    const {user_id, post_id} = req.body;
    addLike(user_id, post_id);
    res.status(200).json({message: 'Like success'});
  } else {
    res.status(401).json({message: "like error"});
  }
})

app.post('/api/posts/like/remove', async (req, res) => {
  if(req.body){
    const {user_id, post_id} = req.body;
    removeLike(user_id, post_id);
    res.status(200).json({message: 'Like success'});
  } else {
    res.status(401).json({message: "like error"});
  }
})

app.post('/api/posts/comment/create', async (req, res) => {
  if(req.body){
    const {post_id, user_id, content} = req.body;
    const affectedRows = await createComment(post_id, user_id, content);
    affectedRows < 1 ? res.status(400).json({ message: 'Failed to create post' , newPost}) : res.status(201).json({ message: 'Post created successfully' }); 
  } else {
    console.error("comment is null in server");
  }
})



app.listen(3000, () => {
  console.log("Server listening on port 3000");
})

