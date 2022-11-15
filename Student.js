import { __filename, __dirname, db, checkForError } from "./utils.js";

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
            checkForError(err);
          res.render("index", { model: rows, type: "student" });
        });
    }
    search(req, res){
        let name = req.query.name;
        const sql = "SELECT * FROM students where name LIKE '%"+ name+"%'";
        db.all(sql, [], (err, rows) => {
            checkForError(err);
         res.render("index", { model: rows, type: "student" });
        });
    }
    add(req, res){
        const sql = "INSERT INTO Students (id, name, gender, class, club, info) VALUES (?, ?, ?, ?, ?, ?)";
        const student = [this.id, this.name, this.gender, this.classes, this.clubs, this.info];
         db.run(sql, student, err => {
            checkForError(err);
            res.redirect("/");
         });
    }
    delete(req, res){
        const sql = "DELETE FROM Students where id=?";
        const id = req.query.id;
        db.run(sql, id, err => {
            checkForError(err);
            res.redirect("/");
        })
    }
    modifyGetInfo(req, res){
        const sql = "SELECT * FROM Students where id=?";
        const id = req.query.id;
        db.all(sql, id, (err, data)=>{
            checkForError(err);
          res.render("modifyStudent", { model: data, type: "student" });
        })
    }
    modifyInfo(req, res){
        const sql = "UPDATE Students SET name=?, gender=?, class=?, club=?, info=? WHERE id=?";
        const student = [this.name, this.gender, this.classes, this.clubs, this.info, this.id];
         db.run(sql, student, err => {
            checkForError(err);
            res.redirect("/");
         });
    }
}

export default Student;

