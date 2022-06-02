const mongoose = require('mongoose');

const portofolio = mongoose.model('Portofolio', {
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    }
});

// menambah 1 data
// const contact1 = new contact({
//     nama: 'jokoriyadi',
//     nohp: '082212122',
//     email: 'jokoriyadi@gmail.com'
// });

// simpan data
// contact1.save().then((contact) => console.log(contact));

module.exports = portofolio;
