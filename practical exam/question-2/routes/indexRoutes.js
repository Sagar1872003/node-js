const express = require('express');
const { loginPage , registerUser , loginUser , registerPage, logoutUser} = require('../controllers/authControllers');


const passport = require('passport');

const multer = require('multer');

const routes = express.Router();

const st = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        const uniqname = Date.now();
        cb(null, `${file.fieldname}-${uniqname}`);
    }
});

routes.get('/',loginPage)
routes.get('/register',registerPage)
routes.post('/registeruser',registerUser)
routes.post('/loginuser',  passport.authenticate('local', {failureRedirect:'/'}) , loginUser )
routes.get('/logoutuser', logoutUser)





module.exports = routes