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
        type: String,
        require: true
    },
    cedula: { type: Number },
    correo: {
        type: String,
        validate: [isEmail, 'Correo invalido']
    },
    telefono: { type: Number }
});

module.exports = model('Usuario', UsuarioSchema);