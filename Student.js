import { fileURLToPath } from 'url';
import path from 'path';
import { dirname } from 'path';
import sqlite3 from "sqlite3";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const db_name = path.join(__dirname, "database.db");
const db = new sqlite3.Database(db_name, err => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Successful connection to the database");
});
class Student {
    constructor(id, name, gender, classes, clubs, info){
        this.id = id;
        this.name = name;
        this.gender = gender;
        this.classes = classes;
        this.clubs = clubs;
        this.info = info;
    }
    getAllData(req, res){
        const sql = "SELECT * FROM students"
        db.all(sql, [], (err, rows) => {
          if (err) {
            return console.error(err.message);
          }
          res.render("index1", { model: rows });
        });
    }
    search(req, res){
        let name = req.query.name;
        const sql = "SELECT * FROM students where name LIKE '%"+ name+"%'";
        db.all(sql, [], (err, rows) => {
          if (err) {
            return console.error(err.message);
          }
          res.render("index1", { model: rows });
        });
    }
    add(req, res){
        const sql = "INSERT INTO Students (id, name, gender, class, club, info) VALUES (?, ?, ?, ?, ?, ?)";
        const student = [this.id, this.name, this.gender, this.classes, this.clubs, this.info];
         db.run(sql, student, err => {
            if (err) {
                return console.error(err.message);
            }
            res.redirect("/");
         });
    }
    delete(req, res){
        const sql = "DELETE FROM Students where id=?";
        const id = req.query.id;
        db.run(sql, id, err => {
            if (err) {
                return console.error(err.message);
            }
            res.redirect("/");
        })
    }
    modifyGetInfo(req, res){
        const sql = "SELECT * FROM Students where id=?";
        const id = req.query.id;
        db.all(sql, id, (err, data)=>{
          if (err) {
            return console.error(err.message);
          }
          res.render("modifyStudent", { model: data });
        })
    }
    modifyInfo(req, res){
        const sql = "UPDATE Students SET name=?, gender=?, class=?, club=?, info=? WHERE id=?";
        const student = [this.name, this.gender, this.classes, this.clubs, this.info, this.id];
         db.run(sql, student, err => {
            if (err) {
                return console.error(err.message);
            }
            res.redirect("/");
         });
    }
}

export default Student;

