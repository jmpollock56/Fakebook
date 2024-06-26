import express from "express"
import bodyParser from "body-parser"
import fs from 'fs';
import path from "path";
import multer from "multer";
import cors from 'cors';
import { getUser, getUsers, createUser, getPosts, createPost, getLikes, addLike, removeLike, getComments, createComment, getFriends, addFriendship, removeFriendship, getPostComments } from "./database/db_connection.js";

const app = express();
const upload = multer();



app.use(bodyParser.json());
app.use(cors());

let currentUser = {};

function createCompletePosts(users, posts, likes) {
  let objectPosts = [];

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




  return objectPosts;
}

async function createCompleteUsers(currentUser, likes) {
  let currentUserLikes = [];

  for (let i = 0; i < likes.length; i++) {
    if (currentUser.user_id === likes[i].likes_user_id) {
      currentUserLikes.push(likes[i]);
    }
  }

  return { ...currentUser, userLikes: currentUserLikes};
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

  selectedUser.userFriends = selectedUserFriends;
  console.log("selectedUser.........");
  console.log(selectedUser);
  return selectedUser;
}

async function photoUpload(req, res) {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).send('No file Uploaded');
    }

    const photoDirectory = 'photos'; //name of folder with photos

    //make directory if no there already
    if (!fs.existsSync(photoDirectory)) {
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

async function createCompleteComments(comments) {

  let completeComments = [];
  const allUsers = await getUsers();

  const userMap = new Map(allUsers.map(user => [user.user_id, user]));

  for (let i = 0; i < comments.length; i++) {
    const user = userMap.get(comments[i].comment_user_id);

    if (user) {
      completeComments.push({
        ...comments[i],
        user_pfp: user.pfp,
        user_name: `${user.first_name} ${user.last_name}`
      })
    }
  }
  return completeComments;
}

async function createNewComment(post_id, user_id, content) {
  const user = await getUser(user_id);

  let date = new Date();
  return {
    comment_post_id: post_id,
    comment_user_id: user_id,
    comment_content: content,
    user_pfp: user[0].pfp,
    user_name: `${user[0].first_name} ${user[0].last_name}`,
    comment_create_date: date
  };
}

app.get("/", async (req, res) => {
  res.send({ message: "API is up and running!" });
})

app.get('/api/posts', async (req, res) => {
  const allUsers = await getUsers();
  const allPosts = await getPosts();
  const allLikes = await getLikes();


  let completePosts = createCompletePosts(allUsers, allPosts, allLikes);

  res.send(completePosts);


})

app.get('/api/user', async (req, res) => {
  let user = await getUser(1);

  res.json({ u: user });
});

app.post('/api/login', async (req, res) => {                                                
  const { emailOrPhone, password } = req.body;
  const users = await getUsers();
  const likes = await getLikes();
  

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

  const likesUser = await createCompleteUsers(currentUser, likes);
  
  const completeUser = await createUserWithFriends(likesUser);

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
    const { post_id, user_id, content } = req.body;
    const completeNewComment = await createNewComment(post_id, user_id, content);
    const affectedRows = await createComment(post_id, user_id, content);
    affectedRows < 1 ? res.status(400).json({ message: 'Failed to create post', newPost }) : res.status(201).json({ message: 'Post created successfully', newComment: completeNewComment });

  } else {
    console.error("comment is null in server");
  }
})

app.get('/api/posts/comments/:post_id', async (req, res) => {
  const { post_id } = req.params;

  try {
    const comments = await getPostComments(post_id);
    const completeComments = await createCompleteComments(comments);
    res.status(200).send({ comments: completeComments });
  } catch (error) {
    res.status(400).send({ message: error });
    console.error(error);
  }

})

app.get('/api/user/profile/:user_id', async (req, res) => {
  const { user_id } = req.params; // get id from params

  try{
    const user = await getUser(user_id); // pull whole user from db
    console.log("user", user);
    const selectedUser = await createUserWithFriends(user[0]); // send off to add friends to object
    res.status(200).json(selectedUser); // send back to front end
  } catch (error){
    res.status(401).json({ message: error });
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

