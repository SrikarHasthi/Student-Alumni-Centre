import { __filename, __dirname, db, checkForError } from "./utils.js";



class Teacher {
    constructor(id, name, gender, classes){
        this.id = id;
        this.name = name;
        this.gender = gender;
        this.classes = classes;
    }
    getAllData(req, res){
        const sql = "SELECT * FROM teachers"
        db.all(sql, [], (err, rows) => {
          checkForError(err);

          res.render("teacher", { model: rows, type: "teacher" });
        });
    }
    search(req, res){
        let name = req.query.name;
        const sql = "SELECT * FROM teachers where name LIKE '%"+ name+"%'";
        db.all(sql, [], (err, rows) => {
          checkForError(err);
    
          res.render("teacher", { model: rows, type: "teacher" });
        });
    }
    add(req, res){
        const sql = "INSERT INTO teachers (id, name, gender, class) VALUES (?, ?, ?, ?)";
        const teacher = [this.id, this.name, this.gender, this.classes];
         db.run(sql, teacher, err => {
            checkForError(err);
    
            res.redirect("/teachers");
         });
    }
    delete(req, res){
        const sql = "DELETE FROM Teachers where id=?";
        const id = req.query.id;
        db.run(sql, id, err => {
            checkForError(err);
    
            res.redirect("/teachers");
        })
    }
    modifyGetInfo(req, res){
        const sql = "SELECT * FROM Teachers where id=?";
        const id = req.query.id;
        db.all(sql, id, (err, data)=>{
            checkForError(err);
    
          res.render("modifyTeacher", { model: data, type: "teacher" });
        })
    }
    modifyInfo(req, res){
        const sql = "UPDATE Teachers SET name=?, gender=?, class=? WHERE id=?";
        const student = [this.name, this.gender, this.classes, this.id];
         db.run(sql, student, err => {
            checkForError(err);
    
            res.redirect("/teachers");
         });
    }
}

export default Teacher;

