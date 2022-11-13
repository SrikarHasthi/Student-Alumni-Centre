import express from "express";
import { fileURLToPath } from 'url';
import path from 'path';
import { dirname } from 'path';
import bodyParser from 'body-parser';
import Student from "./Student.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
  let student = new Student();
  student.getAllData(req, res);
  });

app.get("/search", (req, res) => {
  let student = new Student();
  student.search(req, res);
})

app.post("/add", (req, res) => {
    let student = new Student(req.body.id,
      req.body.name,
      req.body.gender,
      req.body.class,
      req.body.clubs,
      req.body.info);
    student.add(req, res);
});

app.get("/add", (req, res) => {
    res.render("addStudent", { model: {} });
});

app.get("/delete", (req, res)=>{
  let student = new Student();
  student.delete(req, res);
});

app.get("/modify", (req,res)=>{
  let student = new Student();
  student.modifyGetInfo(req, res);
});

app.post("/modify", (req, res) => {
  let student = new Student(req.body.id, 
    req.body.name, 
    req.body.gender, 
    req.body.class, 
    req.body.clubs, 
    req.body.info);
  student.modifyInfo(req, res);
});