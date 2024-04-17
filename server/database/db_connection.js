import mysql from "mysql2"
import dotenv from 'dotenv'
dotenv.config();


const pool = mysql.createPool({ // collection of connections
  host: process.env.MYSQL_HOST,
  user: 'root',
  password: 'password',
  database: process.env.MYSQL_DATABASE
}).promise();         


export async function getUsers() {
  const [rows] = await pool.query("SELECT * FROM fakebook.user");
  return rows;
}

export async function getUser(id){
  const [rows] = await pool.query(`
  SELECT *
  FROM fakebook.user
  WHERE id = ?`, [id]);
  return rows[0];
}

export async function createUser(id, firstName, lastName, email, gender, createDate, password, birthday){
  const [result] = await pool.query(`
  INSERT INTO fakebook.user (user_id, first_name, last_name, email, gender, create_date, password, birthday)
  VALUES (?,?,?,?,?,?,?,?)
  `, [id, firstName, lastName, email, gender, createDate, password, birthday])
  return result.affectedRows;
}

export async function getPosts(){
  const [posts] = await pool.query("SELECT * FROM fakebook.post");
  return posts; 
}


export async function createPost(post_id, user_id, content){
  let timestamp;
  let date = new Date();
  timestamp = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
  const [result] = await pool.query(`INSERT INTO fakebook.post (post_id, content, create_date, user_id) VALUES (?,?,?,?)`, [post_id, content, date, user_id])
  return result.affectedRows;
}

export async function getLikes(){
  const [likes] = await pool.query("SELECT * FROM fakebook.likes");
  return likes;
}

export async function sendLike(user_id, post_id){
  const [result] = await pool.query(`INSERT INTO fakebook.likes (likes_user_id, likes_post_id) VALUES (?,?)`, [user_id, post_id]);
  return result.affectedRows;
}


