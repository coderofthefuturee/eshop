const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config')
const authJwt = require('./helpers/jwt');

const api = process.env.API_URL;
const productsRouter = require('./routers/products'); 

app.use(cors());
app.options('*', cors());

//middleware
app.use(express.json());
app.use(morgan('tiny'));

app.use(`${api}/products`, productsRouter)

const Product = require('./models/product');

mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'eshop-database'
})
.then(()=>{
    console.log('Database connection is ready...')
})
.catch((err)=>{
    console.log(err)
})

app.listen(3000, () => {
    console.log(api);
    console.log('server is running http://localhost:3000');
})