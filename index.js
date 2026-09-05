const express = require('express');
const app = express();
// const mongoose = require('mongoose');
const path = require('path');
const Chat = require('./models/chat.js');
const connectDB = require('./init.js');
const ExpressError = require("./ExpressError.js");


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));



// // index route
// app.get('/chats', async (req, res, next) => {
//     try{
//         let chats=await Chat.find()
//     // console.log(chats)
//     res.render("index.ejs", {chats})
//     } catch (err){
//         next(err)
//     }
    
// })





// // new chat route

// app.get('/chats/new', (req, res) => {
//     // throw new ExpressError(404, "Page Not Found")
//     res.render('new.ejs')
// //    console.log('new chat route')
// })





 
// // create chat route
// app.post('/chats', async (req, res, next) =>{
//     try{
//         let { from, to, message } = req.body
//         let New_chat = new Chat({
//         from: from,
//         to: to,
//         message : message,
//         created_at: new Date()
//     })
//     await New_chat.save()
//      res.redirect('/chats')
//     } catch(err) {
//         next(err)
//     }
   
    
   
// })


// // show route for error handling

// app.get("/chats/:id", async(req, res, next) => {
//     try{
//     let {id} = req.params;
//     let chat = await Chat.findById(id);
//     if(!chat) {
//         next(new ExpressError(404, "chat not found"))
//     }
//     res.render("edit.ejs", {chat})
//     } catch(err){
//         next(err);
//     }
    
// })





// // edit and update chat route
// app.get('/chats/:id/edit', async (req, res, next) =>{
//     try{
//     let { id } = req.params;
//     let chat = await Chat.findById(id);
//     res.render('edit.ejs', { chat });
//     } catch(err){
//         next(err)
//     }
  
// })

// // update chat route
// app.post('/chats/:id/update', async (req, res, next) =>{
//     try{
//     let { id } = req.params;
//     let { message } = req.body;
//     await Chat.findByIdAndUpdate(id, { message: message });
//     res.redirect('/chats');
//     } catch(err){
//         next(err);
//     }
    
// })

// // delete chat route
// app.post('/chats/:id/delete', async (req, res, next) => {
//     try{
//     let { id } = req.params;
//     await Chat.findByIdAndDelete(id);
//     res.redirect('/chats');
//     }catch(err){
//         nexy(err);
//     }
    
// })

// app.get('/', (req, res) => {
//     res.send("Working!")
// })



// //  error handling middleware
// app.use((err, req, res, next) => {
//     let {status=500, message="some error occured"} = err;
//     res.status(status).send(message);
// });




// app.listen(8080, () =>{
//     console.log('Server is running on port 8080');
// })



















// using wrapasync function (commnt out 1st then try this)

function asyncwrap(fn){
    return function (req, res, next) {
        fn(req, res, next).catch((err) => next(err));
    };
}


// index route
app.get('/chats',
    asyncwrap ( async (req, res,) => {
     
    let chats=await Chat.find()
    // console.log(chats)
    res.render("index.ejs", {chats})
})
)




// new chat route

app.get('/chats/new', (req, res) => {
    // throw new ExpressError(404, "Page Not Found")
    res.render('new.ejs')
//    console.log('new chat route')
})
 
// create chat route
app.post('/chats',
    asyncwrap( async (req, res,) =>{
    
        let { from, to, message } = req.body
        let New_chat = new Chat({
        from: from,
        to: to,
        message : message,
        created_at: new Date()
    })
    await New_chat.save()
     res.redirect('/chats')
   
})
)

// show route for error handling

app.get("/chats/:id",
    asyncwrap(
        async(req, res, next) => {
     
    let {id} = req.params;
    let chat = await Chat.findById(id);
    if(!chat) {
        next(new ExpressError(404, "chat not found"))
    }
    res.render("edit.ejs", {chat})
    
})
)


// edit and update chat route
app.get('/chats/:id/edit',
    asyncwrap(async (req, res,) =>{
     
    let { id } = req.params;
    let chat = await Chat.findById(id);
    res.render('edit.ejs', { chat });
   
})
)

// update chat route
app.post('/chats/:id/update',
    asyncwrap( async (req, res,) =>{
     
    let { id } = req.params;
    let { message } = req.body;
    await Chat.findByIdAndUpdate(id, { message: message });
    res.redirect('/chats');
    
})
)



// delete chat route
app.post('/chats/:id/delete',
    asyncwrap( async (req, res,) => {
    let { id } = req.params;
    await Chat.findByIdAndDelete(id);
    res.redirect('/chats');  
})
)



app.get('/', (req, res) => {
    res.send("Working!")
})

const handleValidationErr = (err) => {
    console.log("This is validation error, Please follow the rules!")
    console.log(err.message)
    
    return err;
}

// to print error name
app.use((err, req, res, next) => {
    console.log(err.name);
    if (err.name === "ValidationError") {
        err = handleValidationErr(err);
    }
    next(err);
})


//  error handling middleware
app.use((err, req, res, next) => {
    let {status=500, message="some error occured"} = err;
    res.status(status).send(message);
});





app.listen(8080, () =>{
    console.log('Server is running on port 8080');
})
