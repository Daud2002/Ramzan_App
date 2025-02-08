const mongoose = require('mongoose');

const mongo_url = process.env.NODE_MONGO_CONNECTION;

mongoose.connect(mongo_url)
.then(()=>{
    console.log('MongoDB connected ...')
})
.catch((err)=>{
    console.log('MongoDB connection Error : ', err)
})