import mysql from "mysql2"
import dotenv from 'dotenv'
dotenv.config();



const pool = mysql.createPool({ // collection of connections
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
}).promise();   


export async function getUsers() {
  const [rows] = await pool.query("SELECT * FROM users");
  return rows;
}

export async function getUser(id){
  const [rows] = await pool.query(`
  SELECT user_id, first_name, last_name, email, gender, create_date, birthday, pfp, lives_in, hometown
  FROM users
  WHERE user_id = ?`, [id]);

  return rows;
}

export async function createUser(id, firstName, lastName, email, gender, createDate, password, birthday){
  const [result] = await pool.query(`
  INSERT INTO users (user_id, first_name, last_name, email, gender, create_date, password, birthday)
  VALUES (?,?,?,?,?,?,?,?)
  `, [id, firstName, lastName, email, gender, createDate, password, birthday])
  return result.affectedRows;
}

export async function getPosts(){
  const [posts] = await pool.query("SELECT * FROM post");
  return posts; 
}

export async function createPost(post_id, user_id, content){ 
  let date = new Date();
  console.log(date);
  const [result] = await pool.query(`INSERT INTO post (post_id, content, create_date, user_id) VALUES (?,?,?,?)`, [post_id, content, date, user_id])
  return result.affectedRows;
}

export async function getLikes(){
  const [likes] = await pool.query("SELECT * FROM likes");
  return likes;
}

export async function addLike(user_id, post_id){
  const [result] = await pool.query(`INSERT INTO likes (likes_user_id, likes_post_id) VALUES (?,?)`, [user_id, post_id]);
  return result.affectedRows;
}

export async function removeLike(user_id, post_id){
  const [result] = await pool.query(`DELETE FROM likes WHERE likes_user_id = ? AND likes_post_id = ?`, [user_id, post_id]);
  return result;
}

export async function getComments(){
  const [comments] = await pool.query("SELECT * FROM comment");
  return comments;
}

export async function createComment(post_id, user_id, content){
  let date = new Date();
  console.log("create comment called");
  const [result] = await pool.query("INSERT INTO comment (comment_user_id, comment_post_id, comment_content, comment_create_date) VALUES (?,?,?,?)", [user_id, post_id, content, date]);
  return result.affectedRows;
}

export async function getFriends(){
  const [friends] = await pool.query("SELECT * FROM friends");
  return friends;
}

export async function addFriendship(currentUser, selectedUser){
  let date = new Date();
  const [result] = await pool.query("INSERT INTO friends (user1_id, user2_id, create_date) VALUES (?,?,?)", [currentUser, selectedUser, date]);
  return result.affectedRows;
}

export async function removeFriendship(currentUser, selectedUser){
  const [result] = await pool.query("DELETE FROM friends WHERE (user1_id = ? AND user2_id = ?) OR (user1_id = ? AND user2_id = ?)", [currentUser, selectedUser, selectedUser, currentUser]);
  
  return result.affectedRows;
}

export async function getPostComments(post_id){
  const [comments] = await pool.query("SELECT * FROM comment WHERE comment_post_id = ?", [post_id]);
  return comments;
}




