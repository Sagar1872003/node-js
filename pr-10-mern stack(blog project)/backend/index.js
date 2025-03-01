const express = require('express');

const app = express();

const dotenv = require('dotenv')
dotenv.config();

const PORT = process.env.PORT || 8000;


app.listen(PORT, (err) => {
    if(err) {
        console.log(err);
        return false;
    }
    console.log(`server start on port :- ${PORT}`);
    
})