 const express=require("express");
const path=require("path");
const app=express();
var mongoose=require('mongoose');
const bodyParser=require('body-parser');
const port=80;


mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true,useUnifiedTopology:true});


app.use('/static',express.static('static'))//For serving static files

//Pug Specific stuff
app.set('view engine','pug');//Set the template engine as pug
app.set('views',path.join(__dirname,'views'))//Set the views directory

//Define mongoose schema
var contactSchema=new mongoose.Schema({
    name:String,
    email:String,
    phone:String,
    address:String,
    desc:String
});
var Contact=mongoose.model('Contact',contactSchema);
//Express specific stuff
app.use(express.urlencoded());
//EndPoints
app.get('/',(req,res)=>{
    const params={ }
    res.status(200).render('home.pug',params)
});
app.get('/about',(req,res)=>{
    params={ }
    res.status(200).render('about.pug',params)
})

app.get('/class',(req,res)=>{
    params={ }
    res.status(200).render('class.pug',params)
})
app.get('/contact',(req,res)=>{
    params={ }
    res.status(200).render('contact.pug',params)
})

app.post('/contact',(req,res)=>{
    var myData=new Contact(req.body);
    myData.save().then(()=>{
        res.send("Your response has been saved");
    }).catch(()=>{
        res.status(400).send("Item not saved in the database");
    })
})
//Start the Server
app.listen(port,()=>{
    console.log(`The application started succesfully at port ${port}`);
});