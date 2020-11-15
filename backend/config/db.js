const mongoose = require('mongoose');

require('dotenv').config({ path: '../../.env' })
const URI = process.env.URI || "mongodb://localhost/mern-stack"

const connectMongoDB = async () => {
    try {
        const connection = await mongoose.connect(URI, 
        { 
            useNewUrlParser: true, 
            useCreateIndex: true, 
            useUnifiedTopology: true
        })

        console.log(`MongoDB Connected: ${connection.connection.host}`)
    } catch (err) {
        
        console.error(err)
        process.exit(1)
    }
}

module.exports = connectMongoDB