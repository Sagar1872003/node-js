const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 9000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/movieManager', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Define Movie Schema
const movieSchema = new mongoose.Schema({
    name: String,
    price: Number,
    seats: Number,
    description: String,
    image: String,
});

const MovieModel = mongoose.model('Movie', movieSchema);

// Middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    },
});
const upload = multer({ storage }).single('image');

// Routes
app.get('/', (req, res) => {
    MovieModel.find({})
        .then((movies) => {
            res.render('dashboard', { movies });
        })
        .catch((err) => {
            console.error(err);
        });
});

app.get('/add', (req, res) => {
    res.render('addMovie');
});

app.post('/insertDetail', upload, (req, res) => {
    const { name, price, seats, description } = req.body;
    const imagePath = req.file ? req.file.path : '';
    const newMovie = new MovieModel({ name, price, seats, description, image: imagePath });

    newMovie
        .save()
        .then(() => {
            res.redirect('/');
        })
        .catch((err) => {
            console.error(err);
        });
});

// app.get('/edit', (req, res) => {
//     const editId = req.query.editId;

//     MovieModel.findById(editId)
//         .then((movie) => {
//             res.render('editMovie', { movie });
//         })
//         .catch((err) => {
//             console.error(err);
//         });
// });

app.post('/updateDetail', upload, (req, res) => {
    const { editid, name, price, seats, description } = req.body;
    const updatedData = { name, price, seats, description };

    if (req.file) {
        updatedData.image = req.file.path;
    }

    MovieModel.findByIdAndUpdate(editid, updatedData)
        .then(() => {
            res.redirect('/');
        })
        .catch((err) => {
            console.error(err);
        });
});

app.get('/delete', (req, res) => {
    const deleteId = req.query.deleteId;

    MovieModel.findById(deleteId)
        .then((movie) => {
            if (movie.image) {
                fs.unlinkSync(movie.image);
            }
            return MovieModel.findByIdAndDelete(deleteId);
        })
        .then(() => {
            res.redirect('/');
        })
        .catch((err) => {
            console.error(err);
        });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
