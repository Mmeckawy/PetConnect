const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const AuthRoute = require('./routes/auth')
const app = express();

const DBlink = 'mongodb+srv://Meck:1234@petconnect.b5e1v.mongodb.net/myDB1?retryWrites=true&w=majority';
mongoose.connect(DBlink, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
      app.listen(process.env.PORT || 8080);
    })
    .catch((err) => console.log(err));
    

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});


app.get('/', (req, res) => {
    const startpg = [
      {title: 'PetConnect'},
    ];
    res.render('index', { title: 'Home page', startpg});
  });

app.use('/api', AuthRoute)