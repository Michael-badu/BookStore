const mongoose = require ("mongoose")
const CONFIG = require ("../config/config")

function connectMongodb() {
    mongoose.connect (CONFIG.MONGODB_URL)

    mongoose.connection.on("connected", () => {
        console.log('connected to mongodb successfully')
    })

    mongoose.connection.on("error", (err)=>{
        console.log(err)
        console.log("An error occured")
    })
}

module.exports = connectMongodb
