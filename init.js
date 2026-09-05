const mongoose = require('mongoose');
const chat = require('./models/chat.js');


main().then(() => console.log('Connected to MongoDB'))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/fakeWhatsapp');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


let allChats = [
  {
    from: 'Alice',
    to: 'Bob',
    message: 'Hello Bob!',
    created_at: new Date()
},
  {
    from: 'Rohit',
    to: 'Arjun',
    message: 'Hii Arjun!, How are you?',
    created_at: new Date()
},
  {
    from: 'John',
    to: 'winston',
    message: 'Hello Winston!, where are you?',
    created_at: new Date()
},

]
chat.insertMany(allChats);

