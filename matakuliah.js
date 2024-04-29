const express = require('express');
const routerMk = express.Router();
const connection = require('../db/db')

routerMk.get('/matakuliah', (req, res) =>{
    connection.query('SELECT * FROM matakuliah', (error, result) =>{
        if (error) throw error;
        res.json(result);
    });
});

routerMk.get('/matakuliah/:kdMk', (req, res) =>{
    const kdMk =  req.params.kdMk;
    connection.query('SELECT * FROM matakuliah where kdMk = ?', [kdMk], (error, result) =>{
        if (error) throw error;
        res.json(result);
    });
});

routerMk.post('/matakuliah', (req, res) =>{
    const matkul = req.body;
    connection.query("INSERT INTO matakuliah set ?", matkul,(err)=>{
        if(err){
            res.status(500).send({
                message : err.message || "terjadi kesalahan data"
            });
        }
        else
        res.send(req.body)
    });
});

module.exports = routerMk;