const connection = require('../db/db')

module.exports = {
    create: (req, res) => {

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
    },
    getMhs: (req, res) => {

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
    },
    getMhsBynim: (req, res) =>{

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
    },
    update: (req, res)=> {
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
    },
    delete: (req, res) => {
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
    },
}