const { urlencoded } = require('express');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const cookiePharser = require('cookie-parser');
const flash = require('connect-flash');

// mongodb mongoose
require('./utilities/db');
const Portofolio = require('./model/portofolio');

const app = express()
const port = 3000;

//konfigurasi flash
app.use(cookiePharser('secret'));
app.use(session({
    cookie: { maxAge: 6000 },
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}));
app.use(flash());

// gunakan ejs
app.set('view engine', 'ejs');

// third-party middleware
app.use(expressLayouts);
app.use(urlencoded())
// built-in middleware
app.use(express.static('public'));


const InsertData = (nama, nohp, email) => {
    return new Promise(async (resolve, reject) => {
        console.log(nama);
        const duplikat = await Portofolio.find({ nama: nama });
        console.log(duplikat.length);

        if (duplikat.length > 0) {
            console.log("contact sudah terdaftar, gunakan nama lain!");
            // return false;

            throw new Error('Nama kontak Sudah Digunakan')
        } else {
            try {
                resolve(Portofolio.insertMany({ nama, nohp, email }));
            } catch (error) {

                console.log("gagal input data!");
                // return false;
                throw new Error('Nama kontak Sudah Digunakan')
            }
        }

    })
}

app.get('/', async (req, res) => {
    Portofolio.find().then((portof) => {
        res.send(portof)
    });
});


app.get('/portofolio/getdata', async (req, res) => {
    Portofolio.find().then((portof) => {
        res.send(portof)
    });
});

app.get('/portofolio/insert', async (req, res) => {
    const title = "judul 3 lorem ipsum dolor";
    const description = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere optio blanditiis perferendis! Aperiam enim at excepturi optio iusto quaerat architecto perferendis quam labore atque modi sit, temporibus blanditiis cumque dolores.";
    Portofolio.insertMany(
        [
            {
                title: title,
                description: description
            }
        ]
    ).then(() => {
        res.writeHead(301, {
            Location: `/portofolio/getdata`
        }).end();
    });
});


app.use('/', (req, res) => {
    res.status(404);
    res.send('<h1>404 not found!</h1>');
});

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
});