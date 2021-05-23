const express = require('express');
var bodyParser = require("body-parser");
const app = express();
var cors = require('cors');
const session = require('express-session');
const mongoose = require('mongoose');
const Movie = require('./models/movie');
const User = require('./models/user');
const Reservation = require("./models/reservation");

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

//--------------Movies--------------//

app.get('/movies', (request,response) => {
    if(!this.isConnected) return response.status(200).json([]);
    Movie.find({}).sort({_id:-1}).exec((error,movies)=>{
        if(error) return console.error(err);
        response.json(movies);
    });
});

app.get('/movie/:id',(request, response) => {
    Movie.findOne( {_id: request.params.id}, (error, movie) => {
        if (error){
            return response.status(404).json({error: error});
        }
        response.status(200).json(movie);
    });
});

app.post('/movie',(request, response) => {
    let requestMovie = request.body;

    let newMovie = new Movie({
        title: requestMovie.title,
        synopsis: requestMovie.synopsis,
        picture: requestMovie.picture,
        nbPlace: requestMovie.nbPlace
    })

    newMovie.save((error, movie)=>{
        if(error) return console.error(error);
        response.json(movie);
    })
});

app.put('/movies/:id',(request, response) => {
    let requestMovie = request.body;
    console.log('update');
    let newMovie = new Movie({
        _id: request.params.id,
        title: requestMovie.title,
        synopsis: requestMovie.synopsis,
        picture: requestMovie.picture,
        nbPlace: requestMovie.nbPlace
    })
    Movie.updateOne({_id:request.params.id}, newMovie, (error, movie)=>{
        if(error) return response.status(400).json({error:error});
        response.status(201).json(movie);
    })
})

app.delete('/movies/:id',(request, response) => {
    Movie.deleteOne({_id:request.params.id}, (error)=>{
        if(error) return response.status(400).json({error:error});
        response.status(201).json({msg:"ok"});
    })
})

//--------------Users--------------//

app.get('/users', (request,response) => {
    if(!this.isConnected) return response.status(200).json([]);
    User.find({}).sort({_id:-1}).exec((error,users)=>{
        if(error) return console.error(err);
        response.json(users);
    });
});

app.get('/user/:id',(request, response) => {
    User.findOne( {_id: request.params.id}, (error, user) => {
        if (error){
            return response.status(404).json({error: error});
        }
        response.status(200).json(user);
    });
});

app.put('/users/:id',(request, response) => {
    let requestUser = request.body;
    console.log('update');
    let newUser = new User({
        _id: request.params.id,
        fullName: requestUser.fullName,
        login: requestUser.login,
        password: requestUser.password,
        isAdmin: requestUser.isAdmin
    })
    User.updateOne({_id:request.params.id}, newUser, (error, user)=>{
        if(error) return response.status(400).json({error:error});
        response.status(201).json(user);
    })
})

app.delete('/users/:id',(request, response) => {
    User.deleteOne({_id:request.params.id}, (error)=>{
        if(error) return response.status(400).json({error:error});
        response.status(201).json({msg:"ok"});
    })
})

//--------------Reservations--------------//

app.get('/reservation', (request,response) => {
    if(!this.isConnected) return response.status(200).json([]);
    Reservation.find({}).sort({_id:-1}).exec((error,reservation)=>{
        if(error) return console.error(err);
        response.json(reservation);
    });
});

app.post('/reservation',(request, response) => {
    let requestReservation = request.body;

    console.log(requestReservation);
    let newReservation = new Reservation({
        idUser: requestReservation.idUser,
        idFilm: requestReservation.idFilm,
        date: requestReservation.date,
        nbPlace: requestReservation.nbPlace
    })
    

    newReservation.save((error, movie)=>{
        if(error) return console.error(error);
        response.json(movie);
    })
});

app.delete('/reservations/:id',(request, response) => {
    Reservation.deleteOne({_id:request.params.id}, (error)=>{
        if(error) return response.status(400).json({error:error});
        response.status(201).json({msg:"ok"});
    })
})


//--------------Connexion--------------//

app.post('/login',(request, response) => {
    User.findOne( {login:request.body.login, password:request.body.password}, (error, user) => {
        if (error){
            return response.status(404).json({error: error});
        }
        if (!user){
            return response.status(401).json({error: "Wrong login"});
        }
        request.session.userId= user._id;
        this.isConnected = true;
        response.status(200).json({login:user.login, fullName:user.fullName, id:user.id, isAdmin: user.isAdmin});
        
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
        this.isConnected = false;
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
