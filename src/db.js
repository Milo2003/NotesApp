const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Mylo:elmilinho25082003@project2.yrpklya.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(db => console.log('DB is connected'))
.catch(err => console.error(err))