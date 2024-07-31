const express= require('express');
const bodyParser =require('body-parser');
const cors = require('cors');
const routes= require('./routes');

const app =express();
const port =5000;

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));
app.use('/file',routes);

app.listen(port, ()=>{
    console.log(`server is listening to port ${port}`);
})