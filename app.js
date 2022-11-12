import express from "express";
import { fileURLToPath } from 'url';
import path from 'path';
import { dirname } from 'path';
import sqlite3 from "sqlite3";
import bodyParser from 'body-parser';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const db_name = path.join(__dirname, "database.db");

const db = new sqlite3.Database(db_name, err => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Successful connection to the database");
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.listen(3000, ()=>{
    console.log("server started");
})
app.use(express.static(__dirname));

app.get("/", (req, res) => {
    const sql = "SELECT * FROM students"
    db.all(sql, [], (err, rows) => {
      if (err) {
        return console.error(err.message);
      }
      console.log(rows);
      res.render("index1", { model: rows });
    });
  });

app.get("/search", (req, res) => {
    let name = req.query.name;
    const sql = "SELECT * FROM students where name LIKE '%"+ name+"'";
    db.all(sql, [], (err, rows) => {
      if (err) {
        return console.error(err.message);
      }
      console.log(rows);
      res.render("index1", { model: rows });
    });
})

app.post("/add", (req, res) => {

    const sql = "INSERT INTO Students (id, name, gender, class, club, info) VALUES (?, ?, ?, ?, ?, ?)";
    const student = [req.body.id, req.body.name, req.body.gender, req.body.class, req.body.clubs, req.body.info];
     db.run(sql, student, err => {
        if (err) {
            return console.error(err.message);
        }
        res.render("index1");
     });
  });

app.get("/add", (req, res) => {
    res.render("addStudent", { model: {} });
});

app.get("/delete", (req, res)=>{
    const sql = "DELETE FROM Students where id=?";
    const id = req.query.id;
    db.run(sql, id, err => {
        if (err) {
            return console.error(err.message);
        }
        res.redirect("/");
    })
});

app.get("/modify", (req,res)=>{
  const sql = "SELECT * FROM Students where id=?";
  const id = req.query.id;
  db.all(sql, id, (err, data)=>{
    if (err) {
      return console.error(err.message);
    }
    console.log(data);
    res.render("modifyStudent", { model: data });
  })
  console.log(req);
});