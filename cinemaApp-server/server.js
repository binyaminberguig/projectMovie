const express = require('express');
var bodyParser = require("body-parser");
const app = express();
var cors = require('cors');
const session = require('express-session');
const mongoose = require('mongoose');
const Film = require('./models/film');
const User = require('./models/user');
var isConnected;
mongoose.connect('mongodb+srv://admin:admin@cluster0.vgfdm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    .then(()=>{
        console.log('Sucessfully connected to DB')
    })
    .catch((error)=>{
        console.log('Unable to connect to DB');
        console.error(error);
    });


 app.use((req, res, next) => {
     res.set('Access-Control-Allow-Origin', '*');
     res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
     res.set('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
     res.set('Access-Control-Allow-Credentials', true);
     next();
 })
app.use(cors({credentials: true, origin: 'http://localhost:4200'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({secret:"mySecretKey", cookie:{maxAge: 24 * 60 * 60 * 1000}}));
let films = [];

app.get('/films', (request,response) => {
    if(!isConnected) return response.status(200).json([]);
    Film.find({}).sort({_id:-1}).exec((error,films)=>{
        if(error) return console.error(err);
        response.json(films);
    });
});

app.get('/notes/:id',(request, response) => {
    console.log(request.params.id)
    Note.findOne( {_id: request.params.id}, (error, note) => {
        if (error){
            return response.status(404).json({error: error});
        }
        response.status(200).json(note);
    });
});

// POST /notes
app.post('/film',(request, response) => {
    let requestFilm = request.body;

    let newFilm = new Film({
        title: requestFilm.title,
        description: requestFilm.description,
        image: requestFilm.image
    })

    newFilm.save((error, film)=>{
        if(error) return console.error(error);
        console.log(film);
        response.json(film);
    })
});

// PUT /notes:id
app.put('/notes/:id',(request, response) => {
    let requestNote = request.body;

    let newNote = new Note({
        _id: request.params.id,
        noteTitle: requestNote.noteTitle,
        noteText: requestNote.noteText,
        noteColor: requestNote.noteColor
    })

    Note.updateOne({_id:request.params.id}, newNote, (error, note)=>{
        if(error) return response.status(400).json({error:error});
        response.status(201).json(note);
    })
})

// DELETE /notes:id
app.delete('/notes/:id',(request, response) => {
    Note.deleteOne({_id:request.params.id}, (error)=>{
        if(error) return response.status(400).json({error:error});
        response.status(201).json({msg:"ok"});
    })
})

app.post('/login',(request, response) => {
    User.findOne( {login:request.body.login, password:request.body.password}, (error, user) => {
        if (error){
            return response.status(404).json({error: error});
        }
        if (!user){
            return response.status(401).json({error: "Wrong login"});
        }
        request.session.userId= user.id;
        this.isConnected=true;
        response.status(200).json({login:user.login, fullName:user.fullName});
    });
});

app.post('/register',(request, response) => {
    var newUser= new User({
        login:request.body.login,
        password:request.body.password,
        fullName:request.body.fullName,
        isAdmin:false
    })

    User.countDocuments( {login:newUser.login}, (error, count) => {
        if (error){
            return response.status(404).json({error: error});
        }
        if (count>0){
            return response.status(409).json({error: "this login already exist"});
        }
        else{
            newUser.save((error,user)=>{
                if(error) return console.error(error);
                request.session.userId = user._id
                response.status(200).json({login:user.login, fullName:user.fullName});
            })
        }
    });
});

app.get('/logout',(request, response) => {
    request.session.destroy(err=>{
        if(err) return response.status(409).json({msg:'err'});
        response.status(200).json({msg:"Logout ok"});
    })
});

app.get('/isLogged',(request, response) => {
    if(!request.session.userId) return response.status(401).json();

    User.findOne({_id: request.session.userId}), (error,user)=>{
        if(err) return response.status(401).json({msg:'err'});
        if(!user) return response.status(401).json({msg:'err'});
        request.session.userId = user._id
        response.status(200).json({login:user.login, fullName:user.fullName});
    }
});

app.listen(3000, ()=>{console.log('listening on port 300')});
