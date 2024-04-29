const express = require('express')
const app = express();
const port = 8080;

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

app.listen(port, () =>{
    console.log(`server berjalan pada localhost:${port}`)
});