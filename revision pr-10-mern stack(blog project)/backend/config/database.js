const mongoose = require('mongoose');

mongoose.connect(`mongodb://localhost/mern-blog-project`);

const db = mongoose.connection;

db.on("connected",(err) =>{
    if(err) {
        console.log(err);
        return false;
    }
console.log(`database is successfully connected`);
   
})