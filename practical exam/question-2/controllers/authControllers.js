
const UserModel = require('../models/authSchema')
const fs = require('fs')
const addBlog = (req, res) => {
    return res.render('addblog')
}

const loginPage = (req, res) => {
   
    return res.render('login');
}
const registerPage = (req,res) =>{
    return res.render('register')
}


const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        await UserModel.create({
            name: name,
            email: email,
            password: password
        });
        console.log("Your Account is Created Successfully.please log In to Continue.");
        return res.redirect('/')

    } catch (err) {
        console.log(err);
        return false
    }
}

const loginUser = async (req, res) => {
    
    try {
        
        return res.redirect('/dashboard')
        
    }
    catch (err) {
        console.log(err);
        return false
    }
}

const logoutUser = async (req,res)=>{
    req.logout((err) => {
        if (err) {
            console.log(err);
            return false
        }


    })
    return res.redirect('/')
}


module.exports = {
    loginPage,
    registerPage,
    registerUser,
    loginUser,
    logoutUser,
}
