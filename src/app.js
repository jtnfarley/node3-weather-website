const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express();

const pub_dir = path.join(__dirname, '../public');
const views_dir = path.join(__dirname, '../templates/views');
const parts_dir = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', views_dir);
hbs.registerPartials(parts_dir);
app.use(express.static(pub_dir))

app.get('', (req, res) => {
    res.render('index', {
        title:'Handlebars, baby!',
        name: 'John'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title:'Aboutnuggets',
        name: 'Titi'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title:'Helptits',
        name: 'Titi'
    });
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address'
        })
    }
    geocode(req.query.address, (latlong, err) => {
        if (err === null) {
            forecast(latlong, (resp, err2) => {
                if (err2 === null) {
                    res.send({
                        forecast: resp
                    });
                }
            });
        } else {
            console.log(err);
        }
    })
   
})

app.get('/products', (req, res) => {
    console.log(req.query);
    res.send({
        products: []
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        title:'You fucked up',
        name: 'You bitch'
    });
})

app.listen(3000, () => {
    console.log('Server started, port 3000');
});