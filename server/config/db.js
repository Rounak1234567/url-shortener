const mongoose = require("mongoose");


const connect = async ()=>{
    await mongoose.connect("mongodb+srv://rounak:rounakmojumder@urlshortener.8fq77ab.mongodb.net/?retryWrites=true&w=majority")

    console.log("connected to db")
}

module.exports = connect;