const mongoose = require("mongoose");
const link = "mongodb+srv://sagarmakwana:sagarmakwana@cluster0.xmvyp.mongodb.net/blog-project";

const connectDb = async() => {
    try{
        await mongoose.connect(link)
        console.log("Database is successfully connected.");
    }
    catch(err){
        console.log(err);
        return false
        
    }
}
module.exports = connectDb;