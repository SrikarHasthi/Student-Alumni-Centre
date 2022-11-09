let sql;
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE, (err)=>{
    if (err) {
        return console.error(err.message);
    }
});

// sql = 'CREATE TABLE students (id integer primary key, name varchar(100), gender integer, class integer, info varchar(1000))';
// db.run(sql);
// sql = 'insert into students (id, name, gender, class, info) values (1, "srikar", 0, 21, "hello there")';
// db.run(sql);
sql = 'select * from students';
db.all(sql,[], (err, rows)=>{
    if (err) {
        console.error(err.message);
    }
    rows.map(e => {
        console.log(e);
    });
});