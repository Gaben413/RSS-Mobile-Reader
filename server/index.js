require('dotenv').config();
const express = require("express");
const app = express();
const mysql2 = require("mysql2");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql2.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB,
    port: process.env.PORT
});

app.post("/item", (req, res) => {
    const { item } = req.body;
    let SQL = "INSERT INTO Favourite (title, descr, link, published, sourceType) VALUES (?,?,?,?,?)";
    db.query(SQL, item, (err, result) => {
        console.log(err);
    });
});

app.get("/itens", (req, res) => {
    let SQL = "SELECT * FROM Favourite";
    db.query(SQL, (err, result) => {
        if(err) console.log(err);
        else res.send(result);
    });
});

app.delete("/item/:id", (req,res) => {
    const { id } = req.params;
    console.log("Informação: ", id)

    let SQL = "DELETE FROM Favourite WHERE (`favID` = ?)";

    db.query(SQL, id, (err, result) => {
        console.log(err);
    })
})

app.get("/", (req, res) => {
    /*
    let SQL = "INSERT INTO Test (test) VALUES ('Test was run')";
    
    db.query(SQL, (err, result) => {
        console.log(err);
    });

    /*
    let SQL = "INSERT INTO Favourite (title, descr, link, sourceType) VALUES ('title', 'description', 'link', 'R')";
    
    db.query(SQL, (err, result) => {
        console.log(err);
    });
    */
});

app.listen(3001, () => {
    console.log("rodando servidor");
});