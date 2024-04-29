const express = require('express');
const mysql = require("mysql2");
const app = express();
const port = 2500;

app.use(express.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'siswa'
});
connection.connect (error => {
    if (error) throw error;
    console.log("sukses masuk ke database")
});

app.post('/belajar', (req, res) => {

    const belajardulu = req.body

    connection.query("INSERT INTO maba set ?", belajardulu,(err) => {
        if (err) {
            console.log("error:",  err);
            res.status(500).send({
                message : err.message || "terjadi kesalahan saat insert data"
            })
        }
        else
            res.send(req.body)
    });
})

app.get('/belajar', (req, res) => {

    const qstring = "SELECT * FROM maba"

    connection.query(qstring , (err, data) => {
        if (err) {
            console.log("error:", err);
            res.status(500).send({
                message : err.message || " terjadi kesalahan saat insert get"
            });
        }
            res.send(data)
    });
})

app.get('/belajar/:nim', (req, res) =>{

    const qstring = `SELECT * FROM maba WHERE nim = '${req.params.nim}'`;

    connection.query(qstring , (err, data) => {
        if (err) {
            console.log("error:", err);
            res.status(500).send({
                message : err.message || " terjadi kesalahan saat insert get"
            });
        }
            res.send(data)
    });
})

app.put('/belajar/:nim', (req, res)=> {
    const nim = req.params.nim
    const bljr = req.body
    const qstring = `UPDATE maba
                    SET nama = '${bljr.nama}', angkatan = '${bljr.angkatan}', prodi = '${bljr.prodi}'
                    WHERE nim = '${nim}'`
    connection.query(qstring, (err, data) => {
        if(err) {
            res.status(500).send({
                message: "error updating belajar with nim" + nim
            });
        }
        else if(data.affectedRows ==0){
            res.status(404).send({
                message: `not found belajar with nim ${nim}`
            });
        }
        else {
            console.log("update belajar:", {nim: nim, ...bljr});
            res.send({nim: nim, ...bljr})
        }
    })
})

app.delete('/belajar/:nim', (req, res) => {
    const nim  = req.params.nim
    const qstring = `DELETE FROM maba WHERE nim = '${nim}'`

    connection.query(qstring ,(err,data) => {
        if (err) {
            console.log("error:", err);
            res.status(500).send({
                message: err.message || "error hapus maba  with nim ${nim}" + nim
            });
        }
        else if(data.affectedRows ==0){
            res.status(404).send({
                message: `NOT found maba with  nim ${nim}`
            })
        }
        else res.send(`belajar dengan nim = ${nim} telah terhapus`)
    });
})

app.listen(port, () => {
    console.log(`server berjalan dengan localhost:${[port]}`)
});