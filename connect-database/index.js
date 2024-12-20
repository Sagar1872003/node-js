const express = require('express')

// install express , mongoose , nodemon
const app = express();

const port = 8000;



db.con("connected", (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(`database connected successfully`);
    
})