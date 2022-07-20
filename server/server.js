const express = require("express");
const app = express();
const port = process.env.PORT || 2345;
const connect = require("./config/db")
const short = require("./routes/urlShortener")
var cors = require('cors')

app.use(cors())
app.use(express.json());
app.options('*', cors())

app.get("/", (req, res)=>{
    return res.send("Hello");
})
app.use("/short", require("./routes/urlShortener"))


app.listen(port, (req,res)=>{
    connect()
    console.log(`listening to port ${port}`)
})