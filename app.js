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
    const nama = 'joko riyadi';

    // console.log(Portofolio);
    const porto = Portofolio.find().then((portof) => {
        res.send(portof)
    });
    // const mahasiswa = await Portofolio.find();
    // console.log(mahasiswa)
    const title = "Halaman Home";
    const menu = "home";
    const layout = 'layouts/mainLayout';
    // res.render('index', { nama, mahasiswa, title, menu, title, layout });
    // const title = "Halaman Home";
    // const menu = "home";
    // const layout = 'layouts/mainLayout';
    // res.render('index', { nama, mahasiswa, title, menu, title, layout });
});


app.get('/contact', async (req, res) => {
    const title = "Halaman Contact";
    const menu = "contact";
    const layout = 'layouts/mainLayout';
    const contactList = await Contact.find();
    const msg = req.flash('msg');
    const msghps = req.flash('msghps');
    console.log(msg.length);
    res.render('contact', { title, menu, layout, contactList, msg, msghps });
});


app.post('/contact', async (req, res) => {
    const hasil = req.body;
    // res.send(hasil);
    console.log(hasil);
    await InsertData(hasil.name, hasil.nohp, hasil.email);
    // await contacts.simpanContact(hasil.name, hasil.email, hasil.nohp);
    // res.render('contact', { title, menu, layout, contactList });
    req.flash('msg', 'Data Kontak Berhasil Ditambahkan');
    res.redirect('/contact');
});

app.get('/addcontact', async (req, res) => {
    const title = "Halaman Tambah Contact";
    const menu = "contact";
    const layout = 'layouts/mainLayout';
    const contactList = await Contact.find();
    // console.log(contactList);
    res.render('addcontact', { title, menu, layout, contactList });
});


app.use('/', (req, res) => {
    res.status(404);
    res.send('<h1>404 not found!</h1>');
});

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
});