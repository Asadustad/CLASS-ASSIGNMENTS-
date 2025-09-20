const mongoose = require('mongoose')

const url = 'mongodb+srv://asadustad83_db_user:asadali0@cluster0.hab8lew.mongodb.net/uniqueemail'

async function connectDB() {

    await mongoose.connect(url)
}
module.exports = {
    connectDB
};