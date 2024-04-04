import mysql from "mysql2"
import dotenv from 'dotenv'
dotenv.config();

const pool = mysql.createPool({ // collection of connections
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
}).promise()         


export async function getUsers() {
  const [rows] = await pool.query("SELECT * FROM user");
  return rows;
}

export async function getUser(id){
  const [rows] = await pool.query(`
  SELECT *
  FROM user
  WHERE id = ?`, [id]);
  return rows[0];
}

export async function createUser(id, username, password){
  const [result] = await pool.query(`
  INSERT INTO user (id, username, password)
  VALUES (?,?,?)
  `, [id, username, password])
  return result.affectedRows;
}



