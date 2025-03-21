 
 const express = require('express');

const port = 8000;

const app = express();

app.set('view engine', 'ejs');

const path = require('path')

app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
    return res.render('sign-in');
})
app.get('/sign-in', (req, res) => {
    return res.render('sign-in');
})

app.get('/sign-up', (req, res) => {
    return res.render('sign-up');
})

app.get('/dashboard', (req, res) => {
    return res.render('dashboard');
})
app.get('/billing', (req, res) => {
    return res.render('billing');
})
app.get('/profile', (req, res) => {
    return res.render('profile');
})
app.get('/rtl', (req, res) => {
    return res.render('rtl');
})
app.get('/tables', (req, res) => {
    return res.render('tables');
})
app.get('/virtual-reality', (req, res) => {
    return res.render('virtual-reality');
})


app.listen(port, (err) => {
    if(err){
        console.log(err);
        return false;
    }
    console.log(`server is runing on port no : ${port}`);
    
})
