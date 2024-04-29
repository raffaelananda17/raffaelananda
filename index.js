const express = require('express');
const app = express();
const port = 8080
const mysql = require(mysql2)

app.get('/mahasiswa/:nim', (req,res)=>{
    const nim = req.params.nim

    res.send(`Mahasiswa dengan nim ${nim} di temukan`)
});

app.get('/mahasiswa/:nim/:semester', (req,res)=>{

    const nim = req.params.nim
    const semester = req.params.semester

    res.send(`Mahasiswa dengan : ${nim} semester :${semester} di temukan`)
});

app.get('/get-mahasiswa-by-nim', (req, res)=>{
    const nim = req.query.nim

    res.send(`Mahasiswa dengan nim${nim} di temukan`)
});

app.get('/nilai-persemester', (req,res)=>{
    const nim = req.query.nim
    const semester = req.query.semester

    res.send(`Mahasiswa dengan nim : ${nim} semester : ${semester} di temukan`)
})

app.use(express.json()),

app.post('/mahasiswa', (req,res)=>{
    const nim = req.body.nim;
    const nama = req.body.nama;
    const angkatan = req.body.angkatan;
    const prodi = req.body.prodi;

    const msg = {status:"sukses",
                    data:{"nim" : nim, "nama" : nama, "angkatan" : angkatan, "prodi" : prodi}};
    res.send(msg);
})

app.get('/', (req, res) =>{
    res.send('Menyala Abangkuhh')
});

app.post ('/', (req, res)=>{
    res.send('post data')
})

app.put ('/', (req, res)=>{
    res.send('upload sucsesful')
})

app.delete ('/', (req, res)=>{
    res.send('delete sucsesful')
})
