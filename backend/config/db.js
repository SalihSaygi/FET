const mongoose = require('mongoose');
const grid = require('gridfs-stream')
grid.mongo = mongoose.mongo

require('dotenv').config({ path: '../../.env' })
const URI = process.env.URI || "mongodb://localhost/mern-stack"
let gfs

const connectMongoDB = async () => {
    try {
        const connection = await mongoose.connect(URI, 
        { 
            useNewUrlParser: true, 
            useCreateIndex: true, 
            useUnifiedTopology: true
        })

        console.log(`MongoDB Connected: ${connection.connection.host}`)
            
        gfs = grid(connection.db, mongoose.mongo)
        gfs.collection('images')
        gfs.collection('videos')

    } catch (err) {
        
        console.error(err)
        process.exit(1)
    }
}

module.exports = connectMongoDB