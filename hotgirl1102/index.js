const express = require('express');
const { getHotGirlById, hitDislike, hitLike } = require('./db');

const app = express();
app.listen(process.env.PORT || 3000);
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/show/:id', (req, res) => {
    const { id } = req.params;
    getHotGirlById(id)
    .then(info => res.render('show', info));
});

app.get('/like/:id', (req, res) => {
    const { id } = req.params;
    hitLike(id)
    .then(() => res.redirect(`/show/${id}`));
});


