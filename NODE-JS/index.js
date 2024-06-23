const http = require('http')

const myServer=http.createServer((req, res) => {

    res.end("Hello Node");
})


myServer.listen(5050, ()=>{
    console.log("Node server started")
})