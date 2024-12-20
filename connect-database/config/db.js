const { log } = require("console");

const mongoose = require("mongoose");

mongoose.connect(`mongodb://localhost/connection`);

const db = mongoose.connection;

db.con("connected", (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(`database connected successfully`);
    
})
