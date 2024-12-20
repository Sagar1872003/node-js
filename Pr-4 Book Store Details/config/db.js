const mongoose = require('mongoose');

mongoose.connect(`mongodb://localhost/book-storee`);

const db = mongoose.connection;

db.on('connected',(err)=>{
    if(err){
        console.log(err);
    return false;
    }
    console.log(`Database successfully connected`);
})
module.exports = db;
