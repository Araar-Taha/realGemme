const mongoose = require("mongoose")


const connectDB = async () =>{
    try {
        const cnct = await mongoose.connect(process.env.URI)
        
        console.log(`MongoDB Connected succesfully: ${cnct.connection.host}`)
    }
    catch (err){
        console.log('failed to connect to database: ' +err.message)
        console.log(err)
        process.exit(1)
    }
}
module.exports = connectDB