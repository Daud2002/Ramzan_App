const express = require('express');
const app = express();
require('dotenv').config();
require('./Models/db')
const bodyParser = require('body-parser')
const cors = require('cors')
const AuthRouter = require('./Routes/AuthRouter')
const ProductRouter = require('./Routes/ProductRouter')

const port = process.env.NODE_BACKEND_PORT || 8080;



app.use(cors())
app.use(bodyParser.json())
app.use('/ping', (req, res)=>{
    res.send('PING PONG')
})
app.use('/auth', AuthRouter)
app.use('/products', ProductRouter)
app.listen(port, ()=>{
    console.log(`Server is running on port http://localhost:${port}`)
})