// ejs --> light weight template engine
// ejs --> you can write dynamic html with help of ejs

const { error } = require('console');
const express = require('express');
const app = express();
const fs = require("fs");

// if you want to read fronted data then you have to must add below two lines:
app.use(express.json()); // read data from body(read all json type data)
app.use(express.urlencoded({extended: true})); // --> read form data only

// setup ejs
app.set('view engine', 'ejs');
// if you want to use ejs engine that create views folder

// ------ Task File Generater ------
app.get('/',(req, res)=>{
    fs.readdir('./tasks',(e, files)=>{
        if(e) throw error;
        res.render("index", {data:files})
    });
});

// method post --> data --> res.body
// method get --> data --> res.params

// create File 
app.post('/create',(req, res)=>{
    // console.log(req);
    // res.send(req.body);

    let data = `task : ${req.body.task}\nDetails:${req.body.details}`;

    // create File
    fs.writeFile(`./tasks/${req.body.task.split(" ").join("-")}.txt`, data, (e)=>{
      if(e) throw error;
    });
    res.redirect("/");
});

// Open File
app.get("/open/:filename", (req,res)=>{
    fs.readFile(`./tasks/${req.params.filename}`, (e,data)=>{
    if(e) throw error;
    res.render('file', {data:data});
    });   
});



// Edit File
app.get("/edit/:filename", (req,res)=>{
    let oldname = req.params.filename;
    res.render("edit",{oldname});
});

app.post("/rename", (req,res)=>{
  fs.rename(`./tasks/${req.body.old}`, `./tasks/${req.body.new}`,(e) =>{
    if(e) throw error;
  });
  res.redirect("/");
});

app.listen(2026, ()=>{ 
  console.log("Server Is Running.....🏃‍♀️")
});
