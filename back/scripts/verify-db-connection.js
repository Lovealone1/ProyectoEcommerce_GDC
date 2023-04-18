'use strict';

var mongoose = require('mongoose');

// Conectar a la base de datos
mongoose.connect('mongodb://127.0.0.1:27017/tienda', { useNewUrlParser: true });

// Manejar eventos de conexión exitosa
mongoose.connection.on('connected', function() {
    console.log('Conexión exitosa a la base de datos');
});

// Manejar eventos de error de conexión
mongoose.connection.on('error', function(err) {
    console.error('Error de conexión a la base de datos: ' + err);
});

// Comprobar si la conexión está abierta
if (mongoose.connection.readyState === 1) {
    console.log('La conexión a la base de datos está abierta');
} else {
    console.log('La conexión a la base de datos no está abierta');
}
