const mongoose = require('mongoose');
const { isEmail } = require('validator');

const Schema = mongoose.Schema;
const model = mongoose.model;

const UsuarioSchema = new Schema({
    nombres: {
        type: String,
        required: true
    },
    apellidos: {
        type: String
    },
    cedula: {
        type: Number,
        required: true,
        unique: true
    },
    correo: {
        type: String,
        required: true,
        unique: true
    },
    telefono: { type: Number }
});

module.exports = model('Usuario', UsuarioSchema);