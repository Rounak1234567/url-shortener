const express = require("express");
const app = express();
const port = process.env.PORT || 2345;
const connect = require("./config/db")


app.use(express.json());

app.use("/short", require("./routes/urlShortener"))

app.listen(port, (req,res)=>{
    connect()
    console.log(`listening to port ${port}`)
})