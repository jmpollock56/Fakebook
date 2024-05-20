import express from "express"
import bodyParser from "body-parser"
import fs from 'fs';
import path from "path";
import multer from "multer";
import cors from 'cors';

import { getUser, getUsers, createUser, getPosts, createPost, getLikes, addLike, removeLike, getComments, createComment, getFriends, addFriendship, removeFriendship } from "./database/db_connection.js";

const app = express();
const upload = multer();



app.use(bodyParser.json());
app.use(cors());

let currentUser = {};



function createCompletePosts(users, posts, likes, comments) {
    let objectPosts = [];

  for (let i = 0; i < users.length; i++) {
    for (let j = 0; j < comments.length; j++) {
      if (users[i].user_id === comments[j].comment_user_id) {
        comments[j].user_name = `${users[i].first_name} ${users[i].last_name}`;
        comments[j].user_pfp = users[i].pfp;
      }
    }
  }


  for (let i = 0; i < users.length; i++) {
    for (let j = 0; j < posts.length; j++) {
      if (users[i].user_id === posts[j].user_id) {

        objectPosts.push({
          post_id: posts[j].post_id,
          user_id: users[i].user_id,
          user_name: `${users[i].first_name} ${users[i].last_name}`,
          user_pfp: users[i].pfp,
          post_content: posts[j].content,
          post_age: posts[j].create_date,
          likes: 0
        });
      }
    }
  }

  for (let i = 0; i < objectPosts.length; i++) {
    for (let j = 0; j < likes.length; j++) {
      if (objectPosts[i].post_id === likes[j].likes_post_id) {

        objectPosts[i].likes++;
      }
    }
  }


  let fullPosts = [];
  for (let i = 0; i < objectPosts.length; i++) {
    let postComments = [];
    for (let j = 0; j < comments.length; j++) {

      if (objectPosts[i].post_id === comments[j].comment_post_id) {
        postComments.push(comments[j]);
      }
    }

    fullPosts.push({ ...objectPosts[i], postComments: postComments });
  }

  return fullPosts;
}

function createCompleteUsers(currentUser, likes, friends) {
  let currentUserLikes = [];
  let currentUserFriends = [];

  for (let i = 0; i < likes.length; i++) {
    if (currentUser.user_id === likes[i].likes_user_id) {
      currentUserLikes.push(likes[i]);
    }
  }

  for (let i = 0; i < friends.length; i++) {
    if (currentUser.user_id === friends[i].user1_id) {
      currentUserFriends.push(friends[i].user2_id);
    } else if (currentUser.user_id === friends[i].user2_id) {
      currentUserFriends.push(friends[i].user1_id);
    }
  }



  return { ...currentUser, userLikes: currentUserLikes, userFriends: currentUserFriends };
}

async function createUserWithFriends(selectedUser) {
  let selectedUserFriends = [];
  const friends = await getFriends();
  const users = await getUsers();

  for (let i = 0; i < friends.length; i++) {
    if (selectedUser.user_id === friends[i].user1_id) {
      selectedUserFriends.push({ user_id: friends[i].user2_id });

      

    } else if (selectedUser.user_id === friends[i].user2_id) {
      selectedUserFriends.push({ user_id: friends[i].user1_id });
    }
  }

  for (let i = 0; i < selectedUserFriends.length; i++) {
    for (let j = 0; j < users.length; j++) {
      if (selectedUserFriends[i].user_id == users[j].user_id) {
        selectedUserFriends[i].name = `${users[j].first_name} ${users[j].last_name}`;
        selectedUserFriends[i].user_pfp = users[j].pfp;
        
      }
    }
  }

  console.log(selectedUserFriends);

  return { ...selectedUser, userFriends: selectedUserFriends };
}

async function photoUpload(req, res){
  try{
    const file = req.file;

    if(!file){
      return res.status(400).send('No file Uploaded');
    }

    const photoDirectory = 'photos'; //name of folder with photos

    //make directory if no there already
    if(!fs.existsSync(photoDirectory)){
      fs.mkdirSync(photoDirectory);
    }

    const filePath = path.join(photoDirectory, file.originalname);

    fs.writeFileSync(filePath, file.buffer);
    console.log('file saved: ', filePath);

    

    

    return res.status(200).send('Photo uploaded');
  } catch {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
}

app.get("/", async (req, res) => {
  res.send({message: "API is up and running!"});
})

app.get('/api/posts', async (req, res) => {
    const allUsers = await getUsers();        
    const allPosts = await getPosts();
    const allLikes = await getLikes();
    const allComments = await getComments();

  let completePosts = createCompletePosts(allUsers, allPosts, allLikes, allComments);

  res.send(completePosts);


})

app.get('/api/user', async (req, res) => {
  let user = await getUser(1);
 
  res.json({u: user});
});

app.post('/api/login', async (req, res) => {
  const { emailOrPhone, password } = req.body;
  const users = await getUsers();
  const likes = await getLikes();
  const friends = await getFriends();

  let isUser = false;

  for (let i = 0; i < users.length; i++) {
    if (emailOrPhone === users[i].email && password === users[i].password) {
      isUser = true;
      currentUser = users[i];
      break;
    } else {
      isUser = false;
    }
  }

  const completeUser = createCompleteUsers(currentUser, likes, friends);


  if (isUser) {

    res.status(200).json({ message: 'Login success', currentUser: completeUser });

  } else {
    res.status(401).json({ message: "Invalid Login" });
  }

})

app.post('/api/posts/create', async (req, res) => {

  if (req.body) {
    const { post_id, content, user_id } = req.body;

    const affectedRows = await createPost(post_id, user_id, content);

    affectedRows < 1 ? res.status(400).json({ message: 'Failed to create post', newPost }) : res.status(201).json({ message: 'Post created successfully' });
  } else {
    console.error("Post is null");
  }
})

app.post('/api/account/create', async (req, res) => {
  if (req.body) {
    const { firstName, lastName, email, password, birthdayMonth, birthdayDay, birthdayYear, gender } = req.body;
    const date = new Date();
    const createDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    const birthdayFull = `${birthdayYear}-${birthdayMonth}-${birthdayDay}`;
    let random_id = Math.floor(1000000 + Math.random() * 9000000);
    

    const affectedRows = await createUser(random_id, firstName, lastName, email, gender, createDate, password, birthdayFull);

    affectedRows < 1 ? res.status(400).json({ message: 'Failed to create user' }) : res.status(201).json({ message: 'User was created' });
  } else {
    console.error("Some part of the user data is null");
  }
})

app.post('/api/posts/like/add', async (req, res) => {
  if (req.body) {
    const { user_id, post_id } = req.body;
    addLike(user_id, post_id);
    res.status(200).json({ message: 'Like success' });
  } else {
    res.status(401).json({ message: "like error" });
  }
})

app.post('/api/posts/like/remove', async (req, res) => {
  if (req.body) {
    const { user_id, post_id } = req.body;
    removeLike(user_id, post_id);
    res.status(200).json({ message: 'Like success' });
  } else {
    res.status(401).json({ message: "like error" });
  }
})

app.post('/api/posts/comment/create', async (req, res) => {
  if (req.body) {
    console.log("create comment called - in api");
    const { post_id, user_id, content } = req.body;
    const affectedRows = await createComment(post_id, user_id, content);
    affectedRows < 1 ? res.status(400).json({ message: 'Failed to create post', newPost }) : res.status(201).json({ message: 'Post created successfully' });
  } else {
    console.error("comment is null in server");
  }
})

app.post('/api/user/profile', async (req, res) => {
  const allUsers = await getUsers();


  if (req.body) {
    const { user_id } = req.body;
    let user = {};

    for (let i = 0; i < allUsers.length; i++) {
      if (allUsers[i].user_id == user_id) {
        user = allUsers[i];
      }
    }

    let selectedUser = await createUserWithFriends(user);

    res.status(200).json({ selectedUser: selectedUser });

  } else {
    res.status(401).json({ message: "profile load error" });
  }




})

app.post('/api/friend/add', async (req, res) => {
  const currentFriends = await getFriends();

  if (req.body) {
    const { currentUser, selectedUser } = req.body;

    if (currentFriends.length === 0) {
      console.log("no friends, creating friends");

      let affectedRows = await addFriendship(currentUser, selectedUser);


      if (affectedRows === 1) {
        //send a new version of the selectedUser that has the updated friends list.
        res.status(200).json({ message: 'friend added' });
      } else {
        res.status(401).json({ message: 'friend not added' });
      }

      return affectedRows;
    } else {
      for (let i = 0; i < currentFriends.length; i++) {
        if (((currentUser === currentFriends[i].user1_id) && (selectedUser === currentFriends[i].user2_id)) || ((currentUser === currentFriends[i].user2_id) && (selectedUser === currentFriends[i].user1_id))) {
          console.log("friendship already there");
          return;
        } else {
          console.log("no friends, creating friends");

          let affectedRows = await addFriendship(currentUser, selectedUser);


          if (affectedRows === 1) {
            //send a new version of the selectedUser that has the updated friends list.
            res.status(200).json({ message: 'friend added' });
          } else {
            res.status(401).json({ message: 'friend not added' });
          }

          return affectedRows;

        }
      }
    }




  }
})

app.post('/api/friend/remove', async (req, res) => {
  if (req.body) {
    const { currentUser, selectedUser } = req.body;

    let affectedRows = await removeFriendship(currentUser, selectedUser);
    console.log(affectedRows);

    if (affectedRows === 1) {
      res.status(200).json({ message: 'friend removed' });
    } else {
      res.status(401).json({ message: 'friend not removed' });
    }

    return affectedRows;
  }
})

app.post('/api/photo/upload', upload.single('file'), photoUpload);



app.listen(3000, () => {
  console.log("Server listening on port 3000");
})

