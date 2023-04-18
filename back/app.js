'use strict'

var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var port = process.env.PORT || 4201;

var cliente_route = require('./routes/cliente');
var admin_route = require('./routes/admin');

// Manejar eventos de conexión exitosa
mongoose.connection.on('connected', function() {
    console.log('Conexión exitosa a la base de datos');
});

// Manejar eventos de error de conexión
mongoose.connection.on('error', function(err) {
    console.error('Error de conexión a la base de datos: ' + err);
});

mongoose.connect('mongodb://127.0.0.1:27017/tienda', { useNewUrlParser: true });

// Verificar la conexión a la base de datos
mongoose.connection.once('open', function() {
    console.log('La conexión a la base de datos está abierta');
}).on('error', function(err) {
    console.error('Error en la conexión a la base de datos: ' + err);
    process.exit(1); // Salir del proceso con código de error 1 en caso de error de conexión
});

app.listen(port, function(){
    console.log('Servidor corriendo en el puerto'+ port);
});

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json({limit: '50mb', extended: true}))

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*'); 
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow','GET, PUT, POST, DELETE, OPTIONS');
    next();
});

app.use('/api', cliente_route);
app.use('/api', admin_route);

module.exports = app;
