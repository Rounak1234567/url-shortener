const mongoose = require("mongoose");


const connect = async ()=>{

    try {
        await mongoose.connect("mongodb+srv://rounak:rounakmojumder@urlshortener.8fq77ab.mongodb.net/?retryWrites=true&w=majority")
    } catch (error) {
        console.log(error)
    }
    

    console.log("connected to db")
}

module.exports = connect;